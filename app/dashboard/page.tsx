"use client";

import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="container py-5">
      <p>{user?.emailAddresses[0].emailAddress}</p>
    </div>
  );
}
