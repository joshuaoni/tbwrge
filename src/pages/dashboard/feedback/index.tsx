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
      <p className="text-textgray">
        You can submit feedback on new feature ideas, improvements, bugs, or
        general comments. We value your input to enhance the Candivet platform
      </p>

      <form className="my-6 space-y-7 max-w-md" onSubmit={form.handleSubmit}>
        <FeedbackSupportInputGroup label="Name (Optional)" />
        <FeedbackSupportInputGroup label="Email (Optional)" />
        <FeedbackSupportSelectGroup
          title="Feedback Type"
          defaultValue="New Feature Suggestion"
          options={[
            { label: "Feature Idea", value: "feature-idea" },
            { label: "Improvement", value: "improvement" },
            { label: "Bug", value: "bug" },
            { label: "General Comment", value: "general-comment" },
          ]}
          onChange={(val) => form.setFormField("category", val)}
        />
        <FeedbackSupportTextareaGroup
          label="Feedback Details"
          value={form.formData.details}
          onChange={(val) => form.setFormField("details", val)}
        />
        <FeedbackSupportFileGroup
          label="Attach Screenshot (Optional)"
          file={form.formData.image}
          onChange={(file) => form.setFormField("image", file)}
        />

        <div className="w-full flex justify-end">
          <FeedbackSupportButton isLoading={feedbackMutation.isPending} />
        </div>
      </form>
    </DashboardFeedbackSupportLayout>
  );
};

export default FeedbackPage;
