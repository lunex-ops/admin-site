import { ResetPasswordForm } from "@/components/auth/reset-password";

const ResetPasswordPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <ResetPasswordForm />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          After resetting your password, you&apos;ll be able to log in with your
          new credentials.
        </p>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
