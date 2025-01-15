import { auth } from "@clerk/nextjs/server";

export default async function ApisPage() {
  const { userId } = await auth();

  return (
    <div className="container py-5">
      <p>Your public api for your public projects</p>
      <span>{`${process.env.BASE_URL}/api/projects?userId=${userId}`}</span>
    </div>
  );
}
