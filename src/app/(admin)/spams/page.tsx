"use client";

import { SpamsTable } from "@/components/tables/spams-table";
import { useSpams } from "@/hooks/apis/useSpams";

const SpamsPage = () => {
  const { data, isLoading, isError } = useSpams();

  const spams = data?.data?.contacts ?? [];

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>

        <h1 className="text-3xl font-semibold tracking-tight">Spam</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Review rejected contacts and manage contacts marked as spam.
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Loading State                                                      */}
      {/* ------------------------------------------------------------------ */}

      {isLoading && (
        <div className="space-y-4">
          <div className="h-14 animate-pulse border border-border bg-muted/30" />

          <div className="border border-border bg-card">
            <div className="divide-y divide-border">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-16 animate-pulse bg-muted/20" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Error State                                                        */}
      {/* ------------------------------------------------------------------ */}

      {isError && (
        <div className="flex min-h-48 flex-col items-center justify-center border border-border bg-card p-6 text-center">
          <p className="text-sm font-medium">Unable to load spam contacts</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Please try refreshing the page.
          </p>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Spams                                                              */}
      {/* ------------------------------------------------------------------ */}

      {!isLoading && !isError && <SpamsTable data={spams} />}
    </div>
  );
};

export default SpamsPage;
