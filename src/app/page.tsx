import Link from "next/link";

const HomePage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        {/* Brand */}
        <div className="mb-12">
          <p className="mb-3 font-label text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Lunex Ops
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Welcome back.
          </h1>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Manage your leads, clients, projects, and operations from one place.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/login"
            className="flex w-full items-center justify-center bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="flex w-full items-center justify-center border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
