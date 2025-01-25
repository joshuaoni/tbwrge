import { convertToSlug } from "@/components/settings/profile/input-group";
import Image from "next/image";

interface SubmitArticleFileGroupProps {
  label: string;
  onChange?: (file: File) => void;
}

function SubmitArticleFileGroup({
  label,
  onChange,
}: SubmitArticleFileGroupProps) {
  return (
    <div className="w-full space-y-2">
      <label htmlFor={convertToSlug(label)} className="block">
        <span className="block text-[#4A5568] text-sm mb-2">{label}</span>
        <p className="text-[#87909E] text-xs text-center flex items-center justify-center gap-2 py-4 px-7 bg-[#EDF2F7] cursor-pointer">
          <span>Upload Article</span>
          <Image
            src="/images/icons/upload.png"
            alt="pdf icon"
            width={24}
            height={16}
          />
          <span>pdf, docx</span>
        </p>
      </label>
      <input
        type="file"
        accept=".pdf,.docx"
        id={convertToSlug(label)}
        className="sr-only"
        onChange={(e) =>
          onChange && e.target.files && onChange(e.target.files[0])
        }
      />
    </div>
  );
}

export default SubmitArticleFileGroup;
