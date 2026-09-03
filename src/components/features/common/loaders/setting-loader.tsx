export const SettingLoader = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-4 w-28 animate-pulse bg-muted" />

        <div className="mt-4 h-9 w-40 animate-pulse bg-muted" />

        <div className="mt-3 h-4 w-80 animate-pulse bg-muted" />
      </div>

      <div className="border border-border bg-card">
        <div className="border-b border-border p-5">
          <div className="h-5 w-32 animate-pulse bg-muted" />

          <div className="mt-2 h-3 w-64 animate-pulse bg-muted" />
        </div>

        <div className="space-y-8 p-5">
          {Array.from({ length: 2 }).map((_, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="h-4 w-36 animate-pulse bg-muted" />

              <div className="mt-2 h-3 w-64 animate-pulse bg-muted" />

              <div className="my-5 h-px w-full bg-muted" />

              <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: sectionIndex === 0 ? 4 : 2 }).map(
                  (_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="h-3 w-24 animate-pulse bg-muted" />

                      <div className="h-10 w-full animate-pulse bg-muted/50" />
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t border-border p-5">
          <div className="h-10 w-32 animate-pulse bg-muted" />
        </div>
      </div>
    </div>
  );
};
