import { CheckBoxInputProps } from "@/interfaces/settings.interface";
import { convertToSlug } from "./profile/input-group";

function CheckBoxInput(props: CheckBoxInputProps) {
  const { value = false } = props;

  return (
    <div className="flex items-center gap-x-3">
      <input
        type="checkbox"
        name={convertToSlug(props.label)}
        id={convertToSlug(props.label)}
        className="h-5 w-5"
        checked={value}
        onChange={(e) => props?.onChange?.(e.target.checked)}
      />
      <label
        htmlFor={convertToSlug(props.label)}
        className="text-[#87909E] text-sm"
      >
        {props.label}
      </label>
    </div>
  );
}

export default CheckBoxInput;
