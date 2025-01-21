import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import DashboardSettingsLayout from "../layout";

const BillingsAndSubscriptionPage = () => {
  return (
    <DashboardSettingsLayout>
      <div className="">
        <div className="flex items-center my-6 gap-6">
          <div className="border border-[#009379] p-4 rounded-2xl w-[400px]">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Free Plan</span>
              <span className="font-bold">$0/month</span>
            </div>
            <div className="flex flex-col">
              <span className="my-6 text-sm text-[#898989]">
                Free for individual use
              </span>
              <Button className="bg-primary text-white w-[30%] px-6">
                Upgrade
              </Button>
            </div>
          </div>

          <div className="border border-[#009379] p-4 rounded-2xl w-[400px]">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Payment Plans</span>
              <span className="font-bold">
                <PlusCircle />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="my-6 text-[#] text-sm">
                Change how you make plans
              </span>
              <Button className="bg-primary text-white w-[30%] px-6">
                Upgrade
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <h3 className="font-medium text-xl">Invoices</h3>
          <span className="text-[#898989]">
            Manage invoice and new receipts
          </span>

          <section
            aria-roledescription="table"
            className="w-full p-4 bg-[#F0F0F0] rounded-xl my-4"
          >
            <div className="w-full bg-[#D6D6D6] text-[#898989] font-bold py-3 px-5 rounded-[7px] flex gap-6 items-end">
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
                  <span className="w-full block text-center">
                    {invoice.plan}
                  </span>
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
    </DashboardSettingsLayout>
  );
};

export default BillingsAndSubscriptionPage;
