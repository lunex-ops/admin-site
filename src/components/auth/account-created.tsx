import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";

export function AccountCreated({
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card className="border-border shadow-none" {...props}>
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex size-12 items-center justify-center border border-success bg-success/10">
          <span className="text-lg font-semibold text-success">✓</span>
        </div>

        <CardTitle className="text-2xl">Account created</CardTitle>

        <CardDescription className="mx-auto max-w-sm">
          Your Lunex Admin account has been successfully created and your email
          has been verified.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FieldGroup>
          <Field>
            <Link
              href="/dashboard"
              className="flex h-9 w-full items-center justify-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Go to Dashboard
            </Link>
          </Field>

          <FieldDescription className="text-center">
            You&apos;re all set. Welcome to Lunex Admin.
          </FieldDescription>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
