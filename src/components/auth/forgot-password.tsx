"use client";

import Link from "next/link";

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

import { useForgotPassword } from "@/hooks/apis/useAuth";

import { toast } from "../ui/toast";

import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/lib/validations/auth.validation";

import { ApiError } from "@/lib/api-error";

export function ForgotPasswordForm(props: React.ComponentProps<typeof Card>) {
  const { mutate, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.add({
          title: "Reset link sent",
          description: response.message,
        });
      },

      onError: (error) => {
        toast.add({
          type: "error",
          title: "Reset link failed",
          description:
            error instanceof ApiError
              ? error.message
              : "Unable to send reset link. Please try again.",
        });
      },
    });
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <TextField
              name="email"
              label="Email"
              placeholder="you@example.com"
              register={register("email")}
              error={errors.email?.message}
            />

            <Field>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Sending..." : "Send Reset Link"}
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
