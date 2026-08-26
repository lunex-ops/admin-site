const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Overview
        </p>

        <h1 className="text-3xl font-semibold">Dashboard</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Welcome back. Here&apos;s an overview of your operations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Contacts</p>

          <p className="mt-2 font-headline text-3xl font-semibold">0</p>
        </div>

        <div className="border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">New Leads</p>

          <p className="mt-2 font-headline text-3xl font-semibold">0</p>
        </div>

        <div className="border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Active Projects</p>

          <p className="mt-2 font-headline text-3xl font-semibold">0</p>
        </div>

        <div className="border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Clients</p>

          <p className="mt-2 font-headline text-3xl font-semibold">0</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
