import CalendarIcon from "@/components/icons/calendar";
import CardIcon from "@/components/icons/card";
import CardAddIcon from "@/components/icons/card-add";
import CloseCircleIcon from "@/components/icons/close-circle";
import InfoCircleIcon from "@/components/icons/info-circle";
import { useContext } from "react";
import { BillingContext } from "./billing.context";
import BillingInputGroup from "./input-group";

function BillingAddCard() {
  const ctx = useContext(BillingContext);

  return (
    <form className="space-y-10 max-w-4xl pt-10">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-8">
          <div className="w-fit p-2 rounded-full border border-gray-400">
            <CardAddIcon className="text-lightgreen" />
          </div>
          <div>
            <p>Add new card</p>
            <p className="text-textgray">
              Streamline your checkout process by adding a new card
            </p>
          </div>
        </div>
        <button onClick={() => ctx.goTo("manage")}>
          <CloseCircleIcon />
        </button>
      </div>

      <BillingInputGroup
        label="Card Number"
        placeholder="0000 0000 0000 0000"
        icon={CardIcon}
      />
      <div className="flex items-center gap-4 w-full">
        <BillingInputGroup
          label="Expiry Date"
          placeholder="MM/YY"
          icon={CalendarIcon}
        />
        <BillingInputGroup
          label="CVV"
          placeholder="***"
          icon={InfoCircleIcon}
        />
      </div>
      <div className="w-4/5">
        <BillingInputGroup
          label="CardHolder's Name"
          placeholder="Enter cardholder's full name"
        />
      </div>

      <div>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="relative w-20 h-10 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-lightgreen" />
          <span className="ms-3 text-2xl text-[#545E7D]">Save my card</span>
        </label>
      </div>

      <div className="w-full flex item-center justify-center">
        <button className="px-20 py-5 bg-lightgreen text-white text-lg font-semibold rounded-xl flex items-center gap-2">
          <CardAddIcon /> Add Card
        </button>
      </div>
    </form>
  );
}

export default BillingAddCard;
