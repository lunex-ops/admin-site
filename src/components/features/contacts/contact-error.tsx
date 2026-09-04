import { ArrowLeft, UserRound } from "lucide-react";
import Link from "next/link";

const ContactError = () => {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center text-center">
      <UserRound className="size-8 text-muted-foreground/50" />

      <p className="mt-4 text-sm font-medium">Unable to load contact</p>

      <p className="mt-1 text-xs text-muted-foreground">
        The contact may no longer exist or could not be loaded.
      </p>

      <Link
        href="/contacts"
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to Contacts
      </Link>
    </div>
  );
};

export default ContactError;
