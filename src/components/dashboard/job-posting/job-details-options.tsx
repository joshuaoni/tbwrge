import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { CircleEllipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { bulkAction } from "@/actions/bulk-action";
import { useOutsideClick } from "@/hooks/outside-click";
import { useUserStore } from "@/hooks/use-user-store";
import { copyToClipboard } from "@/lib/common";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function JobDetailsOptions(props: { id: string }) {
  const { t } = useTranslation();
  const { userData } = useUserStore();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  let jobUrl: any;
  useOutsideClick(dropdownRef, () => setOpen(false));

  useEffect(() => {
    jobUrl = encodeURI(
      `${window?.location?.origin}/embedded-job-post/${props.id}`
    );
  }, []);

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
              { label: t("jobPostings.actions.editJob"), action: () => {} },
              {
                label: t("jobPostings.actions.copyJobLink"),
                action: () =>
                  handleCopy(jobUrl, t("jobPostings.actions.jobLinkCopied")),
              },
              {
                label: t("jobPostings.actions.copyEmbedCode"),
                action: () =>
                  handleCopy(
                    `<iframe src="${jobUrl}" width="100%" height="100%"></iframe>`,
                    t("jobPostings.actions.embedCodeCopied")
                  ),
              },
              {
                label: t("jobPostings.actions.closeJob"),
                action: () =>
                  toast.promise(closeJobMutation.mutateAsync(), {
                    loading: t("jobPostings.actions.closingJob"),
                    success: t("jobPostings.actions.jobClosedSuccess"),
                    error: t("jobPostings.actions.jobCloseError"),
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
