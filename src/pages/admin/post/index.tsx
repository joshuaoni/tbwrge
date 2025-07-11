import AdminDashboardLayout from "@/components/admin/layout";
import {
  FeedbackSupportFileGroup,
  FeedbackSupportInputGroup,
} from "@/components/dashboard/feedback-support/input-group";
import SubmitArticleFileGroup from "@/components/dashboard/submit-article/file-group";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBlogsAdmin,
  createBlog,
  updateBlog,
  getBlogItem,
  deleteBlog,
} from "@/actions/blog";
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
import dynamic from "next/dynamic";
import { outfit } from "@/constants/app";
import classNames from "classnames";

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
  const [blogToDelete, setBlogToDelete] = useState<BlogItem | null>(null);
  const [blogToEdit, setBlogToEdit] = useState<BlogItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("Pending Approval");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const approvedFilter =
    activeTab === "Approved"
      ? {
          approved: true,
          page: currentPage,
          limit: 10,
          ...(searchTerm && { text: searchTerm }),
        }
      : {
          approved: false,
          page: currentPage,
          limit: 10,
          ...(searchTerm && { text: searchTerm }),
        };

  const { data: blogs, isLoading } = useQuery<BlogItem[]>({
    queryKey: ["blogs", approvedFilter],
    queryFn: async () => {
      if (!userData?.token) return [];
      return await getBlogsAdmin(userData.token, approvedFilter);
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

  const deleteBlogMutation = useMutation({
    mutationFn: async (blogId: string) => {
      if (!userData?.token) throw new Error("No token available");
      return await deleteBlog(userData.token, blogId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setBlogToDelete(null);
      toast.success("Blog post deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete blog post");
    },
  });

  const editBlogMutation = useMutation({
    mutationFn: async (data: { blogId: string; formData: FormData }) => {
      if (!userData?.token) throw new Error("No token available");
      return await updateBlog(userData.token, data.blogId, {
        title: data.formData.get("title") as string,
        content: data.formData.get("content") as string,
        image: data.formData.get("image") as File,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setBlogToEdit(null);
      setEditTitle("");
      setEditContent("");
      setEditImage(null);
      toast.success("Blog post updated successfully");
    },
    onError: () => {
      toast.error("Failed to update blog post");
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

  const blogsSafe = blogs ?? [];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(0); // Reset to first page when changing tabs
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(0); // Reset to first page when searching
  };

  return (
    <AdminDashboardLayout>
      <h2 className={`${outfit.className} font-bold text-xl mb-6`}>
        Article Details
      </h2>

      <form
        onSubmit={handleSubmit}
        className={`${outfit.className} w-full flex items-start gap-16`}
      >
        <div className="w-full space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Article Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              placeholder="Enter article title"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Article Content <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="bg-gray-50"
                placeholder="Write your article content here..."
              />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center flex-col gap-8">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Article Image
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              accept=".pdf,.doc,.docx"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
            />
          </div>
          <button
            type="submit"
            disabled={createBlogMutation.isPending || !title || !content}
            className="bg-[#145959] text-white py-3 px-8 font-bold rounded-lg w-fit flex items-center gap-2 disabled:bg-opacity-70 disabled:cursor-not-allowed"
          >
            {createBlogMutation.isPending ? "Posting..." : "Post Article"}
          </button>
        </div>
      </form>

      <div className={`${outfit.className} mt-10 space-y-4`}>
        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search blogs by title or content..."
              className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => handleSearchChange("")}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6">
          {["Pending Approval", "Approved"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={classNames("font-medium", {
                "text-primary": activeTab === tab,
              })}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl">
          <table className="w-full bg-white border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#D6D6D6] text-[#898989] text-sm font-bold">
                <th className="py-3 px-6 text-left rounded-tl-xl rounded-bl-xl flex-1">
                  User
                </th>
                <th className="py-3 px-6 text-left w-1/5">Author & Email</th>
                <th className="py-3 px-6 text-left rounded-tr-xl rounded-br-xl w-1/2 min-w-[340px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : blogsSafe.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 text-center">
                    No blogs found in this category.
                  </td>
                </tr>
              ) : (
                blogsSafe.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-100">
                    <td className="py-3 px-6 text-left flex items-center space-x-2 flex-1">
                      <div>
                        <p className="font-medium text-sm text-[#333] truncate max-w-xs">
                          {blog.title}
                        </p>
                        {blog.content && (
                          <p className="text-xs text-gray-500 truncate max-w-xs">
                            {blog.content
                              .replace(/<[^>]+>/g, "")
                              .replace(/\n/g, " ")}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Submitted: {formatTimeAgo(blog.created_at)}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left w-1/5">
                      {blog.user?.name}
                    </td>
                    <td className="py-3 px-6 space-x-3 w-1/2 min-w-[340px]">
                      <button
                        className="bg-primary text-white px-10 py-2 rounded-3xl text-sm font-semibold"
                        onClick={() => setBlogToView(blog)}
                      >
                        View
                      </button>
                      <button
                        className="bg-primary text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                        onClick={() => {
                          setBlogToEdit(blog);
                          setEditTitle(blog.title);
                          setEditContent(blog.content || "");
                          setEditImage(null);
                        }}
                      >
                        Edit
                      </button>
                      {!blog.approved && (
                        <button
                          className="bg-primary text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                          onClick={() => setBlogToApprove(blog)}
                        >
                          Approve
                        </button>
                      )}
                      <button
                        className="bg-primary text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                        onClick={() => setBlogToDelete(blog)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-600">
              Page {currentPage + 1}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={blogsSafe.length < 10}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
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
                  {blogToView.user?.name}
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
                <div
                  className="text-sm text-[#222] whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: blogToView.content || "" }}
                />
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

      {/* Delete Blog Confirmation Dialog */}
      <Dialog open={!!blogToDelete} onOpenChange={() => setBlogToDelete(null)}>
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setBlogToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                blogToDelete && deleteBlogMutation.mutate(blogToDelete.id)
              }
              disabled={deleteBlogMutation.isPending}
            >
              {deleteBlogMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Blog Dialog */}
      <Dialog open={!!blogToEdit} onOpenChange={() => setBlogToEdit(null)}>
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update the blog post details below.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.append("title", editTitle);
              formData.append("content", editContent);
              if (editImage) {
                formData.append("image", editImage);
              }
              if (blogToEdit) {
                editBlogMutation.mutate({ blogId: blogToEdit.id, formData });
              }
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
                placeholder="Enter article title"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Article Content <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={editContent}
                  onChange={setEditContent}
                  modules={modules}
                  formats={formats}
                  className="bg-gray-50"
                  placeholder="Write your article content here..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Article Image
              </label>

              {/* Current Image Preview */}
              {blogToEdit?.image && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <div className="relative inline-block">
                    <img
                      src={blogToEdit.image}
                      alt="Current blog image"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="absolute top-0 right-0 bg-gray-800 bg-opacity-75 text-white text-xs px-2 py-1 rounded-bl-lg">
                      Current
                    </div>
                  </div>
                </div>
              )}

              <input
                type="file"
                onChange={(e) => setEditImage(e.target.files?.[0] || null)}
                accept=".pdf,.doc,.docx"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
              />

              {/* New Image Preview */}
              {editImage && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    New Image Preview:
                  </p>
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(editImage)}
                      alt="New image preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="absolute top-0 right-0 bg-blue-600 bg-opacity-75 text-white text-xs px-2 py-1 rounded-bl-lg">
                      New
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                onClick={() => setBlogToEdit(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  editBlogMutation.isPending || !editTitle || !editContent
                }
              >
                {editBlogMutation.isPending ? "Updating..." : "Update Blog"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
};

export default PostABlogPage;
