import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  feedbackSupport,
  FeedbackSupportRequestData,
  INITIAL_FEEDBACK_SUPPORT_REQUEST_DATA,
} from "@/actions/feedback-suoport";
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

const FeedbackPage = () => {
  const { t } = useTranslation();
  const { userData } = useUserStore();

  const feedbackMutation = useMutation({
    mutationFn: async (data: FeedbackSupportRequestData) =>
      await feedbackSupport(userData?.token ?? "", data),
    onSuccess: () => {
      toast.success(t("feedback.feedbackSubmitted"));
      form.resetForm();
    },
  });

  const form = useForm(INITIAL_FEEDBACK_SUPPORT_REQUEST_DATA, (data) =>
    feedbackMutation.mutate(data)
  );

  return (
    <DashboardFeedbackSupportLayout>
      <p className={`${outfit.className} text-textgray text-sm`}>
        {t("feedback.description")}
      </p>

      <form
        className={`${outfit.className} my-6 mt-4 space-y-4 max-w-md text-sm`}
        onSubmit={form.handleSubmit}
      >
        <FeedbackSupportInputGroup label={t("feedback.name")} />
        <FeedbackSupportInputGroup label={t("forms.email")} />
        <FeedbackSupportSelectGroup
          title={t("feedback.feedbackType")}
          defaultValue={t("feedback.newFeatureSuggestion")}
          options={[
            { label: t("feedback.featureIdea"), value: "feature-idea" },
            { label: t("feedback.improvement"), value: "improvement" },
            { label: t("feedback.bug"), value: "bug" },
            { label: t("feedback.generalComment"), value: "general-comment" },
          ]}
          onChange={(val) => {
            form.setFormField("subject", val);
            form.setFormField("category", val);
          }}
        />
        <FeedbackSupportTextareaGroup
          label={t("feedback.feedbackDetails")}
          value={form.formData.details}
          onChange={(val) => form.setFormField("details", val)}
        />
        <div>
          <label className="block text-sm  text-gray-700 mb-1">
            {t("feedback.attachScreenshot")}
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

        <div className="w-full flex justify-center">
          <FeedbackSupportButton isLoading={feedbackMutation.isPending} />
        </div>
      </form>
    </DashboardFeedbackSupportLayout>
  );
};

export default FeedbackPage;
