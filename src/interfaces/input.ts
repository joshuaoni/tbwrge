export interface InputGroupProps {
  label: string;
  type?: "text" | "email" | "password";
  name?: string;
  className?: string;
  onChange?: (val: string) => void;
  value?: string;
  placeholder?: string;
}
