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

const FeedbackPage = () => {
  const { userData } = useUserStore();

  const feedbackMutation = useMutation({
    mutationFn: async (data: FeedbackSupportRequestData) =>
      await feedbackSupport(userData?.token ?? "", data),
    onSuccess: () => {
      toast.success("Feedback submitted successfully");
      form.resetForm();
    },
  });

  const form = useForm(INITIAL_FEEDBACK_SUPPORT_REQUEST_DATA, (data) =>
    feedbackMutation.mutate(data)
  );

  return (
    <DashboardFeedbackSupportLayout>
      <p className={`${outfit.className} text-textgray`}>
        You can submit feedback on new feature ideas, improvements, bugs, or
        general comments. We value your input to enhance the Candivet platform
      </p>

      <form
        className={`${outfit.className} my-6 space-y-7 max-w-md`}
        onSubmit={form.handleSubmit}
      >
        <FeedbackSupportInputGroup label="Name" />
        <FeedbackSupportInputGroup label="Email" />
        <FeedbackSupportSelectGroup
          title="Feedback Type"
          defaultValue="New Feature Suggestion"
          options={[
            { label: "Feature Idea", value: "feature-idea" },
            { label: "Improvement", value: "improvement" },
            { label: "Bug", value: "bug" },
            { label: "General Comment", value: "general-comment" },
          ]}
          onChange={(val) => {
            form.setFormField("subject", val);
            form.setFormField("category", val);
          }}
        />
        <FeedbackSupportTextareaGroup
          label="Feedback Details"
          value={form.formData.details}
          onChange={(val) => form.setFormField("details", val)}
        />
        <div>
          <label className="block text-sm  text-gray-700 mb-1">
            Attach Screenshot
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
