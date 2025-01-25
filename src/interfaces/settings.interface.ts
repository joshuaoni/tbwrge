export interface CheckBoxInputProps {
  label: string;

  value?: boolean;
  onChange?: (val: boolean) => void;
}

export interface CheckBoxSectionWrapperProps {
  children: React.ReactNode;
  title: string;
  titleClass?: string;
}
