import FeedbackSupportAccordion from "@/components/dashboard/feedback-support/accordion";
import FeedbackSupportButton from "@/components/dashboard/feedback-support/button";
import {
  FeedbackSupportFileGroup,
  FeedbackSupportInputGroup,
  FeedbackSupportSelectGroup,
  FeedbackSupportTextareaGroup,
} from "@/components/dashboard/feedback-support/input-group";
import DashboardFeedbackSupportLayout from "@/components/dashboard/feedback-support/layout";
import Link from "next/link";
import { useState } from "react";

const DashboardSupportPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [feedbackType, setFeedbackType] = useState("");

  return (
    <DashboardFeedbackSupportLayout>
      <p className="text-textgray">
        You can contact us today! We are dedicated to solving your problems
      </p>

      <section className="flex gap-10 items-start ">
        <form className="w-full my-6 space-y-7 max-w-md">
          <FeedbackSupportInputGroup label="Name (Optional)" />
          <FeedbackSupportInputGroup label="Email (Optional)" />
          <FeedbackSupportSelectGroup
            title="Support Category"
            defaultValue="General Inquiry"
            options={[
              { label: "General Inquiry", value: "general-inquiry" },
              { label: "Technical Support", value: "technical-support" },
              { label: "Billing Inquiry", value: "billing-inquiry" },
              { label: "Report a Problem", value: "report-a-problem" },
            ]}
            onChange={setFeedbackType}
          />
          <FeedbackSupportInputGroup label="Subject" />
          <FeedbackSupportTextareaGroup label="Description" />
          <FeedbackSupportFileGroup label="Attach Screenshot (Optional)" />
          <FeedbackSupportSelectGroup
            title="Preferred Contact Method"
            defaultValue="Email"
            options={[
              { label: "Email", value: "email" },
              { label: "Phone", value: "phone" },
            ]}
            onChange={setFeedbackType}
          />

          <div className="w-full flex justify-end">
            <FeedbackSupportButton />
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
