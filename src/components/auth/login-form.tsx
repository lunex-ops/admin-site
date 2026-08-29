"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { cn } from "@/lib/utils";

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

import { useSignIn } from "@/hooks/apis/useAuth";
import { useAuth } from "@/context/AuthContext";

/* -------------------------------------------------------------------------- */
/*                                  Schema                                    */
/* -------------------------------------------------------------------------- */

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/* -------------------------------------------------------------------------- */
/*                               Login Form                                   */
/* -------------------------------------------------------------------------- */

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const { setToken } = useAuth();

  const signIn = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  /* ------------------------------------------------------------------------ */
  /*                              Submit                                      */
  /* ------------------------------------------------------------------------ */

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await signIn.mutateAsync(values);

      setToken(response.token);

      toast.add({
        title: "Login successful",
        description: "Welcome back!",
      });

      router.push("/dashboard");
    } catch (error: unknown) {
      let message = "Unable to sign in. Please try again.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message ?? message;
      }

      toast.add({
        type: "error",
        title: "Login failed",
        description: message,
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-border shadow-none">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Login to your account</CardTitle>

          <CardDescription>
            Enter your credentials to access the Lunex Admin.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
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

                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>

              {/* ---------------------------------------------------------------- */}
              {/* Password                                                         */}
              {/* ---------------------------------------------------------------- */}

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                />

                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>

              {/* ---------------------------------------------------------------- */}
              {/* Submit                                                           */}
              {/* ---------------------------------------------------------------- */}

              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={signIn.isPending}
                >
                  {signIn.isPending ? "Logging in..." : "Log In"}
                </Button>
              </Field>

              {/* ---------------------------------------------------------------- */}
              {/* Signup                                                           */}
              {/* ---------------------------------------------------------------- */}

              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
