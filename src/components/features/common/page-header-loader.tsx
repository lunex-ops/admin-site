import { Spinner } from "@/components/ui/spinner";

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

        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner />
          <span>Loading your {pageName.toLowerCase()}...</span>
        </div>
      </div>
    </div>
  );
};
