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

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

// Add custom styles for ReactQuill
const quillStyles = `
  .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid #e5e7eb;
    font-family: 'Outfit', sans-serif;
  }

  .ql-container.ql-snow {
    border: none;
    font-family: 'Outfit', sans-serif;
  }

  .ql-editor {
    background-color: #F9FAFB;
    font-family: 'Outfit', sans-serif;
  }

  .ql-editor.ql-blank::before {
    font-style: normal;
    font-family: 'Outfit', sans-serif;
    color: #9CA3AF;
    font-size: 14px;
    position: absolute;
    content: 'Write article content here...';
    pointer-events: none;
  }

  .ql-toolbar button {
    font-family: 'Outfit', sans-serif;
  }

  /* Apply Outfit font to all text in the editor */
  .ql-editor p,
  .ql-editor ol,
  .ql-editor ul,
  .ql-editor pre,
  .ql-editor blockquote,
  .ql-editor h1,
  .ql-editor h2,
  .ql-editor h3,
  .ql-editor h4,
  .ql-editor h5,
  .ql-editor h6 {
    font-family: 'Outfit', sans-serif;
  }
`;

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

  const isFormValid = () => {
    return (
      tc &&
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.title.trim() !== "" &&
      formData.content.trim() !== ""
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
      <div className={`${outfit.className} bg-white p-6 rounded-lg`}>
        <style>{quillStyles}</style>
        <h2
          className={classNames(urbanist.className, "text-3xl font-bold mb-6")}
        >
          Submit an Article
        </h2>

        <div className="flex gap-8">
          <section className="w-1/2">
            <h3 className="text-lg font-semibold mb-4">Article Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleSetFormData("title", e.target.value)}
                  placeholder="Enter article title"
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Article Content <span className="text-red-500">*</span>
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
                      placeholder="Write your article content here..."
                    />
                  </div>
                </div>
              </div>

              <ArticleFileGroup
                label="Upload Article"
                onChange={(file) => handleSetFormData("article_upload", file)}
              />
            </div>
          </section>

          <section className="w-1/2">
            <h3 className="text-lg font-semibold mb-4">Author Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleSetFormData("name", e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) =>
                    handleSetFormData("job_title", e.target.value)
                  }
                  placeholder="Enter your job title"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleSetFormData("company", e.target.value)}
                  placeholder="Enter your company"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Profile Image
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleSetFormData("profile_image", e.target.files[0]);
                    }
                  }}
                  accept="image/*"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
                />
              </div>

              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleSetFormData("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                />
              </div>

              <div className="flex items-center">
                <CheckBoxInput
                  label="Agree to terms and conditions"
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
                      Submitting...
                    </span>
                  ) : (
                    "Submit Article"
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
