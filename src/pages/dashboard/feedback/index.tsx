import { useState } from "react";

import FeedbackSupportButton from "@/components/dashboard/feedback-support/button";
import {
  FeedbackSupportFileGroup,
  FeedbackSupportInputGroup,
  FeedbackSupportSelectGroup,
  FeedbackSupportTextareaGroup,
} from "@/components/dashboard/feedback-support/input-group";
import DashboardFeedbackSupportLayout from "@/components/dashboard/feedback-support/layout";

const FeedbackPage = () => {
  const [feedbackType, setFeedbackType] = useState("");

  return (
    <DashboardFeedbackSupportLayout>
      <p className="text-textgray">
        You can submit feedback on new feature ideas, improvements, bugs, or
        general comments. We value your input to enhance the Candivet platform
      </p>

      <form className="my-6 space-y-7 max-w-md">
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
          onChange={setFeedbackType}
        />
        <FeedbackSupportTextareaGroup label="Feedback Details" />
        <FeedbackSupportFileGroup label="Attach Screenshot (Optional)" />

        <div className="w-full flex justify-end">
          <FeedbackSupportButton />
        </div>
      </form>
    </DashboardFeedbackSupportLayout>
  );
};

export default FeedbackPage;
