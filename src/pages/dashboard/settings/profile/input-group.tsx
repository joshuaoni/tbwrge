import { twMerge } from "tailwind-merge";
import { ProfileInputGroupProps } from "./profile.interface";

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
        className="block text-[#4A5568] text-sm"
      >
        {props.label}
      </label>
      <input
        type={props.type ?? "text"}
        id={convertToSlug(props.label)}
        className="bg-[#EDF2F7] py-4 px-6 rounded w-full focus:outline-none"
        placeholder={`Enter your ${props.label}`}
      />
    </div>
  );
}

export { convertToSlug, ProfileInputGroup };
