import { CheckEmail } from "@/components/auth/check-email";

const CheckEmailPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <CheckEmail />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Check your spam or junk folder if you don&apos;t see the email in your
          inbox.
        </p>
      </div>
    </main>
  );
};

export default CheckEmailPage;
