interface PageHeaderLoaderProps {
  title?: string;
  pageName?: string;
}

export const PageHeaderLoader = ({
  title = "Workspace",
  pageName = "Dashboard",
}: PageHeaderLoaderProps) => {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {title}
        </p>

        <h1 className="text-3xl font-semibold tracking-tight">{pageName}</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Loading your {pageName.toLowerCase()}...
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse border border-border bg-muted/30"
          />
        ))}
      </div>
    </div>
  );
};
