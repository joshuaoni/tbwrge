import { useRef } from "react";

import DocumentDownloadIcon from "@/components/icons/document-download";
import { useDownloadPDF } from "@/hooks/download-pdf";
import { TemplateWrapperProps } from "@/interfaces/generator.interface";

function TemplateWrapper({ template: Template }: TemplateWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { downloadPDF } = useDownloadPDF(ref);

  return (
    <div className="flex items-start gap-2">
      <Template ref={ref} />
      <button className="w-1/12" onClick={downloadPDF}>
        <DocumentDownloadIcon />
      </button>
    </div>
  );
}

export default TemplateWrapper;
