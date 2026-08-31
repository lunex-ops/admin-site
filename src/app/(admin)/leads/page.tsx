import { FolderKanban } from "lucide-react";

const LeadsPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>

        <h1 className="text-3xl font-semibold">Leads</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage and track your leads from one place.
        </p>
      </div>

      {/* Coming Soon */}
      <div className="flex min-h-105 items-center justify-center border border-border bg-card p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center border border-border bg-muted/50">
            <FolderKanban className="size-6 text-muted-foreground" />
          </div>

          <div className="mb-3 inline-flex items-center border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Coming Soon
          </div>

          <h2 className="text-2xl font-semibold">Leads are on the way</h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            We&apos;re working on lead management tools that will help you
            organize projects, track progress, manage clients, and keep
            everything in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
