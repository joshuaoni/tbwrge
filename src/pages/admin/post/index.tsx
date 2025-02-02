import AdminDashboardLayout from "@/components/admin/layout";
import {
  FeedbackSupportFileGroup,
  FeedbackSupportInputGroup,
  FeedbackSupportTextareaGroup,
} from "@/components/dashboard/feedback-support/input-group";
import SubmitArticleFileGroup from "@/components/dashboard/submit-article/file-group";

const PostABlogPage = () => {
  return (
    <AdminDashboardLayout>
      <h2 className="font-bold text-xl mb-6">Article Details</h2>

      <form className="w-4/5 flex items-start gap-10">
        <div className="w-full space-y-6">
          <FeedbackSupportInputGroup label="Article Title" />
          <FeedbackSupportTextareaGroup label="Article Content" />
          <SubmitArticleFileGroup label="Upload Article (optional)" />
        </div>
        <div className="w-full flex items-center justify-center flex-col gap-20">
          <FeedbackSupportFileGroup label="Upload Article Image" />
          <button className="bg-[#145959] text-white py-3 px-8 font-bold rounded-lg w-fit flex items-center gap-2 disabled:bg-opacity-70 disabled:cursor-not-allowed">
            Post Article
          </button>
        </div>
      </form>
    </AdminDashboardLayout>
  );
};

export default PostABlogPage;
