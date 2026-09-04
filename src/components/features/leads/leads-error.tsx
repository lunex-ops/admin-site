import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const LeadsError = () => {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center text-center">
      <p className="text-sm font-medium">Unable to load lead</p>

      <p className="mt-1 text-xs text-muted-foreground">
        The lead may no longer exist or could not be loaded.
      </p>

      <Link
        href="/leads"
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to Leads
      </Link>
    </div>
  );
};

export default LeadsError;
