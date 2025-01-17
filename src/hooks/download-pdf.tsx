import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useCallback } from "react";

export const useDownloadPDF = (
  divRef: React.RefObject<HTMLDivElement>,
  fileName?: string
) => {
  const downloadPDF = useCallback(async () => {
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(fileName ? fileName + ".pdf" : "file.pdf");
    }
  }, [divRef]);

  return { downloadPDF };
};
