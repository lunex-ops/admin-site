import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";

export function CheckEmail({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card className="border-border shadow-none" {...props}>
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex size-12 items-center justify-center border border-border bg-muted">
          <span className="text-lg text-primary">@</span>
        </div>

        <CardTitle className="text-2xl">Check your email</CardTitle>

        <CardDescription className="mx-auto max-w-sm">
          We&apos;ve sent you a password reset link. Check your inbox and follow
          the instructions to reset your password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FieldGroup>
          <Field>
            <Link
              href="/reset-password"
              className="flex h-9 w-full items-center justify-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Continue to Reset Password
            </Link>
          </Field>

          <FieldDescription className="text-center">
            Didn&apos;t receive the email?{" "}
            <Link
              href="/forgot-password"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Try again
            </Link>
          </FieldDescription>

          <FieldDescription className="text-center">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Log in
            </Link>
          </FieldDescription>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
