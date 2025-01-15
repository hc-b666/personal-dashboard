import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function Navbar() {
  return (
    <header className="container py-5 border-b">
      <nav className="flex items-center justify-between">
        <Link href={"/"} className="text-2xl font-bold">
          Personal Dashboard
        </Link>

        <div className="flex items-center gap-5">
          <SignedIn>
            <Link href="/dashboard">Dashboard</Link>
          </SignedIn>
          <SignedOut>
            <SignInButton>Login</SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
