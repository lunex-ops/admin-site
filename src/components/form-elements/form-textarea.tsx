import type { TextareaHTMLAttributes } from "react";

import { Textarea } from "@/components/ui/textarea";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const FormTextarea = ({
  error = false,
  className = "",
  ...props
}: FormTextareaProps) => {
  return (
    <Textarea
      {...props}
      className={className}
      aria-invalid={error || undefined}
    />
  );
};
