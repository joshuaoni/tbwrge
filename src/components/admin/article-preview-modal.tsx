import { inter, outfit } from "@/constants/app";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserCircle2, X } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/hooks/use-user-store";

interface AdminArticlePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: () => void;
  title: string;
  content: string;
  image: File | null;
  isSubmitting: boolean;
}

const AdminArticlePreviewModal = ({
  isOpen,
  onClose,
  onPublish,
  title,
  content,
  image,
  isSubmitting,
}: AdminArticlePreviewModalProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { userData } = useUserStore();

  if (!isOpen) return null;

  // Create preview URL for uploaded image
  const imagePreviewUrl = image ? URL.createObjectURL(image) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className={`${outfit.className} text-lg font-semibold`}>
            Article Preview
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Header Section - Black background like blog details */}
          <div className="w-full bg-black text-white">
            <div className="w-full px-4 md:px-16 py-12">
              <h1
                className={`${outfit.className} text-[24px] md:text-[42px] leading-tight mb-[12px] md:mb-6`}
              >
                {title || "Article Title"}
              </h1>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                {isMobile ? (
                  <div className="flex items-center gap-2">
                    <span>by Admin</span>
                    <span className="text-gray-400">—</span>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/clock.png"
                        alt="read time"
                        width={14}
                        height={14}
                      />
                      <span>0 views</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                    {userData?.user?.profile_picture ? (
                      <Image
                        src={userData.user.profile_picture}
                        alt="Author"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <UserCircle2 className="w-10 h-10 text-white" />
                    )}
                  </div>
                )}
                {!isMobile && (
                  <div className="flex items-center gap-2">
                    <span className="text-base">Admin</span>
                    <span className="text-gray-400">—</span>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/clock.png"
                        alt="read time"
                        width={14}
                        height={14}
                      />
                      <span>5 minute read</span>
                    </div>
                    <span className="text-gray-400">—</span>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/network.png"
                          alt="views"
                          width={12}
                          height={12}
                        />
                        <span>0 views</span>
                      </div>
                      <span className="text-gray-400">—</span>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/fb.png"
                          alt="Facebook"
                          width={13.3}
                          height={13.3}
                        />
                        <Image
                          src="/twitter.png"
                          alt="Twitter"
                          width={13.3}
                          height={11.3}
                        />
                        <Image
                          src="/pinterest.png"
                          alt="Pinterest"
                          width={13.3}
                          height={13.3}
                        />
                        <span>0 shares</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full px-4 md:px-16 py-12">
            <div className="relative flex gap-8">
              {/* Side Social Panel */}
              <div className="text-[12px] hidden lg:flex flex-col items-center gap-8 pt-[20px] h-fit">
                <div className="flex flex-col items-center">
                  <Image src="/viewb.png" alt="Views" width={12} height={12} />
                  <p className="text[12px] text-gray-600 mt-2">views</p>
                  <p className="font-medium">0</p>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/share.png" alt="Shares" width={15} height={16} />
                  <p className="text[12px] text-gray-600 mt-2">shares</p>
                  <p className="font-medium">0</p>
                </div>
                <div className="flex flex-col items-center gap-[2px]">
                  <button className="w-8 h-8 flex items-center justify-center">
                    <Image
                      src="/fbb.png"
                      alt="Facebook"
                      width={16.6}
                      height={16.6}
                    />
                  </button>
                  <p className="font-medium">0</p>
                  <button className="w-8 h-8 flex items-center justify-center">
                    <Image
                      src="/twitterb.png"
                      alt="Twitter"
                      width={17.4}
                      height={14.1}
                    />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center">
                    <Image
                      src="/pinterestb.png"
                      alt="Pinterest"
                      width={16.6}
                      height={16.6}
                    />
                  </button>
                  <p className="font-medium">0</p>
                </div>
              </div>

              {/* Main Content */}
              <div
                className={`${inter.className} pt-[14px] space-y-6 text-gray-800 flex-1`}
              >
                {imagePreviewUrl && (
                  <div className="w-full h-[400px] relative mb-8">
                    <Image
                      src={imagePreviewUrl}
                      alt={title || "Article Image"}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: content || "<p>No content provided</p>",
                  }}
                />
              </div>
            </div>

            {/* Social Share Section */}
            <div className="grid grid-cols-4 gap-0 mt-12 mb-8">
              <div className="text-gray-600 border-b border-gray-300 flex justify-center items-center text-xs md:text-base py-2 md:py-2.5">
                0 Shares
              </div>
              <button className="flex items-center gap-1 md:gap-2 text-[#3B5998] flex-1 justify-center border-b border-[#3B5998] py-2 md:py-2.5 hover:bg-gray-50">
                <Image
                  src="/fbc.png"
                  alt="Facebook"
                  width={16}
                  height={16}
                  className="w-4 md:w-6 h-4 md:h-6"
                />
                <span className="text-xs md:text-base hidden md:inline">
                  SHARE
                </span>
                <span className="text-gray-400 text-xs md:text-base ml-0 md:ml-1">
                  0
                </span>
              </button>
              <button className="flex items-center gap-1 md:gap-2 text-[#1DA1F2] flex-1 justify-center border-b border-gray-300 py-2 md:py-2.5 hover:bg-gray-50">
                <Image
                  src="/twc.png"
                  alt="Twitter"
                  width={16}
                  height={16}
                  className="w-4 md:w-6 h-4 md:h-6"
                />
                <span className="text-xs md:text-base hidden md:inline">
                  TWEET
                </span>
                <span className="text-gray-400 text-xs md:text-base ml-0 md:ml-1">
                  0
                </span>
              </button>
              <button className="flex items-center gap-1 md:gap-2 text-[#E60023] flex-1 justify-center border-b border-[#E60023] py-2 md:py-2.5 hover:bg-gray-50">
                <Image
                  src="/pinc.png"
                  alt="Pinterest"
                  width={16}
                  height={16}
                  className="w-4 md:w-6 h-4 md:h-6"
                />
                <span className="text-gray-400 text-xs md:text-base ml-0 md:ml-1">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer with Publish/Cancel buttons */}
        <div className="flex items-center justify-end gap-4 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onPublish}
            disabled={isSubmitting}
            className="bg-[#145959] text-white py-2 px-6 rounded-lg hover:bg-[#145959]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
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
                Posting...
              </span>
            ) : (
              "Publish Article"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminArticlePreviewModal;
