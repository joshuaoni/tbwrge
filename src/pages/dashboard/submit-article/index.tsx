import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";

import {
  INITIAL_SUBMIT_ARTICLE_REQUEST_DATA,
  SubmitAnArticleRequestData,
  submitArticle,
} from "@/actions/submit-article";
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
import { useUserStore } from "@/hooks/use-user-store";
import toast from "react-hot-toast";

const DashboardSubmitArticlePage = () => {
  const [formData, setFormData] = useState<SubmitAnArticleRequestData>(
    INITIAL_SUBMIT_ARTICLE_REQUEST_DATA
  );
  const { userData } = useUserStore();

  const [tc, setTc] = useState(false);

  function handleSetFormData(
    key: keyof SubmitAnArticleRequestData,
    value: string | File | Blob
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  const submitArticleMutation = useMutation({
    mutationFn: async (data: SubmitAnArticleRequestData) =>
      await submitArticle(userData?.token ?? "", data),
    onError: (error: any) => {
      if (error.response?.data?.detail) {
        error.response.data.detail.forEach((err: any) => {
          toast.error(`${err.loc.join(" ")} ${err.msg}`);
        });
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Article submitted successfully");
      setFormData(INITIAL_SUBMIT_ARTICLE_REQUEST_DATA);
    },
  });

  return (
    <DashboardWrapper>
      <h2 className={classNames(urbanist.className, "py-4 font-bold text-3xl")}>
        Submit an Article
      </h2>

      <div className="flex gap-2">
        <section className="px-4 py-6 w-full">
          <h3 className="font-bold">Article Details</h3>
          <div className="py-4 space-y-4">
            <FeedbackSupportInputGroup
              label="Article Title"
              value={formData.title}
              onChange={(val) => handleSetFormData("title", val)}
            />
            <FeedbackSupportTextareaGroup
              label="Article Content"
              value={formData.content}
              onChange={(val) => handleSetFormData("content", val)}
            />
            <SubmitArticleFileGroup
              label="Upload Article (optional)"
              onChange={(file) => handleSetFormData("article_upload", file)}
            />

            <p className="relative uppercase text-center text-[#6D6D6D] py-6 px-4 after:absolute after:top-1/2 after:right-8 after:h-0.5 after:w-5/12 after:bg-[#E7E7E7] before:absolute before:top-1/2 before:left-8 before:h-0.5 before:w-5/12 before:bg-[#E7E7E7]">
              or
            </p>

            <SubmitArticleRecordVoice />
          </div>
        </section>
        <section className="px-4 py-6 w-full">
          <h3 className="font-bold">Author Information</h3>

          <div className="py-4 space-y-4">
            <FeedbackSupportInputGroup
              label="Full name"
              value={formData.name}
              onChange={(val) => handleSetFormData("name", val)}
            />
            <FeedbackSupportInputGroup
              label="Job Title (optional)"
              value={formData.job_title}
              onChange={(val) => handleSetFormData("job_title", val)}
            />
            <FeedbackSupportInputGroup
              label="Comapany (optional)"
              value={formData.company}
              onChange={(val) => handleSetFormData("company", val)}
            />
            <FeedbackSupportFileGroup
              label="Upload Proflie Image"
              onChange={(file) => handleSetFormData("profile_image", file)}
              file={formData.profile_image}
            />

            <h3 className="text-lg font-bold py-3">Contact Information</h3>

            <FeedbackSupportInputGroup
              label="Email"
              value={formData.email}
              onChange={(val) => handleSetFormData("email", val)}
            />
            <CheckBoxInput
              label="Agree to terms and condtions"
              value={tc}
              onChange={(val) => setTc(val)}
            />

            <div className="w-full flex justify-center">
              <button
                disabled={!tc}
                className="px-3 py-3.5 bg-lightgreen text-sm text-white rounded-md font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={() => submitArticleMutation.mutate(formData)}
              >
                {submitArticleMutation.isPending
                  ? "Submitting..."
                  : "Submit Article"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardWrapper>
  );
};

export default DashboardSubmitArticlePage;
