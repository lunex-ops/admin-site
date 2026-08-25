import { SignupForm } from "@/components/auth/signup-form";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-block font-headline text-xl font-bold tracking-tight"
          >
            Lunex
          </Link>

          <p className="mt-2 text-sm text-muted-foreground">Admin Portal</p>
        </div>

        <SignupForm />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Your account will need to be verified before you can access the
          dashboard.
        </p>
      </div>
    </main>
  );
}
