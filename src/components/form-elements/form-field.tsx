import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export const FormField = ({
  label,
  htmlFor,
  error,
  children,
  className = "",
}: FormFieldProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>

      {children}

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
};
