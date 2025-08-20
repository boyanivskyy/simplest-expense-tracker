"use client";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignUp appearance={{ variables: { colorPrimary: "#111827" } }} />
    </div>
  );
}

