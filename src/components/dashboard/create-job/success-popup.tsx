import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { FacebookIcon, Twitter } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  jobLink: string;
  jobEmbedLink: string;
  postedJobLink: string;
}

export function JobCreatedSuccessPopup({
  isOpen,
  onClose,
  jobLink,
  jobEmbedLink,
  postedJobLink,
}: SuccessPopupProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy text");
    }
  };

  const getEmbedCode = () => {
    return `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="${jobEmbedLink}"></iframe>`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 max-w-[500px] space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Your Job Post is now Live</h2>
          </div>
          <button
            onClick={onClose}
            className="needed text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Job link</span>
              <button
                onClick={() => handleCopy(jobLink)}
                className="hover:text-gray-600 text-gray-400"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16667 12.5H3.33333C2.89131 12.5 2.46738 12.3244 2.15482 12.0118C1.84226 11.6993 1.66667 11.2754 1.66667 10.8333V3.33333C1.66667 2.89131 1.84226 2.46738 2.15482 2.15482C2.46738 1.84226 2.89131 1.66667 3.33333 1.66667H10.8333C11.2754 1.66667 11.6993 1.84226 12.0118 2.15482C12.3244 2.46738 12.5 2.89131 12.5 3.33333V4.16667"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="p-3 bg-gray-50 rounded text-sm break-all">
              {jobLink}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Get Embed code</span>
              <button
                onClick={() => handleCopy(getEmbedCode())}
                className="hover:text-gray-600 text-gray-400"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16667 12.5H3.33333C2.89131 12.5 2.46738 12.3244 2.15482 12.0118C1.84226 11.6993 1.66667 11.2754 1.66667 10.8333V3.33333C1.66667 2.89131 1.84226 2.46738 2.15482 2.15482C2.46738 1.84226 2.89131 1.66667 3.33333 1.66667H10.8333C11.2754 1.66667 11.6993 1.84226 12.0118 2.15482C12.3244 2.46738 12.5 2.89131 12.5 3.33333V4.16667"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="p-3 bg-gray-50 rounded text-sm font-mono break-all">
              {getEmbedCode()}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3 py-5 bg-white hover:bg-[#0077B5]/5 text-[#0077B5] border-[#0077B5]/20 hover:border-[#0077B5]/30 transition-all duration-200"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    jobLink
                  )}`,
                  "_blank"
                )
              }
            >
              <LinkedInLogoIcon className="w-5 h-5" />
              <span className="font-medium">Share on LinkedIn</span>
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3 py-5 bg-white hover:bg-[#1DA1F2]/5 text-[#1DA1F2] border-[#1DA1F2]/20 hover:border-[#1DA1F2]/30 transition-all duration-200"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    jobLink
                  )}`,
                  "_blank"
                )
              }
            >
              <Twitter className="w-5 h-5" />
              <span className="font-medium">Share on Twitter</span>
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3 py-5 bg-white hover:bg-[#1877F2]/5 text-[#1877F2] border-[#1877F2]/20 hover:border-[#1877F2]/30 transition-all duration-200"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?url=${encodeURIComponent(
                    jobLink
                  )}`,
                  "_blank"
                )
              }
            >
              <FacebookIcon className="w-5 h-5" />
              <span className="font-medium">Share on Facebook</span>
            </Button>
          </div>
        </div>

        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white"
          onClick={() => window.open(postedJobLink, "_blank")}
        >
          View Posted Job
        </Button>
      </DialogContent>
    </Dialog>
  );
}
