import { useState } from "react";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { CircleXIcon, Loader2, Download } from "lucide-react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import downloadIcon from "../../../../public/images/icons/file-download.png";
import Image from 'next/image';
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { generateInterviewQuestions } from "@/actions/job-tools/generate-interview-questions";
import "react-quill/dist/quill.snow.css";
// import './style.css'
// import '@/styles/globals.css'
// 
// Dynamic import for React Quill
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header", "bold", "italic", "underline", "strike",
  "list", "bullet", "link",
];

const AiInterviewPrep = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedLanguage, setSelectedValue] = useState<string>("");
  const { userData } = useUserStore();
  
  const handleDownload = () => {
    if (!questions) return;
    
    const content = questions.map((q: string, index: number) => 
      `${index + 1}. ${q}\n`
    ).join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview-questions.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const {
    mutate: generateQuestions,
    data: questions,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationKey: ["generateInterviewQuestions"],
    mutationFn: async () => {
      let language = "en";
      switch(selectedLanguage) {
        case "French": language = "fr"; break;
        case "Spanish": language = "es"; break;
        case "German": language = "de"; break;
        case "Arabic": language = "ar"; break;
        case "Portuguese": language = "pt"; break;
      }
      
      return generateInterviewQuestions(
        files,
        language,
        userData?.token as string,
        jobDescription
      );
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      if (files.length + newFiles.length > 5) {
        alert("You can only upload a maximum of 5 files.");
      } else {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const clearResults = () => {
    // Reset the mutation state by invalidating the query
    window.location.reload();
  };

  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">Ai Prep</span>

      <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="cont flex flex-col lg:flex-row gap-6">
      <div className="grid shadow-xl border-[1px] p-4 rounded-md pb-8 lg:w-[70%] w-full">
            {/* File Upload Section */}
            <div className="rounded-xl h-fit flex flex-col p-6 ">
              <span className="font-bold text-xl">CV and Cover Letter Upload</span>
              <span className="font-light text-xs">
                Add your documents here, and you can upload up to 5 files max
              </span>
              <div className="relative w-full px-6 mt-3 flex flex-col items-start rounded-lg">
                <input
                  onChange={handleFileChange}
                  type="file"
                  multiple
                  accept=".pdf, .doc, .docx, .txt"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="border-dotted flex flex-col space-y-5 border-[2px] border-[#065844] cursor-pointer items-center justify-center w-full rounded-xl mt-4 h-[200px]">
                  <Image
                    className="w-fit h-8 object-cover"
                    src={uploadIcon}
                    alt="Upload Icon"
                  />
                  <span>
                    Drag your file(s) or <span className="font-bold">browse</span>
                  </span>
                  <span className="text-gray-500 text-sm">
                    Max 10MB files are allowed
                  </span>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex h-14 w-full px-4 border rounded-lg justify-between items-center">
                      <div className="flex items-start">
                        <Image
                          className="w-10 h-10 object-cover"
                          src={pdfIcon}
                          alt="File Icon"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm">{file.name}</span>
                          <span className="text-sm text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      <CircleXIcon
                        onClick={() => removeFile(index)}
                        className="cursor-pointer"
                        size={14}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-2 text-gray-400 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div> */}

            {/* Job Description Editor */}
            <div className="rounded-xl shadow-md h-fit flex flex-col p-6">
              <span className="font-bold text-xl">Paste Your Job description here</span>
              <div className="my-8 bg-white border rounded-md mb-10">
                <ReactQuill
                  theme="snow"
                  value={jobDescription}
                  onChange={setJobDescription}
                  modules={modules}
                  formats={formats}
                  className="h-64 "
                />
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="border rounded-xl p-4 shadow-md flex flex-col h-fit ">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Possible Interview Questions and Answers</h2>
              {isSuccess && questions && questions.length > 0 && (
             <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleDownload}
                  className="hover:bg-gray-100"
                >
                  <Image
                    src={downloadIcon}
                    alt="Download"
                    className="w-4 h-4"
                  />
                </Button>
                   <Button 
                   variant="ghost" 
                   size="icon"
                   onClick={clearResults}
                   className="hover:bg-gray-100"
                 >
                   X
                 </Button>
             </>
              )}
            </div>
            
            {isPending && (
              <div className="flex items-center justify-center h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
            
            {!isPending && !isSuccess && !isError && (
              <div className="flex items-center justify-center h-[200px] text-gray-400 text-sm text-center px-4">
                Generated Interview question will be displayed here
              </div>
            )}
            
            {isSuccess && questions && (
              <div className="mt-4 space-y-4 max-h-[500px] overflow-y-auto">
                <div className="space-y-2">
                  {questions.map((question: string, index: number) => (
                    <div key={index} className="p-2 rounded-lg border hover:bg-gray-50">
                      <p className="text-sm">{`${index + 1}. ${question}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {isError && (
              <div className="text-red-500 mt-4 text-center p-4">
                An error occurred while generating questions. Please try again.
              </div>
            )}
          </div>
        </div>

        {/* Language Selection & Generate Button */}
        <div className="flex items-center gap-12 justify-between w-fit">
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Select Output language</span>
            <LanguageSelectorDropDown
              outputLanguage={true}
              value={selectedLanguage}
              setValue={setSelectedValue}
            />
          </div>
          <Button 
            className="bg-lightgreen min-w-[100px] text-white self-center"
            onClick={() => generateQuestions()}
            disabled={(!files.length && !jobDescription) || isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Generate"}
          </Button>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default AiInterviewPrep;