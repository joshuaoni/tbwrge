import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts, Post } from "@/actions/get-posts";
import { getBlogs, BlogItem } from "@/actions/blog";
import { useUserStore } from "@/hooks/use-user-store";
import AllActivityDropDown from "@/components/all-activity-dropdown";
import { TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const PostCard = ({
  post,
  userData,
  setSelectedPost,
  setEditingPost,
  setIsCreatingPost,
  deletePostMutation,
  upvoteMutation,
  isBlog = false,
}: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleClick = () => {
    if (isBlog) {
      router.push(`/blog/${post.id}`);
    } else {
      router.push(`/community?postId=${post.id}`);
    }
  };
  return (
    <div
      className="bg-white rounded-xl  p-3 md:p-4 mb-4 cursor-pointer hover:border-2 hover:border-primary/20 relative"
      onClick={handleClick}
    >
      <div className="absolute top-3 right-3">
        {/* <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isBlog
              ? "bg-[#E2D8FD] text-[#6B21A8]"
              : "bg-[#E0F7F4] text-[#009379]"
          }`}
        > */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isBlog
              ? "bg-[#E2D8FD] text-[#6B21A8]"
              : "bg-[#E0F7F4] text-[#009379]"
          }`}
        >
          {isBlog
            ? t("articlesCommunity.article")
            : t("articlesCommunity.post")}
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        {post.user?.profile_picture || post.user?.photo ? (
          <Image
            src={post.user.profile_picture || post.user.photo}
            alt={post.user.name || t("articlesCommunity.anonymous")}
            width={30}
            height={30}
            className="rounded-full md:w-[30px] md:h-[30px]"
          />
        ) : (
          <UserCircleIcon className="w-8 h-8 text-gray-500" />
        )}
        <div>
          <div className="flex items-center gap-1 md:gap-2">
            {/* <h3 className="text-xs md:text-sm font-medium"> */}
            <h3 className="text-sm font-medium">
              {post.user?.name || t("articlesCommunity.anonymous")}{" "}
              {post.user?.last_name || ""}
            </h3>
            {/* <span className="text-[10px] md:text-xs text-black">•</span> */}
            <span className="text-sm text-black">•</span>
            {/* <p className="text-[10px] md:text-xs text-black"> */}
            <p className="text-sm text-black">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      {/* <h2
        className={`text-base md:text-[16px] font-semibold text-[#1E2937] mb-2 ${
          isBlog ? "line-clamp-2" : ""
        }`}
      > */}
      <h2
        className={`text-sm leading-[1.5] font-semibold text-[#1E2937] mb-2 ${
          isBlog ? "line-clamp-2" : ""
        }`}
      >
        {post.title}
      </h2>
      {isBlog && post.content && (
        <div
          className="text-sm text-gray-700 mb-2 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
      {!isBlog && (
        <div className="flex items-center gap-4">
          <div className="flex flex-col font-semibold">
            <p className="text-xs md:text-sm font-medium">{post.comments}</p>
            <p className="text-xs md:text-sm text-black">
              {t("articlesCommunity.comment")}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs md:text-sm text-black">{post.upvotes}</p>
            <p className="text-xs md:text-sm">
              {t("articlesCommunity.upvotes")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const ArticlesCommunity = () => {
  const { t } = useTranslation();
  const { userData } = useUserStore();
  const {
    data: posts = [],
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["posts", 0],
    queryFn: async () => {
      if (!userData?.token) throw new Error("No authentication token found");
      return getPosts(userData.token, 0);
    },
    enabled: !!userData?.token,
  });

  const {
    data: blogs = [],
    isLoading: blogsLoading,
    error: blogsError,
  } = useQuery({
    queryKey: ["blogs", { approved: true, page: 0 }],
    queryFn: async () => {
      return await getBlogs({ approved: true, page: 0 });
    },
    enabled: !!userData?.token,
  });

  return (
    <div className="bg-[#F9F9F9] rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        {/* <h2 className="text-lg font-semibold"> */}
        <h2 className="text-sm font-semibold">
          {t("articlesCommunity.title")}
        </h2>
      </div>
      <div className="space-y-4">
        {postsLoading ? (
          // <div>{t("articlesCommunity.loadingPosts")}</div>
          <div className="text-sm">{t("articlesCommunity.loadingPosts")}</div>
        ) : postsError ? (
          // <div className="text-red-500">
          <div className="text-sm text-red-500">
            {t("articlesCommunity.errorLoadingArticles")}
          </div>
        ) : (
          posts
            .slice(0, 3)
            .map((post: Post) => (
              <PostCard
                key={post.id}
                post={post}
                userData={userData}
                setSelectedPost={() => {}}
                setEditingPost={() => {}}
                setIsCreatingPost={() => {}}
                deletePostMutation={{ mutate: () => {}, isPending: false }}
                upvoteMutation={{ mutate: () => {}, isPending: false }}
              />
            ))
        )}
        {blogsLoading ? (
          // <div>{t("articlesCommunity.loadingBlogs")}</div>
          <div className="text-sm">{t("articlesCommunity.loadingBlogs")}</div>
        ) : blogsError ? (
          // <div className="text-red-500">
          <div className="text-sm text-red-500">
            {t("articlesCommunity.errorLoadingBlogs")}
          </div>
        ) : (
          blogs.slice(0, 1).map((blog: BlogItem) => (
            <PostCard
              key={blog.id}
              post={{
                ...blog,
                user: blog.user || { name: t("articlesCommunity.anonymous") },
                created_at:
                  blog.created_at ||
                  blog.updated_at ||
                  new Date().toISOString(),
              }}
              userData={userData}
              isBlog={true}
              setSelectedPost={() => {}}
              setEditingPost={() => {}}
              setIsCreatingPost={() => {}}
              deletePostMutation={{ mutate: () => {}, isPending: false }}
              upvoteMutation={{ mutate: () => {}, isPending: false }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ArticlesCommunity;
