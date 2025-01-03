export interface JobBoardFilterProps {
  title: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}
