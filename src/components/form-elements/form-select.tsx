import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: readonly FormSelectOption[];
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export const FormSelect = ({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  error = false,
  className = "",
}: FormSelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={(newValue) => {
        if (newValue !== null) {
          onValueChange(newValue);
        }
      }}
    >
      <SelectTrigger
        aria-invalid={error || undefined}
        className={`h-11 w-full rounded-md border-border bg-background px-3 text-sm shadow-sm transition-colors hover:border-primary/50 focus:ring-2 focus:ring-primary/20 data-placeholder:text-muted-foreground ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
