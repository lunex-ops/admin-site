import { VerifyEmail } from "@/components/auth/verity-email";

const VerifyEmailPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <VerifyEmail />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Once your email is verified, you&apos;ll be able to access the Lunex
          Admin dashboard.
        </p>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
