import { PlusCircle } from "lucide-react";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";

import VisaPaymentLogo from "@/components/icons/visa-logo";
import { BillingContext } from "./billing.context";

function BillingManageView() {
  const ctx = useContext(BillingContext);

  return (
    <div>
      <section className="flex items-center my-6 gap-6">
        <div className="w-full border border-lightgreen p-4 space-y-8 rounded-2xl max-w-xs">
          <div className="w-full flex items-start justify-between">
            <div>
              <span className="block font-medium">Free Plan</span>
              <p className="text-sm text-textgray mt-2">
                Free for individual use
              </p>
            </div>
            <span className="font-medium">$0/month</span>
          </div>

          <button
            onClick={() => ctx.goTo("choose")}
            className="bg-lightgreen text-white w-fit px-4 py-2 rounded-lg"
          >
            Upgrade
          </button>
        </div>

        <div className="w-full border border-lightgreen p-4 space-y-4 rounded-2xl max-w-xs">
          <div className="w-full flex items-start justify-between">
            <div>
              <span className="block font-medium">Payment Plan</span>
              <p className="text-sm text-textgray mt-2">
                Change how you make payments
              </p>
            </div>
            <button onClick={() => ctx.goTo("add")}>
              <PlusCircle />
            </button>
          </div>

          <div className="w-fit flex items-center gap-3 p-2 pr-6 rounded-lg border border-textgray">
            <VisaPaymentLogo />
            <div>
              <p>
                {[...new Array(4)].map((_, i) => (
                  <span key={i} className="pr-2 text-sm">
                    ****
                  </span>
                ))}
              </p>
              <p className="text-xs">Expiry 02/25</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="font-medium text-xl">Invoices</h3>
        <span className="text-textgray">Manage invoice and new receipts</span>

        <section
          aria-roledescription="table"
          className="w-full p-4 bg-[#F0F0F0] rounded-xl my-4"
        >
          <div className="w-full bg-[#D6D6D6] text-textgray font-bold py-3 px-5 rounded-[7px] flex gap-6 items-end">
            {["DATE", "Amount", "Plan", "Reciept"].map((text, i) => (
              <span
                key={i}
                className={twMerge(
                  "w-full block text-center",
                  i == 0 && "text-left"
                )}
              >
                {text}
              </span>
            ))}
          </div>

          <div className="divide-y divide-white">
            {[
              {
                date: "2023-01-01",
                amount: "$10.00",
                plan: "Basic",
                receipt: "12345",
              },
              {
                date: "2023-02-01",
                amount: "$20.00",
                plan: "Pro",
                receipt: "67890",
              },
            ].map((invoice, index) => (
              <div
                key={index}
                className="cursor-pointer w-full flex gap-4 px-5 py-3"
              >
                <span className="w-full block text-left">{invoice.date}</span>
                <span className="w-full block text-center">
                  {invoice.amount}
                </span>
                <span className="w-full block text-center">{invoice.plan}</span>
                <span className="w-full flex items-center justify-center">
                  <button className="border border-black text-[#87909E] py-0.5 px-1">
                    Download Reciept
                  </button>
                </span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

export default BillingManageView;
