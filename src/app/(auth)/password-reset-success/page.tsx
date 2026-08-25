import { PasswordResetSuccess } from "@/components/auth/password-reset-success";

const PasswordResetSuccessPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <PasswordResetSuccess />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          You can now sign in and continue to the Lunex Admin dashboard.
        </p>
      </div>
    </main>
  );
};

export default PasswordResetSuccessPage;
