import { convertToSlug } from "../profile/input-group";
import { BillingInputGroupProps } from "./billing.interface";

function BillingInputGroup(props: BillingInputGroupProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        id={convertToSlug(props.label)}
        className="block px-11 py-5 w-full text-xl text-gray-900 bg-transparent rounded-2xl border-2 border-[#CBD0DC] appearance-none transition-[border] duration-300 focus:outline-none focus:border-4 focus:border-lightgreen peer"
        placeholder={props.placeholder}
      />
      <label
        htmlFor={convertToSlug(props.label)}
        className="absolute text-xl text-gray-500 z-10 bg-white px-2 -translate-y-6 top-2 start-9 peer-focus:text-lightgreen"
      >
        {props.label}
      </label>

      {props.icon && (
        <props.icon className="absolute top-1/2 -translate-y-1/2 right-4 w-8 h-8 text-[#CBD0DC] peer-focus:text-lightgreen" />
      )}
    </div>
  );
}

export default BillingInputGroup;
