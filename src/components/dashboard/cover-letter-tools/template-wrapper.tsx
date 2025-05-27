import { useRef } from "react";

import DocumentDownloadIcon from "@/components/icons/document-download";
import { useDownloadPDF } from "@/hooks/download-pdf";
import { TemplateWrapperProps } from "@/interfaces/generator.interface";

function TemplateWrapper({ template: Template, data }: TemplateWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { downloadPDF } = useDownloadPDF(ref);

  return (
    <div className="flex items-start gap-2">
      <div className="w-full bg-white p-4 rounded-lg">
        <Template ref={ref} data={data} />
      </div>
      <button className="w-1/12 flex-shrink-0" onClick={downloadPDF}>
        <DocumentDownloadIcon />
      </button>
    </div>
  );
}

export default TemplateWrapper;
