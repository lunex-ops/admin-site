import { ForgotPasswordForm } from "@/components/auth/forgot-password";

const ForgotPasswordPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          If an account exists with this email, you&apos;ll receive instructions
          to reset your password.
        </p>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
