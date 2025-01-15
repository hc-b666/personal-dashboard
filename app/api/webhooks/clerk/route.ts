import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  console.log("Webhook endpoint hit");

  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    console.error("Missing SIGNING_SECRET");
    throw new Error("Error: No Signing secret");
  }

  const wh = new Webhook(SIGNING_SECRET);
  console.log("Webhook instance created");

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log("Headers received:", {
    svix_id: !!svix_id,
    svix_timestamp: !!svix_timestamp,
    svix_signature: !!svix_signature,
  });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  console.log("Request body:", body);

  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("Webhook verified successfully");
  } catch (err) {
    console.error("Error: Could not verify webhook", err);
    return new Response("Error: Verification error", { status: 400 });
  }

  const { id } = event.data;
  const eventType = event.type;

  console.log("Event details:", { id, eventType, data: event.data });

  try {
    if (eventType === "user.created") {
      console.log("Attempting to create user in database");
      const userData = {
        firstName: event.data.first_name as string,
        lastName: event.data.last_name as string,
        username: event.data.username as string,
        imageUrl: event.data.image_url as string,
        clerkUserId: event.data.id,
      };
      console.log("User data to be created:", userData);

      const createdUser = await prisma.user.create({
        data: userData,
      });
      console.log("User created successfully:", createdUser);
    } else if (eventType === "user.deleted") {
      console.log(eventType)
    }
  } catch (err) {
    console.error("Error: Could not create user", err);
    console.error("Full error:", JSON.stringify(err, null, 2));
    return new Response("Error: Creating user", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}
