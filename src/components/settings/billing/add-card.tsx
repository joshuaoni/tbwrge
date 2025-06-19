import CalendarIcon from "@/components/icons/calendar";
import CardIcon from "@/components/icons/card";
import CardAddIcon from "@/components/icons/card-add";
import CloseCircleIcon from "@/components/icons/close-circle";
import InfoCircleIcon from "@/components/icons/info-circle";
import { BillingContext } from "@/providers/billing.context";
import { useContext } from "react";
import BillingInputGroup from "./input-group";
import { outfit } from "@/constants/app";
import { useTranslation } from "react-i18next";

function BillingAddCard() {
  const ctx = useContext(BillingContext);
  const { t } = useTranslation();

  return (
    <>
      <h1 className={`${outfit.className} text-2xl font-semibold mb-4`}>
        {t("settings.billing.addCard")}
      </h1>
      <form className={`${outfit.className} space-y-6 max-w-3xl`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-fit p-1 rounded-full border border-gray-400">
              <CardAddIcon />
            </div>
            <div>
              <p className="text-base">{t("settings.billing.addNewCard")}</p>
              <p className="text-sm text-textgray">
                {t("settings.billing.streamlineCheckout")}
              </p>
            </div>
          </div>
          <button onClick={() => ctx.goTo("manage")}>
            <CloseCircleIcon />
          </button>
        </div>

        <BillingInputGroup
          label={t("settings.billing.cardNumber")}
          placeholder={t("settings.billing.cardNumberPlaceholder")}
          icon={CardIcon}
        />
        <div className="flex items-center gap-2 w-full">
          <BillingInputGroup
            label={t("settings.billing.expiryDate")}
            placeholder={t("settings.billing.expiryDatePlaceholder")}
            icon={CalendarIcon}
          />
          <BillingInputGroup
            label={t("settings.billing.cvv")}
            placeholder={t("settings.billing.cvvPlaceholder")}
            icon={InfoCircleIcon}
          />
        </div>
        <div className="w-3/5">
          <BillingInputGroup
            label={t("settings.billing.cardholderName")}
            placeholder={t("settings.billing.cardholderNamePlaceholder")}
          />
        </div>

        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="relative w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lightgreen" />
            <span className="ms-2 text-base text-[#545E7D]">
              {t("settings.billing.saveMyCard")}
            </span>
          </label>
        </div>

        <div className="w-full flex items-center justify-center">
          <button className="px-8 py-3 bg-lightgreen text-white text-base font-semibold rounded-lg flex items-center gap-2">
            <CardAddIcon /> {t("settings.billing.addCard")}
          </button>
        </div>
      </form>
    </>
  );
}

export default BillingAddCard;
