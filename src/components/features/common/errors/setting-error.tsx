import { Settings2 } from "lucide-react";

export const SettingError = () => {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>

        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage your agency and workspace preferences.
        </p>
      </div>

      <div className="flex min-h-48 flex-col items-center justify-center border border-border bg-card p-6 text-center">
        <Settings2 className="size-8 text-muted-foreground/50" />

        <p className="mt-4 text-sm font-medium">Unable to load settings</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Please try refreshing the page.
        </p>
      </div>
    </div>
  );
};
