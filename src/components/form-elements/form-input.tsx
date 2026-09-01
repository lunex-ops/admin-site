import type { InputHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const FormInput = ({
  error = false,
  className = "",
  ...props
}: FormInputProps) => {
  return (
    <Input
      {...props}
      className={`${className}`}
      aria-invalid={error || undefined}
    />
  );
};
