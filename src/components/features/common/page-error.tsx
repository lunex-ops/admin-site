import { CircleAlert } from "lucide-react";

export const PageError = () => {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center text-center">
      <CircleAlert className="size-8 text-red-500" />

      <p className="mt-3 text-sm font-medium">Unable to load!!!</p>

      <p className="mt-1 text-xs text-muted-foreground">
        Please try refreshing the page.
      </p>
    </div>
  );
};
