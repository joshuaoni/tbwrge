import DashboardWrapper from "@/components/dashboard-wrapper";
import {
  FeedbackSupportFileGroup,
  FeedbackSupportInputGroup,
  FeedbackSupportTextareaGroup,
} from "@/components/dashboard/feedback-support/input-group";
import SubmitArticleFileGroup from "@/components/dashboard/submit-article/file-group";
import SubmitArticleRecordVoice from "@/components/dashboard/submit-article/record-voice";
import CheckBoxInput from "@/components/settings/checkbox-input";
import { urbanist } from "@/constants/app";
import classNames from "classnames";

const DashboardSubmitArticlePage = () => {
  return (
    <DashboardWrapper>
      <h2 className={classNames(urbanist.className, "py-4 font-bold text-3xl")}>
        Submit an Article
      </h2>

      <div className="flex gap-2">
        <section className="px-4 py-6 w-full">
          <h3 className="font-bold">Article Details</h3>
          <div className="py-4 space-y-4">
            <FeedbackSupportInputGroup label="Article Title" />
            <FeedbackSupportTextareaGroup label="Article Content" />
            <SubmitArticleFileGroup label="Upload Article (optional)" />

            <p className="relative uppercase text-center text-[#6D6D6D] py-6 px-4 after:absolute after:top-1/2 after:right-8 after:h-0.5 after:w-5/12 after:bg-[#E7E7E7] before:absolute before:top-1/2 before:left-8 before:h-0.5 before:w-5/12 before:bg-[#E7E7E7]">
              or
            </p>

            <SubmitArticleRecordVoice />
          </div>
        </section>
        <section className="px-4 py-6 w-full">
          <h3 className="font-bold">Author Information</h3>

          <div className="py-4 space-y-4">
            <FeedbackSupportInputGroup label="Full name" />
            <FeedbackSupportInputGroup label="Job Title (optional)" />
            <FeedbackSupportInputGroup label="Comapany (optional)" />
            <FeedbackSupportFileGroup label="Upload Proflie Image" />

            <h3 className="text-lg font-bold py-3">Contact Information</h3>

            <FeedbackSupportInputGroup label="Email" />
            <CheckBoxInput label="Agree to terms and condtions" />

            <div className="w-full flex justify-center">
              <button className="px-3 py-3.5 bg-lightgreen text-sm text-white rounded-md font-semibold">
                Submit Article
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardWrapper>
  );
};

export default DashboardSubmitArticlePage;
