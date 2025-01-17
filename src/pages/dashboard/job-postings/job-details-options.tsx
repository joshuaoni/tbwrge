import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { CircleEllipsis } from "lucide-react";
import { useRef, useState } from "react";

import { bulkAction } from "@/actions/bulk-action";
import { useOutsideClick } from "@/hooks/outside-click";
import { useUserStore } from "@/hooks/use-user-store";
import { copyToClipboard } from "@/lib/common";
import toast from "react-hot-toast";

function JobDetailsOptions(props: { id: string }) {
  const { userData } = useUserStore();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useOutsideClick(dropdownRef, () => setOpen(false));

  const jobUrl = encodeURI(
    `${window?.location?.origin}/embedded-job-post/${props.id}`
  );

  function handleCopy(textToCopy: string, successMessage: string) {
    copyToClipboard(textToCopy);
    toast.success(successMessage);
    setOpen(false);
  }

  const closeJobMutation = useMutation({
    mutationKey: ["close-job"],
    mutationFn: async () =>
      await bulkAction({
        jobIds: [props.id],
        status: "closed",
        token: userData?.token,
      }),
    onMutate: () => setOpen(false),
  });

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center space-x-2"
      >
        <CircleEllipsis color="#065844" className="ml-4 cursor-pointer" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute z-10 w-40 mt-2 rounded-lg border-none flex flex-col divide-y text-xs bg-white overflow-hidden"
          >
            {[
              { label: "Edit job", action: () => {} },
              {
                label: "Copy Job Link",
                action: () =>
                  handleCopy(jobUrl, "Job Link Copied to clipboard"),
              },
              {
                label: "Copy Embed Code",
                action: () =>
                  handleCopy(
                    `<iframe src="${jobUrl}" width="100%" height="100%"></iframe>`,
                    "Embed Code Copied to clipboard"
                  ),
              },
              {
                label: "Close Job",
                action: () =>
                  toast.promise(closeJobMutation.mutateAsync(), {
                    loading: "Closing job...",
                    success: "Job closed successfully",
                    error: "An error occured while closing the job",
                  }),
              },
            ].map((option, i) => (
              <button
                key={i}
                onClick={() => option.action()}
                className={
                  "text-[#898989] hover:text-white hover:bg-lightgreen p-3"
                }
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default JobDetailsOptions;
