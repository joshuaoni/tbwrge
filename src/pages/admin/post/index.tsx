import AdminDashboardLayout from "@/components/admin/layout";
import {
  FeedbackSupportFileGroup,
  FeedbackSupportInputGroup,
  FeedbackSupportTextareaGroup,
} from "@/components/dashboard/feedback-support/input-group";
import SubmitArticleFileGroup from "@/components/dashboard/submit-article/file-group";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogs, createBlog, updateBlog, getBlogItem } from "@/actions/blog";
import { useUserStore } from "@/hooks/use-user-store";
import { BlogItem } from "@/actions/blog";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  }
};

const PostABlogPage = () => {
  const { userData } = useUserStore();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [blogToApprove, setBlogToApprove] = useState<BlogItem | null>(null);
  const [blogToView, setBlogToView] = useState<BlogItem | null>(null);

  const { data: blogs, isLoading } = useQuery<BlogItem[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      if (!userData?.token) return [];
      return await getBlogs(userData.token);
    },
    enabled: !!userData?.token,
  });

  const createBlogMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!userData?.token) throw new Error("No token available");
      return await createBlog(userData.token, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setTitle("");
      setContent("");
      setImage(null);
      toast.success("Blog post created successfully");
    },
  });

  const approveBlogMutation = useMutation({
    mutationFn: async (blogId: string) => {
      if (!userData?.token) throw new Error("No token available");
      return await updateBlog(userData.token, blogId, {
        approve_guest_post: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setBlogToApprove(null);
      toast.success("Blog post approved successfully");
    },
    onError: () => {
      toast.error("Failed to approve blog post");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    createBlogMutation.mutate(formData);
  };

  return (
    <AdminDashboardLayout>
      <h2 className="font-bold text-xl mb-6">Article Details</h2>

      <form onSubmit={handleSubmit} className="w-4/5 flex items-start gap-10">
        <div className="w-full space-y-6">
          <FeedbackSupportInputGroup
            label="Article Title"
            value={title}
            onChange={setTitle}
          />
          <FeedbackSupportTextareaGroup
            label="Article Content"
            value={content}
            onChange={setContent}
          />
        </div>
        <div className="w-full flex items-center justify-center flex-col gap-20">
          <FeedbackSupportFileGroup
            label="Upload Article Image"
            onChange={(file) => setImage(file)}
          />
          <button
            type="submit"
            disabled={createBlogMutation.isPending || !title || !content}
            className="bg-[#145959] text-white py-3 px-8 font-bold rounded-lg w-fit flex items-center gap-2 disabled:bg-opacity-70 disabled:cursor-not-allowed"
          >
            {createBlogMutation.isPending ? "Posting..." : "Post Article"}
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-xl">
        <table className="w-full bg-white border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#D6D6D6] text-[#898989] text-sm font-bold">
              <th className="py-3 px-6 text-left rounded-tl-xl">User</th>
              <th className="py-3 px-6 text-center">Author & Email</th>
              <th className="py-3 px-6 text-left rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              blogs?.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-100">
                  <td className="py-3 px-6 text-left flex items-center space-x-2">
                    <Image
                      src={
                        blog.user.photo ||
                        "https://ui-avatars.com/api/?background=random&rounded=true"
                      }
                      alt={blog.user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm text-[#333]">
                        {blog.user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Submitted: {formatTimeAgo(blog.created_at)}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">{blog.user.name}</td>
                  <td className="py-3 px-6 space-x-6">
                    <button
                      className="bg-primary text-white px-10 py-2 rounded-3xl text-sm font-semibold"
                      onClick={() => setBlogToView(blog)}
                    >
                      View
                    </button>
                    <button
                      className="bg-primary text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                      onClick={() => setBlogToApprove(blog)}
                    >
                      Approve
                    </button>
                    <button className="bg-primary text-white px-6 py-2 rounded-3xl text-sm font-semibold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Blog Dialog */}
      <Dialog open={!!blogToView} onOpenChange={() => setBlogToView(null)}>
        <DialogContent
          className="bg-white text-[#222] rounded-2xl max-w-sm w-full px-8 py-4 flex flex-col items-center max-h-[95vh] overflow-y-auto shadow-xl"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            margin: 0,
          }}
        >
          <div className="w-full flex justify-between items-center mb-8">
            <h2 className="font-bold text-xl">Blog Post Details</h2>
            <button
              className="text-[#16A34A] font-medium text-sm"
              onClick={() => setBlogToView(null)}
            >
              Back
            </button>
          </div>
          {blogToView && (
            <div className="w-full flex flex-col gap-6">
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Author
                </div>
                <div className="font-bold text-base">
                  {blogToView.user.name}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Submitted
                </div>
                <div className="font-bold text-base">
                  {new Date(blogToView.created_at).toLocaleString([], {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Title
                </div>
                <div className="font-bold text-base">{blogToView.title}</div>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-semibold mb-1">
                  Content
                </div>
                <div className="text-sm text-[#222] whitespace-pre-line">
                  {blogToView.content}
                </div>
              </div>
              <div className="flex justify-start mt-2">
                {blogToView.image ? (
                  <img
                    src={blogToView.image}
                    alt="Blog"
                    className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-400">No Image</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Blog Confirmation Dialog */}
      <Dialog
        open={!!blogToApprove}
        onOpenChange={() => setBlogToApprove(null)}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>Approve Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this blog post?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setBlogToApprove(null)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() =>
                blogToApprove && approveBlogMutation.mutate(blogToApprove.id)
              }
              disabled={approveBlogMutation.isPending}
            >
              {approveBlogMutation.isPending ? "Approving..." : "Approve"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
};

export default PostABlogPage;
