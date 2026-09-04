"use client";

import Link from "next/link";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";

import TextField from "../form-elements/text-field";

import { useResetPassword } from "@/hooks/apis/useAuth";

import { toast } from "../ui/toast";

import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/lib/validations/auth.validation";

import { ApiError } from "@/lib/api-error";

export function ResetPasswordForm(props: React.ComponentProps<typeof Card>) {
  const params = useParams();
  const router = useRouter();

  const token = params.token as string;

  const { mutate, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.add({
        type: "error",
        title: "Invalid reset link",
        description: "The password reset link is invalid.",
      });

      return;
    }

    mutate(
      {
        token,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      },
      {
        onSuccess: (response) => {
          toast.add({
            title: "Password reset successful",
            description: response.message,
          });

          router.replace("/password-reset-success");
        },

        onError: (error) => {
          toast.add({
            type: "error",
            title: "Password reset failed",
            description:
              error instanceof ApiError
                ? error.message
                : "Unable to reset your password. Please try again.",
          });
        },
      },
    );
  };

  return (
    <Card className="border-border shadow-none" {...props}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Reset your password</CardTitle>

        <CardDescription>
          Create a new password for your Lunex Admin account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <TextField
              name="password"
              label="New Password"
              placeholder="Enter your new password"
              type="password"
              // autoComplete="new-password"
              register={register("password")}
              error={errors.password?.message}
            />

            <TextField
              name="passwordConfirm"
              label="Confirm Password"
              placeholder="Confirm your new password"
              type="password"
              // autoComplete="new-password"
              register={register("passwordConfirm")}
              error={errors.passwordConfirm?.message}
            />

            <FieldDescription>
              Your password must be at least 8 characters long.
            </FieldDescription>

            <Field>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Resetting..." : "Reset Password"}
              </Button>
            </Field>

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
