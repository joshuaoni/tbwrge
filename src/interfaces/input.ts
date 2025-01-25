export interface InputGroupProps {
  label: string;
  type?: "text" | "email" | "password";
  className?: string;
  onChange?: (val: string) => void;
  value?: string;
}
