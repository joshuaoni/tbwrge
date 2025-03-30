// import { CommunityDashHeader } from "@/components/community-dash-header";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CommunityDashHeader from "@/components/community-dash-header";
import { outfit } from "@/constants/app";
import PostDetails from "@/components/post-details";
import CreatePost from "@/components/create-post";
import { getPosts, Post } from "@/actions/get-posts";
import { useUserStore } from "@/hooks/use-user-store";
import { togglePostVote } from "@/actions/upvote-post";
import { deletePost } from "@/actions/delete-post";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { getTags } from "@/actions/get-tags";
import { Tag } from "@/actions/get-tags";

const CommunityPage = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { userData } = useUserStore();
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: async () => {
      if (!userData?.token) {
        throw new Error("No authentication token found");
      }
      return getPosts(userData.token, currentPage);
    },
    enabled: !!userData?.token,
  });

  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ["tags", currentPage],
    queryFn: () => {
      if (!userData?.token) throw new Error("No authentication token found");
      return getTags(userData.token, currentPage);
    },
    enabled: !!userData?.token,
  });

  const formattedTags = useMemo(() => {
    return tags.map((tag: Tag) => ({
      id: tag.id,
      name: `#${tag.name}`,
      posts: tag.posts_count.toLocaleString(),
      status: "Trending",
      icon: tag.name.charAt(0).toUpperCase(),
      bg: getRandomColor(),
      width: 20,
      height: 20,
    }));
  }, [tags]);

  const upvoteMutation = useMutation({
    mutationFn: async (postId: string) => {
      if (!userData?.token) {
        throw new Error("Please sign in to vote on posts");
      }
      return togglePostVote(postId, userData.token);
    },
    onSuccess: (_, postId) => {
      const post = posts.find((p) => p.id.toString() === postId);
      toast.success(
        post?.reacted
          ? "Post downvoted successfully"
          : "Post upvoted successfully"
      );
      // Invalidate and refetch posts with current page
      queryClient.invalidateQueries({
        queryKey: ["posts", currentPage],
        exact: true,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to vote on post");
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      if (!userData?.token) {
        throw new Error("Please sign in to delete posts");
      }
      return deletePost(postId, userData.token);
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete post");
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityDashHeader />

      <div className="mx-auto pt-16 md:pt-[90px] px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Sidebar - Popular Tags */}
          <div className="hidden md:block md:col-span-3">
            <div className="bg-white rounded-xl p-4 shadow-[0px_4px_50px_0px_rgba(0,0,0,0.25)]">
              <h2 className="text-lg font-semibold pl-2 mb-4">Popular Tags</h2>
              <div className="space-y-2">
                {formattedTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center`}
                      style={{ backgroundColor: tag.bg }}
                    >
                      {tag.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[14px] font-semibold leading-tight">
                        {tag.name}
                      </h3>
                      <span className="text-[12px] text-gray-700 mt-0.5">
                        {tag.posts} Posted • {tag.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Posts Feed */}
          <div className={`${outfit.className} col-span-1 md:col-span-6`}>
            {/* Mobile Popular Tags Grid */}
            <div className="md:hidden pt-[20px] mb-4">
              <h2 className="text-base font-semibold mb-3">Popular Tags</h2>
              <div className="grid grid-cols-2 gap-2">
                {formattedTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 bg-white p-2.5 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0`}
                      style={{ backgroundColor: tag.bg }}
                    >
                      {tag.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[13px] font-semibold truncate">
                        {tag.name}
                      </h3>
                      <p className="text-[11px] text-gray-600 truncate">
                        {tag.posts} • {tag.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isCreatingPost ? (
              <CreatePost
                onClose={() => {
                  setIsCreatingPost(false);
                  setEditingPost(null);
                }}
                post={editingPost || undefined}
              />
            ) : (
              <>
                {/* Create Post Card */}
                {!selectedPost && (
                  <div
                    className="bg-white rounded-xl p-3 md:p-4 shadow-[0px_4px_50px_0px_rgba(0,0,0,0.25)] mb-4 cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => setIsCreatingPost(true)}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-[6px] bg-[#FFF1E8] border border-[#EA942C] flex items-center justify-center">
                        <Image
                          src="/Mask.png"
                          alt="User Avatar"
                          width={24}
                          height={24}
                          className="rounded-full md:w-[30px] md:h-[32px]"
                        />
                      </div>
                      <div className="flex-1 text-gray-500 text-xs md:text-sm">
                        Let's share what's going on your mind...
                      </div>
                      <div className="px-3 md:px-4 py-2 md:py-2.5 bg-[#065844] text-white rounded-lg text-xs md:text-sm font-medium hover:bg-[#054e3a] transition-colors whitespace-nowrap">
                        Create Post
                      </div>
                    </div>
                  </div>
                )}

                {/* Post Cards or Post Details */}
                {selectedPost ? (
                  <PostDetails
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                  />
                ) : isLoading ? (
                  <div className="text-center py-4">Loading posts...</div>
                ) : error ? (
                  <div className="text-center text-red-500 py-4">
                    Error loading posts. Please try again.
                  </div>
                ) : (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-xl shadow-[0px_4px_50px_0px_rgba(0,0,0,0.25)] p-3 md:p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow relative"
                      onClick={() => setSelectedPost(post)}
                    >
                      {userData?.user?.id?.toString() ===
                        post.user.id.toString() && (
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingPost(post);
                              setIsCreatingPost(true);
                            }}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                            title="Edit post"
                          >
                            <PencilIcon className="w-4 h-4 text-gray-500 hover:text-blue-500" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePostMutation.mutate(post.id.toString());
                            }}
                            disabled={deletePostMutation.isPending}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                            title="Delete post"
                          >
                            <TrashIcon className="w-4 h-4 text-gray-500 hover:text-red-500" />
                          </button>
                        </div>
                      )}
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-[6px] bg-[#FFF1E8] border border-[#EA942C] flex items-center justify-center">
                          <Image
                            src={post.user.profile_picture || "/Mask.png"}
                            alt={`${post.user.name} ${post.user.last_name}`}
                            width={24}
                            height={24}
                            className="rounded-full md:w-[30px] md:h-[32px]"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1 md:gap-2">
                            <h3 className="text-xs md:text-sm font-medium">
                              {post.user.name} {post.user.last_name}
                            </h3>
                            <span className="text-[10px] md:text-xs text-black">
                              •
                            </span>
                            <p className="text-[10px] md:text-xs text-black">
                              {new Date(post.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <h2 className="text-base md:text-[16px] font-semibold text-[#1E2937] mb-2">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col font-semibold">
                          <p className="text-xs md:text-sm font-medium">
                            {post.comments}
                          </p>
                          <p className="text-xs md:text-sm text-black">
                            Comment
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-xs md:text-sm text-black">
                            {post.upvotes}
                          </p>
                          <p className="text-xs md:text-sm">Upvotes</p>
                        </div>
                      </div>
                      <div className="flex font-semibold items-center gap-2 md:gap-4 mt-3 md:mt-4 border-t pt-3 md:pt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            upvoteMutation.mutate(post.id.toString());
                          }}
                          disabled={upvoteMutation.isPending}
                          className={`flex justify-between rounded-[8px] border border-gray-300 p-[4px_6px] md:p-[4px_8px] items-center gap-1.5 md:gap-2 text-black hover:text-gray-700 ${
                            post.reacted ? "bg-green-50 border-green-300" : ""
                          }`}
                        >
                          <Image
                            src="/like.png"
                            alt="Upvote"
                            width={16}
                            height={16}
                            className={`w-4 h-4 md:w-5 md:h-5 ${
                              post.reacted ? "opacity-100" : "opacity-50"
                            }`}
                          />
                          <span className="text-xs md:text-sm">
                            {post.reacted ? "Upvoted" : "Upvote"}
                          </span>
                        </button>
                        <button className="flex justify-between rounded-[8px] border border-gray-300 p-[4px_6px] md:p-[4px_8px] items-center gap-1.5 md:gap-2 text-black hover:text-gray-700">
                          <Image
                            src="/brush.png"
                            alt="Comment"
                            width={16}
                            height={16}
                            className="w-4 h-4 md:w-5 md:h-5"
                          />
                          <span className="text-xs md:text-sm">Comment</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>

          {/* Right Sidebar - Advertisement */}
          <div className="hidden md:block md:col-span-3 space-y-[14px]">
            {[1, 2].map((post) => (
              <div
                key={post}
                className="h-[300px] bg-[#1E2937] rounded-xl p-4 text-white"
              >
                <h2 className="text-lg font-semibold mb-4"></h2>
              </div>
            ))}
            <h1 className="text-lg text-center font-semibold mb-4">
              Advertisement
            </h1>
          </div>
        </div>

        {/* Add pagination controls at the bottom of the posts list */}
        {!selectedPost && !isCreatingPost && (
          <div className="flex justify-center items-center gap-4 mt-6 mb-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0 || isLoading}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage + 1}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={posts.length === 0 || isLoading}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to generate a random color for tag backgrounds
function getRandomColor() {
  const colors = [
    "#5A4F43",
    "#473E3B",
    "#444F5F",
    "#574D42",
    "#335248",
    "#46475B",
    "#4A3F3C",
    "#3E4B5C",
    "#4C3F3D",
    "#3A4B5D",
    "#4D3F3E",
    "#3B4B5E",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default CommunityPage;
