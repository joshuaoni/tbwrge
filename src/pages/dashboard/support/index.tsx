import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  feedbackSupport,
  FeedbackSupportRequestData,
  INITIAL_FEEDBACK_SUPPORT_REQUEST_DATA,
} from "@/actions/feedback-suoport";
import FeedbackSupportAccordion from "@/components/dashboard/feedback-support/accordion";
import FeedbackSupportButton from "@/components/dashboard/feedback-support/button";
import {
  FeedbackSupportFileGroup,
  FeedbackSupportInputGroup,
  FeedbackSupportSelectGroup,
  FeedbackSupportTextareaGroup,
} from "@/components/dashboard/feedback-support/input-group";
import DashboardFeedbackSupportLayout from "@/components/dashboard/feedback-support/layout";
import { useForm } from "@/hooks/form";
import { useUserStore } from "@/hooks/use-user-store";
import { outfit } from "@/constants/app";
import { useTranslation } from "react-i18next";
import { PaymentRequiredModal } from "@/components/ui/payment-required-modal";

const DashboardSupportPage = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { userData } = useUserStore();

  const supportMutation = useMutation({
    mutationFn: async (data: FeedbackSupportRequestData) =>
      await feedbackSupport(userData?.token ?? "", data),
    onError: (error: any) => {
      if (error.message === "PAYMENT_REQUIRED") {
        setShowPaymentModal(true);
      } else {
        toast.error(error.message || "Failed to submit support request");
      }
    },
    onSuccess: () => {
      toast.success("Support request submitted successfully");
      form.resetForm();
    },
  });

  const form = useForm(INITIAL_FEEDBACK_SUPPORT_REQUEST_DATA, (data) => {
    supportMutation.mutate(data);
  });

  return (
    <DashboardFeedbackSupportLayout>
      <p className={`${outfit.className} text-textgray text-sm`}>
        {t("support.description")}
      </p>

      <section
        className={`${outfit.className} flex gap-10 items-start my-4 text-sm`}
      >
        <form
          className="w-full my-6 mt-0 space-y-4 max-w-md text-sm"
          onSubmit={form.handleSubmit}
        >
          <FeedbackSupportInputGroup label={t("support.name")} />
          <FeedbackSupportInputGroup label={t("support.email")} />
          <FeedbackSupportSelectGroup
            title={t("support.supportCategory")}
            defaultValue={t("support.generalInquiry")}
            options={[
              { label: t("support.generalInquiry"), value: "general-inquiry" },
              {
                label: t("support.technicalSupport"),
                value: "technical-support",
              },
              { label: t("support.billingInquiry"), value: "billing-inquiry" },
              { label: t("support.reportProblem"), value: "report-a-problem" },
            ]}
            onChange={(val) => form.setFormField("category", val)}
          />
          <FeedbackSupportInputGroup
            label={t("support.subject")}
            value={form.formData.subject}
            onChange={(val) => form.setFormField("subject", val)}
          />
          <FeedbackSupportTextareaGroup
            label={t("support.description2")}
            value={form.formData.details}
            onChange={(val) => form.setFormField("details", val)}
          />
          <div>
            <label className="block text-sm  text-gray-700 mb-1">
              {t("support.attachScreenshot")}
            </label>
            <input
              type="file"
              name="image"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  form.setFormField("image", file);
                }
              }}
              accept=".png,.jpg,.jpeg"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
            />
          </div>
          <FeedbackSupportSelectGroup
            title={t("support.preferredContactMethod")}
            defaultValue={t("support.email")}
            options={[
              { label: t("support.email"), value: "email" },
              { label: t("support.phone"), value: "phone" },
            ]}
            onChange={(val) => form.setFormField("preferred_contact", val)}
          />

          <div className="w-full flex justify-center">
            <FeedbackSupportButton
              onClick={() => {
                form.setFormField("type", "support");
              }}
              isLoading={supportMutation.isPending}
            />
          </div>
        </form>
        <section className="w-full max-w-xl mt-6">
          <div className="space-y-4">
            {[
              {
                title: t("support.faq.whatIsCandivet.title"),
                content: t("support.faq.whatIsCandivet.content"),
              },
              {
                title: t("support.faq.upgradeSubscription.title"),
                content: t("support.faq.upgradeSubscription.content"),
              },
              {
                title: t("support.faq.resetPassword.title"),
                content: t("support.faq.resetPassword.content"),
              },
              {
                title: t("support.faq.dataAfterCancel.title"),
                content: t("support.faq.dataAfterCancel.content"),
              },
              {
                title: t("support.faq.createCV.title"),
                content: t("support.faq.createCV.content"),
              },
              {
                title: t("support.faq.rankingTips.title"),
                content: t("support.faq.rankingTips.content"),
              },
            ].map((item, i) => (
              <FeedbackSupportAccordion
                key={i}
                {...item}
                isOpen={i === activeIndex}
                onToggle={() => setActiveIndex(i)}
              />
            ))}
          </div>

          <p className="py-6 text-textgray text-center">
            {t("support.stillHaveQuestions")}&nbsp;
            <Link
              href="/dashboard/feedback"
              className="text-lightgreen underline"
            >
              {t("support.contactUs")}
            </Link>
          </p>
        </section>
      </section>
      {/* Payment Required Modal */}
      <PaymentRequiredModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        featureName={t("support.title")}
        featureDescription="Upgrade your plan to unlock priority support and get faster response times for your inquiries."
      />
    </DashboardFeedbackSupportLayout>
  );
};

export default DashboardSupportPage;
