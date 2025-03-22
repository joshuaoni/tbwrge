import React from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/actions/create-post";
import { updatePost } from "@/actions/update-post";
import { useUserStore } from "@/hooks/use-user-store";
import toast from "react-hot-toast";
import { Post } from "@/actions/get-posts";
import { useQueryClient } from "@tanstack/react-query";

interface CreatePostProps {
  onClose: () => void;
  post?: Post; // Optional post for editing
}

const CreatePost = ({ onClose, post }: CreatePostProps) => {
  const [title, setTitle] = React.useState(post?.title || "");
  const [text, setText] = React.useState(post?.text || "");
  const [files, setFiles] = React.useState<File[]>([]);
  const [categoryIds, setCategoryIds] = React.useState<string[]>([]);
  const [tags, setTags] = React.useState("");
  const { userData } = useUserStore();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async () => {
      if (!userData?.token) {
        throw new Error("No authentication token found");
      }
      if (!title.trim() || !text.trim()) {
        throw new Error("Title and content are required");
      }
      return createPost(
        {
          title: title.trim(),
          text: text.trim(),
          files,
          category_ids: categoryIds,
        },
        userData.token
      );
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create post");
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async () => {
      if (!userData?.token) {
        throw new Error("No authentication token found");
      }
      return updatePost(
        post!.id.toString(),
        {
          title,
          text,
        },
        userData.token
      );
    },
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update post");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (post) {
      updatePostMutation.mutate();
    } else {
      createPostMutation.mutate();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_50px_0px_rgba(0,0,0,0.25)] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFF1E8] border border-[#EA942C] flex items-center justify-center">
            <Image
              src="/Mask.png"
              alt={userData?.user?.name || "User"}
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
          <span className="text-base font-medium">
            {userData?.user?.name || "User"}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#F8F9FF] border border-gray-200 text-sm focus:outline-none focus:border-gray-300"
          required
        />
        <textarea
          placeholder="Write your post or question here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[280px] px-4 py-3 rounded-lg bg-[#F8F9FF] border border-gray-200 text-sm focus:outline-none focus:border-gray-300 resize-none"
          required
        />
        <div className="flex items-center gap-4 border-t pt-4">
          <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 10.8333H10.8333V15.8333H9.16667V10.8333H4.16667V9.16667H9.16667V4.16667H10.8333V9.16667H15.8333V10.8333Z"
                fill="currentColor"
              />
            </svg>
            Add media
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </label>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
          >
            Add Category
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#F8F9FF] border border-gray-200 text-sm focus:outline-none focus:border-gray-300"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={
              (post ? updatePostMutation : createPostMutation).isPending ||
              !title.trim() ||
              !text.trim()
            }
            className="px-6 py-2.5 bg-[#065844] text-white rounded-lg text-sm font-medium hover:bg-[#054e3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(post ? updatePostMutation : createPostMutation).isPending
              ? post
                ? "Updating..."
                : "Posting..."
              : post
              ? "Update"
              : "Post"}
          </button>
        </div>
      </form>

      {/* File Preview */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Selected Files:</h4>
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg"
              >
                <span className="text-sm text-gray-600">{file.name}</span>
                <button
                  type="button"
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
