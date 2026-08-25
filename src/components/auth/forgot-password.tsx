import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card className="border-border shadow-none" {...props}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Forgot your password?</CardTitle>

        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <FieldGroup>
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

              <FieldDescription>
                Enter the email address associated with your Lunex Admin
                account.
              </FieldDescription>
            </Field>

            {/* Submit */}
            <Field>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </Field>

            {/* Back to Login */}
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
        </form>
      </CardContent>
    </Card>
  );
}
