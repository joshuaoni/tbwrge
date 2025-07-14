import { BillingInputGroupProps } from "@/interfaces/billing.interface";
import { convertToSlug } from "../profile/input-group";

function BillingInputGroup(props: BillingInputGroupProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        id={convertToSlug(props.label)}
        className="block px-4 py-2 w-full text-base text-gray-900 bg-transparent rounded-lg border-2 border-[#CBD0DC] appearance-none transition-[border] duration-300 focus:outline-none focus:border-4 focus:border-lightgreen peer"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
      <label
        htmlFor={convertToSlug(props.label)}
        className="absolute text-base text-gray-500 z-10 bg-white px-1 -translate-y-4 top-1 start-4 peer-focus:text-lightgreen"
      >
        {props.label}
      </label>

      {props.icon && (
        <props.icon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-[#CBD0DC] peer-focus:text-lightgreen" />
      )}
    </div>
  );
}

export default BillingInputGroup;
