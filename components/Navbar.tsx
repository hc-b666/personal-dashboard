import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <header className="container py-5 border-b">
      <nav className="flex items-center justify-between">
        <Link href={"/"} className="text-xl">
          Personal Dashboard
        </Link>

        <div className="flex items-center gap-5">
          {userId && <Link href={"/dashboard"}>Dashboard</Link>}

          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
