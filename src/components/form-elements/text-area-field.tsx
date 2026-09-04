import { Textarea } from "@/components/ui/textarea";
import type { UseFormRegisterReturn } from "react-hook-form";

interface TextareaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  register: UseFormRegisterReturn;
  error?: string;
}

const TextareaField = ({
  name,
  label,
  placeholder,
  rows = 4,
  register,
  error,
}: TextareaFieldProps) => {
  return (
    <div className="space-y-2.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>

      <Textarea
        id={name}
        rows={rows}
        {...register}
        placeholder={placeholder}
        aria-invalid={!!error}
        className="min-h-28 rounded-md border-border bg-background px-3 py-2.5 text-sm shadow-sm transition-colors hover:border-primary/50 focus:ring-2 focus:ring-primary/20"
      />

      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
};

export default TextareaField;
