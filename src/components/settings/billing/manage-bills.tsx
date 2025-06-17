import { PlusCircle } from "lucide-react";
import { useContext, useRef } from "react";
import { twMerge } from "tailwind-merge";

import VisaPaymentLogo from "@/components/icons/visa-logo";
import { BillingContext } from "@/providers/billing.context";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import InvoiceTemplate from "./invoice-template";
import { useDownloadPDF } from "@/hooks/download-pdf";
import { outfit } from "@/constants/app";

function BillingManageView() {
  const ctx = useContext(BillingContext);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { downloadPDF } = useDownloadPDF(invoiceRef, "invoice");

  return (
    <div className={`${outfit.className}`}>
      <h1 className="text-sm font-semibold">Billing</h1>
      <section className="flex items-center my-6 mt-4 gap-6 text-sm">
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

      <section className="mt-6">
        <h3 className="font-medium text-sm">Invoices</h3>
        <span className="text-textgray">Manage invoice and new receipts</span>

        <div className="bg-[#F0F0F0] rounded-xl p-4 mt-4">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-[#D6D6D6] h-[39.292px]">
                <TableHead className="pl-6 py-3 text-sm font-medium text-[#898989] h-[39.292px] text-left first:rounded-l-xl last:rounded-r-xl">
                  DATE
                </TableHead>
                <TableHead className="px-6 py-3 text-sm font-medium text-[#898989] h-[39.292px] text-center">
                  AMOUNT
                </TableHead>
                <TableHead className="px-6 py-3 text-sm font-medium text-[#898989] h-[39.292px] text-center">
                  PLAN
                </TableHead>
                <TableHead className="px-6 py-3 text-sm font-medium text-[#898989] h-[39.292px] text-center">
                  RECEIPT
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
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
                <TableRow
                  key={index}
                  className="bg-[#F0F0F0] border-b border-white hover:bg-[#F0F0F0]/80 cursor-pointer hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200"
                >
                  <TableCell className="pl-6 py-4 text-sm align-middle text-left">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm align-middle text-center">
                    {invoice.amount}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm align-middle text-center">
                    {invoice.plan}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm align-middle text-center">
                    <div className="flex items-center justify-center gap-1">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.75 2.5H5C4.0335 2.5 3.75 2.7835 3.75 3.75V16.25C3.75 17.2165 4.0335 17.5 5 17.5H15C15.9665 17.5 16.25 17.2165 16.25 16.25V5L13.75 2.5Z"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.75 2.5V5H16.25"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 10H12.5"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 12.5H12.5"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <button
                        className="text-gray-600 hover:text-[#009379] hover:underline"
                        onClick={downloadPDF}
                      >
                        Download Receipt
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Hidden invoice for PDF generation */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <InvoiceTemplate ref={invoiceRef} />
      </div>
    </div>
  );
}

export default BillingManageView;
