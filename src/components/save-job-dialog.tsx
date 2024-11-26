import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { File, LogOut } from "lucide-react";

const SaveJobDialog = ({ jobReferenceId }: { jobReferenceId: string }) => {
  const handleCopyIframe = () => {
    const iframeContent = `
      <iframe
        src="${window.location.origin}/embedded-job-post/${jobReferenceId}"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      
      ></iframe>`;
    navigator.clipboard
      .writeText(iframeContent)
      .then(() => {
        alert("Iframe copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy iframe to clipboard:", err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-primary flex items-center w-20 text-xs rounded-md p-2 justify-center text-white ml-auto mr-4">
          Save Job
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="border-b pb-6">Post Job</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <section className="flex flex-col text-[#898989]">
          <div className="flex flex-col">
            <div className="flex w-full justify-between items-center">
              <span className="font-bold">Job Link</span>
              <File
                className="cursor-pointer"
                onClick={() => {
                  window.navigator.clipboard.writeText(
                    window.location.origin +
                      "/embedded-job-post" +
                      "/" +
                      jobReferenceId
                  );
                }}
              />
            </div>
            <span className="text-sm my-4">
              {window.location.origin +
                "/embedded-job-post" +
                "/" +
                jobReferenceId}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex w-full justify-between items-center">
              <span className="font-bold">Get Embed Code</span>
              <File
                className="cursor-pointer"
                onClick={() => {
                  handleCopyIframe();
                }}
              />
            </div>
            <span className="text-sm my-4">
              {`<iframe
        src="${window.location.origin}/embedded-job-post/${jobReferenceId}"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      ></iframe>`}
            </span>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default SaveJobDialog;
