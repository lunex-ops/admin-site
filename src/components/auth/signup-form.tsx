"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { useSignUp } from "@/hooks/apis/useAuth";

/* -------------------------------------------------------------------------- */
/*                                  Schema                                    */
/* -------------------------------------------------------------------------- */

const signupSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must be less than 50 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    photo: z.string().optional(),

    password: z.string().min(8, "Password must be at least 8 characters"),

    passwordConfirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

/* -------------------------------------------------------------------------- */
/*                              Signup Form                                   */
/* -------------------------------------------------------------------------- */

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const signUp = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  /* ------------------------------------------------------------------------ */
  /*                              Submit                                      */
  /* ------------------------------------------------------------------------ */

  const onSubmit = async (values: SignupFormValues) => {
    try {
      const response = await signUp.mutateAsync(values);

      toast.add({
        title: "Account created",
        description:
          response?.message ?? "Your account has been created successfully.",
      });

      router.push("/account-created");
    } catch (error: unknown) {
      let message = "Unable to create your account. Please try again.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message ?? message;
      }

      toast.add({
        type: "error",
        title: "Signup failed",
        description: message,
      });
    }
  };

  return (
    <Card className="border-border shadow-none" {...props}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Create your account</CardTitle>

        <CardDescription>
          Create an account to access the Lunex Admin.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* ---------------------------------------------------------------- */}
            {/* Username                                                         */}
            {/* ---------------------------------------------------------------- */}

            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>

              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                autoComplete="username"
                aria-invalid={Boolean(errors.username)}
                {...register("username")}
              />

              {errors.username && (
                <FieldError>{errors.username.message}</FieldError>
              )}
            </Field>

            {/* ---------------------------------------------------------------- */}
            {/* Email                                                            */}
            {/* ---------------------------------------------------------------- */}

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />

              <FieldDescription>
                We&apos;ll use this email to verify your account.
              </FieldDescription>

              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            {/* ---------------------------------------------------------------- */}
            {/* Photo                                                            */}
            {/* ---------------------------------------------------------------- */}

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                {...register("password")}
              />

              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>

              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            {/* ---------------------------------------------------------------- */}
            {/* Confirm Password                                                 */}
            {/* ---------------------------------------------------------------- */}

            <Field>
              <FieldLabel htmlFor="passwordConfirm">
                Confirm Password
              </FieldLabel>

              <Input
                id="passwordConfirm"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.passwordConfirm)}
                {...register("passwordConfirm")}
              />

              <FieldDescription>
                Enter the same password again to confirm.
              </FieldDescription>

              {errors.passwordConfirm && (
                <FieldError>{errors.passwordConfirm.message}</FieldError>
              )}
            </Field>

            {/* ---------------------------------------------------------------- */}
            {/* Submit                                                           */}
            {/* ---------------------------------------------------------------- */}

            <Field>
              <Button
                type="submit"
                className="w-full"
                disabled={signUp.isPending}
              >
                {signUp.isPending ? "Creating account..." : "Create Account"}
              </Button>
            </Field>

            {/* ---------------------------------------------------------------- */}
            {/* Login                                                            */}
            {/* ---------------------------------------------------------------- */}

            <FieldDescription className="text-center">
              Already have an account?{" "}
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
