import React from "react";
import Image from "next/image";
import {
  ChatBubbleLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/actions/get-posts";
import { getComments, Comment } from "@/actions/get-comments";
import { createComment } from "@/actions/create-comment";
import { useUserStore } from "@/hooks/use-user-store";
import toast from "react-hot-toast";
import { deleteComment } from "@/actions/delete-comment";
import { TrashIcon } from "@heroicons/react/24/outline";

interface PostDetailsProps {
  post: Post;
  onClose: () => void;
}

const PostDetails = ({ post: initialPost, onClose }: PostDetailsProps) => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [newComment, setNewComment] = React.useState("");
  const [post, setPost] = React.useState(initialPost);
  const { userData } = useUserStore();
  const queryClient = useQueryClient();

  const commentsMutation = useMutation<Comment[], Error>({
    mutationKey: ["get-comments", post.id],
    mutationFn: async () => {
      if (!userData?.token) {
        throw new Error("No authentication token found");
      }
      return getComments(post.id.toString(), userData.token);
    },
    onSuccess: (data) => {
      setComments(data);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to load comments");
    },
  });

  // Update local post state when initialPost changes
  React.useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  const createCommentMutation = useMutation<Comment, Error>({
    mutationKey: ["create-comment"],
    mutationFn: async () => {
      if (!userData?.token) {
        throw new Error("No authentication token found");
      }
      if (!newComment.trim()) {
        throw new Error("Comment cannot be empty");
      }
      return createComment(
        post.id.toString(),
        { text: newComment.trim() },
        userData.token
      );
    },
    onSuccess: (data) => {
      setComments((prev) => [data, ...prev]);
      setNewComment("");
      toast.success("Comment posted successfully");
      // Update local post state
      setPost((prev) => ({ ...prev, comments: prev.comments + 1 }));
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to post comment");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      if (!userData?.token) {
        throw new Error("Please sign in to delete comments");
      }
      return deleteComment(commentId, userData.token);
    },
    onSuccess: (_, commentId) => {
      toast.success("Comment deleted successfully");
      // Update local post state
      setPost((prev) => ({ ...prev, comments: prev.comments - 1 }));
      // Remove comment from local state
      setComments((prev) =>
        prev.filter((comment) => comment.id.toString() !== commentId)
      );
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete comment");
    },
  });

  React.useEffect(() => {
    if (userData?.token) {
      commentsMutation.mutate();
    }
  }, [userData?.token, post.id]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    createCommentMutation.mutate();
  };

  return (
    <div>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="mb-6 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close post"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M19 12H5M12 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Author Info */}
      <div className="flex items-center gap-2 mb-4">
        {post.user.profile_picture ? (
          <Image
            src={post.user.profile_picture}
            alt={`${post.user.name} ${post.user.last_name}`}
            width={30}
            height={30}
            className="rounded-full md:w-[30px] md:h-[30px]"
          />
        ) : (
          <UserCircleIcon className="w-8 h-8 text-gray-500" />
        )}
        <span className="text-sm font-medium">
          {post.user.name} {post.user.last_name}
        </span>
      </div>

      {/* Post Title and Content */}
      <h1 className="text-2xl font-semibold text-[#1E2937] mb-4">
        {post.title}
      </h1>
      <p className="text-sm text-gray-600 mb-6">{post.text}</p>

      {/* Post Stats */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center">
          <Image
            src="/like.png"
            alt="Likes"
            width={16}
            height={16}
            className="mr-1"
          />
          <span className="text-sm text-gray-600">{post.upvotes}</span>
        </div>
        <span className="text-gray-400">•</span>
        <div className="flex items-center">
          <ChatBubbleLeftIcon className="w-4 h-4 mr-1 text-gray-600" />
          <span className="text-sm text-gray-600">{post.comments}</span>
        </div>
      </div>

      {/* Comments Section with Border */}
      <div className="border border-gray-200 rounded-xl">
        {/* Add Comment Section */}
        <form
          onSubmit={handleSubmitComment}
          className="p-4 border-b border-gray-200"
        >
          <div className="flex items-center gap-3">
            {userData?.user?.profile_picture ? (
              <Image
                src={userData?.user?.profile_picture}
                alt={`${userData?.user?.name} `}
                width={30}
                height={30}
                className="rounded-full md:w-[30px] md:h-[30px]"
              />
            ) : (
              <UserCircleIcon className="w-8 h-8 text-gray-500" />
            )}

            <div className="flex-1">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-gray-300"
              />
            </div>
            <button
              type="submit"
              disabled={createCommentMutation.isPending || !newComment.trim()}
              className="px-4 py-2.5 bg-[#065844] text-white rounded-lg text-sm font-medium hover:bg-[#054e3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createCommentMutation.isPending ? "Posting..." : "Post"}
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="p-4 space-y-4">
          {commentsMutation.status === "pending" ? (
            <p className="text-center text-gray-500">Loading comments...</p>
          ) : commentsMutation.error ? (
            <p className="text-center text-red-500">Error loading comments</p>
          ) : comments.length === 0 ? (
            <p className="text-center text-gray-500">No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-[#F8F9FF] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFF1E8] border border-[#EA942C] flex items-center justify-center">
                      <Image
                        src={comment.user.profile_picture || "/Mask.png"}
                        alt={`${comment.user.name} ${comment.user.last_name}`}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        {comment.user.name} {comment.user.last_name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {userData?.user?.id?.toString() ===
                    comment.user.id.toString() && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCommentMutation.mutate(comment.id.toString());
                      }}
                      disabled={deleteCommentMutation.isPending}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      title="Delete comment"
                    >
                      <TrashIcon className="w-4 h-4 text-gray-500 hover:text-red-500" />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600 ml-[52px]">
                  {comment.text}
                </p>
                <div className="flex items-center gap-4 mt-3 ml-[52px]">
                  <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                    <Image src="/like.png" alt="Like" width={14} height={14} />
                    <span>{comment.upvotes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                    <ChatBubbleLeftIcon className="w-3.5 h-3.5 text-gray-500" />
                    <span>{comment.answers}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
