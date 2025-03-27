import { convertToSlug } from "@/components/settings/profile/input-group";
import Image from "next/image";
import { useState } from "react";

interface FileGroupProps {
  label: string;
  onChange?: (file: File) => void;
}

function CreateJobFileGroup({ label, onChange }: FileGroupProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onChange?.(file);
    }
  };

  return (
    <div className="w-full space-y-2">
      <label htmlFor={convertToSlug(label)} className="block">
        <span className="block text-[#4A5568] text-sm mb-2">{label}</span>
        <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#87909E] text-xs text-center flex items-center justify-center gap-2  cursor-pointer">
          {previewUrl ? (
            <div className="relative w-24 h-24">
              <Image
                src={previewUrl}
                alt="Selected logo"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <>
              <span>Upload Logo</span>
              <Image
                src="/images/icons/upload.png"
                alt="upload icon"
                width={24}
                height={16}
              />
            </>
          )}
        </div>
      </label>
      <input
        type="file"
        accept="image/*"
        id={convertToSlug(label)}
        className="sr-only"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default CreateJobFileGroup;
