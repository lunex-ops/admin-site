import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function VerifyEmail({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card className="border-border shadow-none" {...props}>
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex size-12 items-center justify-center border border-primary bg-primary/10">
          <span className="text-lg font-semibold text-primary">@</span>
        </div>

        <CardTitle className="text-2xl">Verify your email</CardTitle>

        <CardDescription className="mx-auto max-w-sm">
          We&apos;ve sent a verification link to your email address. Please
          check your inbox and click the link to verify your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FieldGroup>
          {/* Verification action */}
          <Field>
            <Button type="button" className="w-full">
              Resend Verification Email
            </Button>
          </Field>

          {/* Help text */}
          <FieldDescription className="text-center">
            Didn&apos;t receive the email? Check your spam or junk folder, or
            try sending it again.
          </FieldDescription>

          {/* Login */}
          <FieldDescription className="text-center">
            Already verified your email?{" "}
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
