import { convertToSlug } from "./profile/input-group";
import { CheckBoxInputProps } from "./settings.interface";

function CheckBoxInput(props: CheckBoxInputProps) {
  return (
    <div className="flex items-center gap-x-3">
      <input
        type="checkbox"
        name={convertToSlug(props.label)}
        id={convertToSlug(props.label)}
        className="h-5 w-5"
      />
      <label htmlFor={convertToSlug(props.label)} className="text-[#87909E]">
        {props.label}
      </label>
    </div>
  );
}

export default CheckBoxInput;
