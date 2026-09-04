import { Spinner } from "@/components/ui/spinner";

interface PageHeaderLoaderProps {
  title?: string;
}

export const PageHeaderLoader = ({
  title = "Dashboard",
}: PageHeaderLoaderProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner />
          <span>Please wait. Loading your {title.toLowerCase()}...</span>
        </div>
      </div>
    </div>
  );
};
