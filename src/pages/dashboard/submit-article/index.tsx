import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

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
import { outfit, urbanist } from "@/constants/app";
import { useUserStore } from "@/hooks/use-user-store";
import toast from "react-hot-toast";
import ArticleFileGroup from "@/components/dashboard/submit-article/article-file-group";
import { useTranslation } from "react-i18next";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ size: ["small", false, "large"] }],
    [{ align: [] }],
    ["list", "bullet"],
    ["link", "emoji"],
    ["clean"],
  ],
};

const formats = [
  "bold",
  "italic",
  "underline",
  "size",
  "align",
  "list",
  "bullet",
  "link",
  "emoji",
];

const DashboardSubmitArticlePage = () => {
  const { t } = useTranslation();
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

  function isContentEmpty(content: string) {
    // Remove HTML tags and whitespace
    return content.replace(/<(.|\n)*?>/g, "").trim() === "";
  }

  const isFormValid = () => {
    const hasContent = !isContentEmpty(formData.content);
    const hasUpload = !!formData.article_upload;
    // Only one of content or upload must be present, but not both
    const onlyOne = (hasContent || hasUpload) && !(hasContent && hasUpload);
    return (
      tc &&
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.title.trim() !== "" &&
      onlyOne
    );
  };

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
      setTc(false);
    },
  });

  return (
    <DashboardWrapper>
      <div className={`${outfit.className} bg-white rounded-lg`}>
        <h2
          className={classNames(outfit.className, "text-sm font-semibold mb-4")}
        >
          {t("submitArticle.title")}
        </h2>

        <div className={`${outfit.className} flex gap-8`}>
          <section className="w-1/2">
            <h3 className="text-sm font-semibold mb-4">
              {t("submitArticle.articleDetails")}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("submitArticle.articleTitle")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleSetFormData("title", e.target.value)}
                  placeholder={t("submitArticle.enterArticleTitle")}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("submitArticle.articleContent")}
                    <span className="text-xs text-gray-400 ml-2">
                      {t("submitArticle.articleContentNote")}
                    </span>
                  </label>
                  <span className="text-sm text-gray-500">
                    {formData.content.length}/2000
                  </span>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[300px]">
                  <div className="h-[calc(300px-42px)]">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(value: string) => {
                        if (value.length <= 2000) {
                          handleSetFormData("content", value);
                        }
                      }}
                      modules={modules}
                      formats={formats}
                      className="bg-gray-50 h-full"
                      style={{ height: "100%" }}
                      placeholder={t("submitArticle.writeArticleContent")}
                    />
                  </div>
                </div>
              </div>

              <ArticleFileGroup
                label={t("submitArticle.uploadArticle")}
                onChange={(file) => handleSetFormData("article_upload", file)}
              />
            </div>
          </section>

          <section className="w-1/2">
            <h3 className="text-sm font-semibold mb-4">
              {t("submitArticle.authorInformation")}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("submitArticle.fullName")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleSetFormData("name", e.target.value)}
                  placeholder={t("submitArticle.enterYourName")}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("submitArticle.jobTitle")}
                </label>
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) =>
                    handleSetFormData("job_title", e.target.value)
                  }
                  placeholder={t("submitArticle.enterJobTitle")}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("submitArticle.company")}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleSetFormData("company", e.target.value)}
                  placeholder={t("submitArticle.enterCompany")}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("submitArticle.uploadProfileImage")}
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleSetFormData("profile_image", e.target.files[0]);
                    }
                  }}
                  accept="image/*"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200 text-sm"
                />
              </div>

              <h3 className="text-sm font-semibold mb-4">
                {t("submitArticle.contactInformation")}
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("submitArticle.email")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleSetFormData("email", e.target.value)}
                  placeholder={t("submitArticle.enterEmail")}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280] text-sm"
                />
              </div>

              <div className="flex items-center">
                <CheckBoxInput
                  label={t("submitArticle.agreeTerms")}
                  value={tc}
                  onChange={(val) => setTc(val)}
                />
              </div>

              <div className="flex justify-center">
                <button
                  disabled={!isFormValid() || submitArticleMutation.isPending}
                  className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => submitArticleMutation.mutate(formData)}
                >
                  {submitArticleMutation.isPending ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("submitArticle.submitting")}
                    </span>
                  ) : (
                    t("submitArticle.submitArticle")
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default DashboardSubmitArticlePage;
