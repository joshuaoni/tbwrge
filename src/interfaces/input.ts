import { ComponentProps } from "react";

interface InputGroup {
  label: string;
  type?: "text" | "email" | "password";
  name?: string;
  className?: string;
  onChange?: (val: string) => void;
  value?: string;
  placeholder?: string;
}

export type InputGroupProps = InputGroup &
  Omit<ComponentProps<"input">, keyof InputGroup>;
