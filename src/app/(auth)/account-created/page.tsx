import { AccountCreated } from "@/components/auth/account-created";

const AccountCreatedPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <AccountCreated />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          You can now access your dashboard and start managing your Lunex
          operations.
        </p>
      </div>
    </main>
  );
};

export default AccountCreatedPage;
