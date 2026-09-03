interface FieldErrorProps {
  message?: string;
}

export const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) return null;

  return <p className="text-xs text-danger">{message}</p>;
};
