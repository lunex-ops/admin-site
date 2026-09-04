"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

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

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),

    passwordConfirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

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

          router.push("/password-reset-success");
        },

        onError: (error) => {
          let message = "Unable to reset your password. Please try again.";

          if (axios.isAxiosError(error)) {
            message = error.response?.data?.message ?? message;
          }

          toast.add({
            type: "error",
            title: "Password reset failed",
            description: message,
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
