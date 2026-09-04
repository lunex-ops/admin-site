import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  options: readonly SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
}

const SelectField = ({
  name,
  label,
  placeholder = "Select an option",
  options,
  value,
  onValueChange,
  error,
}: SelectFieldProps) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="space-y-2.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>

      <Select
        value={value}
        onValueChange={(value) => {
          if (value !== null) {
            onValueChange(value);
          }
        }}
      >
        <SelectTrigger
          id={name}
          aria-invalid={!!error}
          className="h-11 w-full rounded-md border-border bg-background px-3 text-sm shadow-sm transition-colors hover:border-primary/50 focus:ring-2 focus:ring-primary/20 data-placeholder:text-muted-foreground"
        >
          <SelectValue placeholder={placeholder}>
            {selectedOption?.label}
          </SelectValue>
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

      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
};

export default SelectField;
