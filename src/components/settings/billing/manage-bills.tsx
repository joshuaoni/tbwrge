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
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/hooks/use-user-store";

const planDetails = {
  free: {
    price: "€0",
  },
  basic: {
    price: "€11.99",
  },
  pro: {
    price: "€1199",
  },
};

function BillingManageView() {
  const ctx = useContext(BillingContext);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { downloadPDF } = useDownloadPDF(invoiceRef, "invoice");
  const { t } = useTranslation();
  const userData = useUserStore();

  console.log("user plan: ", userData?.userData?.user);

  return (
    <div className={`${outfit.className}`}>
      <h1 className="text-sm font-semibold">{t("settings.billing.title")}</h1>
      <section className="flex items-center my-6 mt-4 gap-6 text-sm">
        <div className="w-full border border-lightgreen p-4 space-y-8 rounded-2xl max-w-xs">
          <div className="w-full flex items-start justify-between">
            <div>
              <span className="block font-medium capitalize">
                {userData?.userData?.user?.plan || "free"}
              </span>
              <p className="text-sm text-textgray mt-2">
                {t("settings.billing.freeForIndividual")}
              </p>
            </div>
            <span className="font-medium">
              {planDetails[
                (userData?.userData?.user?.plan as keyof typeof planDetails) ||
                  "free"
              ]?.price || "€0"}
              {t("settings.billing.planDetails.month")}
            </span>
          </div>

          <button
            onClick={() => ctx.goTo("choose")}
            className="bg-lightgreen text-white w-fit px-4 py-2 rounded-lg"
          >
            {(userData?.userData?.user?.plan || "free") === "free"
              ? t("settings.billing.upgrade")
              : t("settings.billing.subscribed")}
          </button>
        </div>

        {/* <div className="w-full border border-lightgreen p-4 space-y-4 rounded-2xl max-w-xs">
          <div className="w-full flex items-start justify-between">
            <div>
              <span className="block font-medium">
                {t("settings.billing.paymentPlan")}
              </span>
              <p className="text-sm text-textgray mt-2">
                {t("settings.billing.changePayments")}
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
        </div> */}
      </section>

      <section className="mt-6">
        <h3 className="font-medium text-sm">
          {t("settings.billing.invoices")}
        </h3>
        <span className="text-textgray text-sm">
          {t("settings.billing.manageInvoices")}
        </span>

        <Table className="mt-2">
          <TableHeader className="h-[39.292px] mb-4">
            <TableRow className="bg-[#D6D6D6]">
              <TableHead className="w-[25%] text-[#898989] h-[39.292px] first:rounded-l-[7.76px]">
                {t("settings.billing.date")}
              </TableHead>
              <TableHead className="w-[25%] text-[#898989] h-[39.292px]">
                {t("settings.billing.amount")}
              </TableHead>
              <TableHead className="w-[25%] text-[#898989] h-[39.292px]">
                {t("settings.billing.plan")}
              </TableHead>
              <TableHead className="w-[25%] text-[#898989] h-[39.292px] last:rounded-r-[7.76px]">
                {t("settings.billing.receipt")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                date: "2023-01-01",
                amount: "€10.00",
                plan: "Basic",
                receipt: "12345",
              },
              {
                date: "2023-02-01",
                amount: "€20.00",
                plan: "Pro",
                receipt: "67890",
              },
            ].map((invoice, index) => (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200"
              >
                <TableCell className="py-4">{invoice.date}</TableCell>
                <TableCell className="py-4">{invoice.amount}</TableCell>
                <TableCell className="py-4">{invoice.plan}</TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-1">
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
                      {t("settings.billing.downloadReceipt")}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Hidden invoice for PDF generation */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <InvoiceTemplate ref={invoiceRef} />
      </div>
    </div>
  );
}

export default BillingManageView;
