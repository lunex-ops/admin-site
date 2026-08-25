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

export function ResetPasswordForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card className="border-border shadow-none" {...props}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Reset your password</CardTitle>

        <CardDescription>
          Create a new password for your Lunex Admin account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <FieldGroup>
            {/* New Password */}
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your new password"
                autoComplete="new-password"
                required
              />

              <FieldDescription>
                Your password must be at least 8 characters long.
              </FieldDescription>
            </Field>

            {/* Confirm Password */}
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>

              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                autoComplete="new-password"
                required
              />

              <FieldDescription>
                Enter the same password again to confirm.
              </FieldDescription>
            </Field>

            {/* Submit */}
            <Field>
              <Button type="submit" className="w-full">
                Reset Password
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
