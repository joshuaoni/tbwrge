import { twMerge } from "tailwind-merge";
import { ProfileInputGroupProps } from "../../../interfaces/profile.interface";

function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

function ProfileInputGroup(props: ProfileInputGroupProps) {
  return (
    <div className={twMerge("w-full space-y-2", props.className)}>
      <label
        htmlFor={convertToSlug(props.label)}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {props.label}
      </label>
      <input
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        type={props.type ?? "text"}
        id={convertToSlug(props.label)}
        className="w-full text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
        placeholder={`Enter your ${props.label}`}
      />
    </div>
  );
}

export { convertToSlug, ProfileInputGroup };
