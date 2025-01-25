import { StopCircleIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function SubmitArticleRecordVoice() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
      <div className="flex items-center justify-between">
        <span className="font-light text-sm">Record Voicenote </span>
        <X className="cursor-pointer" />
      </div>

      <div className="h-12 bg-[#EDF2F7] w-full rounded-md flex items-center justify-between px-3 my-4 border">
        <span className="text-xs font-light">Record Voicenote</span>
        {isRecording ? (
          <StopCircleIcon
            color="red"
            className="animate-pulse cursor-pointer "
          />
        ) : (
          <Image
            className="cursor-pointer"
            src={"/images/icons/microphone.png"}
            alt=""
            width={20}
            height={20}
          />
        )}
      </div>
    </div>
  );
}

export default SubmitArticleRecordVoice;
