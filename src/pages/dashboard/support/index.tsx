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

const DashboardSupportPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { userData } = useUserStore();

  const supportMutation = useMutation({
    mutationFn: async (data: FeedbackSupportRequestData) =>
      await feedbackSupport(userData?.token ?? "", data),
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
      <p className={`${outfit.className} text-textgray`}>
        You can contact us today! We are dedicated to solving your problems
      </p>

      <section className={`${outfit.className} flex gap-10 items-start my-6`}>
        <form
          className="w-full my-6 space-y-7 max-w-md"
          onSubmit={form.handleSubmit}
        >
          <FeedbackSupportInputGroup label="Name" />
          <FeedbackSupportInputGroup label="Email" />
          <FeedbackSupportSelectGroup
            title="Support Category"
            defaultValue="General Inquiry"
            options={[
              { label: "General Inquiry", value: "general-inquiry" },
              { label: "Technical Support", value: "technical-support" },
              { label: "Billing Inquiry", value: "billing-inquiry" },
              { label: "Report a Problem", value: "report-a-problem" },
            ]}
            onChange={(val) => form.setFormField("category", val)}
          />
          <FeedbackSupportInputGroup
            label="Subject"
            value={form.formData.subject}
            onChange={(val) => form.setFormField("subject", val)}
          />
          <FeedbackSupportTextareaGroup
            label="Description"
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
          <FeedbackSupportSelectGroup
            title="Preferred Contact Method"
            defaultValue="Email"
            options={[
              { label: "Email", value: "email" },
              { label: "Phone", value: "phone" },
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
                title: "What is Candivet?",
                content:
                  "Candivet is a powerful online platform designed to help job seekers create professional, tailored CVs and cover letters. With a focus on simplifying the job application process, Candivet provides tools for building personalized documents, optimizing content for specific job roles, and ranking candidates based on their qualifications. Whether you're applying for a new job or looking to update your professional profile, Candivet offers easy-to-use features to enhance your chances of success in the competitive job market.",
              },
              {
                title: "How to upgrade or downgrade your subscription.",
                content:
                  "Details about subscription upgrades and downgrades go here.",
              },
              {
                title: "How to reset your password",
                content: "Details about resetting your password go here.",
              },
              {
                title:
                  "What happens to your data if you cancel your subscription.",
                content:
                  "Information about data retention after cancellation goes here.",
              },
              {
                title: "How to create a tailored CV or cover letter.",
                content: "Steps to create a CV or cover letter go here.",
              },
              {
                title: "Tips for using the candidate ranking tool.",
                content:
                  "Helpful tips for maximizing the candidate ranking tool go here.",
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
            Still have more questions?&nbsp;
            <Link
              href="/dashboard/feedback"
              className="text-lightgreen underline"
            >
              Contact Us
            </Link>
          </p>
        </section>
      </section>
    </DashboardFeedbackSupportLayout>
  );
};

export default DashboardSupportPage;
