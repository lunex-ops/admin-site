import { Input } from "@/components/ui/input";
import type { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: string;
}

const TextField = ({
  name,
  label,
  placeholder,
  type,
  register,
  error,
}: TextFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>

      <Input
        id={name}
        type={type}
        {...register}
        placeholder={placeholder}
        aria-invalid={!!error}
      />

      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
};

export default TextField;
