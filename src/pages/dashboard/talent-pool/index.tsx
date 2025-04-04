import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { FiMic, FiSquare, FiPlay, FiTrash2, FiPause } from "react-icons/fi";
import { FaFilePdf, FaSearch } from "react-icons/fa";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

import { getTalents, TalentItem } from "@/actions/talent";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useDebounce } from "@/hooks/debounce";
import { useUserStore } from "@/hooks/use-user-store";
import { Loader2, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/interfaces/job";
import { MessageUser } from "@/actions/get-messages";
import { outfit } from "@/constants/app";

const styles = `
  @keyframes recording-pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  .recording-pulse {
    animation: recording-pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export default function TalentPool() {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [type, setType] = useState<"location" | "skills" | "text">("location");
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );
  const [selectedCandidate, setSelectedCandidate] = React.useState<any>(null);
  const searchValDebounce = useDebounce(searchVal, 1500);
  const [isAIDropdownOpen, setIsAIDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [isTextSearchModalOpen, setIsTextSearchModalOpen] = useState(false);
  const [textSearchInput, setTextSearchInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioData, setAudioData] = useState<number[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const { userData } = useUserStore();
  const isJobSeeker = userData?.user?.role === "job_seeker";

  const query = useQuery<TalentItem[]>({
    queryKey: ["get-talents", page, searchValDebounce, type],
    queryFn: async () => {
      const response = await getTalents(userData?.token ?? "", {
        page: page.toString(),
        text: searchValDebounce,
        search_type: type,
      });
      return response;
    },
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAIDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const startRecording = async () => {
    try {
      // Clean up previous recording first
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
        setAudioURL(null);
      }
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
      setIsPlaying(false);
      setCurrentTime(0);
      setAudioData([]);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setRecordingTime(0);

      // Set up audio context and analyser for real-time visualization
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.3;
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateWaveform = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);
        const normalizedData = Array.from(dataArray).map(
          (value) => value / 255
        );

        // Ensure we have exactly 64 data points for visualization
        const downsampledData = [];
        const step = Math.floor(normalizedData.length / 64);
        for (let i = 0; i < 64; i++) {
          const startIdx = i * step;
          const endIdx = startIdx + step;
          const avg =
            normalizedData
              .slice(startIdx, endIdx)
              .reduce((sum, val) => sum + val, 0) / step;
          downsampledData.push(avg);
        }

        setAudioData(downsampledData);
        animationFrameRef.current = requestAnimationFrame(updateWaveform);
      };

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        // Clean up previous audio URL if it exists
        if (audioURL) {
          URL.revokeObjectURL(audioURL);
        }

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        // Generate waveform data from the complete audio
        const audioContext = new AudioContext();
        const audioBuffer = await audioBlob.arrayBuffer();
        const audioData = await audioContext.decodeAudioData(audioBuffer);

        // Get the raw audio data
        const rawData = audioData.getChannelData(0);

        // Generate waveform with 128 points
        const points = 128;
        const blockSize = Math.floor(rawData.length / points);
        const waveformData = [];

        for (let i = 0; i < points; i++) {
          const start = blockSize * i;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[start + j]);
          }
          waveformData.push(sum / blockSize);
        }

        // Normalize the data
        const maxValue = Math.max(...waveformData);
        const normalizedData = waveformData.map((value) => value / maxValue);

        setAudioData(normalizedData);
        audioContext.close();

        // Clean up real-time visualization
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };

      mediaRecorder.start(100); // Start with 100ms intervals

      // Set recording state before starting visualization
      setIsRecording(true);

      // Start the visualization loop
      console.log(
        "Starting visualization with analyser:",
        !!analyserRef.current
      ); // Debug log
      updateWaveform();

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const togglePlayPause = () => {
    if (!audioURL) return;

    if (!audioElementRef.current) {
      audioElementRef.current = new Audio(audioURL);
      audioElementRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      audioElementRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(Math.floor(audioElementRef.current?.currentTime || 0));
      });
    }

    if (isPlaying) {
      audioElementRef.current.pause();
    } else {
      audioElementRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const deleteRecording = () => {
    if (audioURL) {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
      setIsPlaying(false);
      setCurrentTime(0);
      URL.revokeObjectURL(audioURL);
      setAudioURL(null);
      setRecordingTime(0);
      setAudioData([]);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <DashboardWrapper>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        className={`${outfit.className} flex items-center justify-between mb-6`}
      >
        <h1 className="text-2xl font-semibold">Talent Pool</h1>
        {isJobSeeker && (
          <Link
            href="/join-talent-pool"
            className="flex items-center gap-2 text-primary hover:text-primary/90 font-medium text-[16px]"
          >
            <span>Join our Talent Pool</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 8H15M15 8L8 1M15 8L8 15" />
            </svg>
          </Link>
        )}
      </div>
      <div
        className={`${outfit.className} ${
          isJobSeeker ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <div className="py-6  min-h-screen">
          <div className=" mx-auto bg-white p-4 rounded-lg ">
            {/* Filters */}
            <div className="flex items-center gap-3">
              <div className="border flex items-center px-2 bg-[#F0F0F0] rounded-lg w-[300px] mb-4">
                <Search color="#898989" />
                <input
                  type="text"
                  placeholder="Search for Keywords"
                  className="bg-[#F0F0F0] border-none placeholder:text-[#898989] w-full py-[10px] px-2 rounded-lg outline-none focus:outline-none text-sm"
                  value={type === "text" ? searchVal : ""}
                  onChange={(e) => {
                    setType("text");
                    setSearchVal(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
                <div className="relative w-[200px]">
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full py-3 px-4 rounded-lg bg-[#F2F2F2] focus:outline-none text-[#333] placeholder-[#333]"
                    value={type === "location" ? searchVal : ""}
                    onChange={(e) => {
                      setType("location");
                      setSearchVal(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
                <div className="relative w-[200px]">
                  <div className="w-full min-h-[48px] py-2 px-4 rounded-lg bg-[#F2F2F2] focus-within:outline-none flex flex-wrap gap-2 items-center">
                    {type === "skills" && searchVal ? (
                      searchVal.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="bg-white rounded-full px-3 py-1 text-sm flex items-center gap-2"
                        >
                          {skill.trim()}
                          <button
                            onClick={() => {
                              const newSkills = searchVal
                                .split(",")
                                .filter((_, i) => i !== index)
                                .join(",");
                              setSearchVal(newSkills);
                            }}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-[#333]">Skills</span>
                    )}
                    <input
                      className="flex-1 bg-transparent focus:outline-none min-w-[100px]"
                      placeholder={
                        type === "skills" && searchVal
                          ? ""
                          : "Press enter to add"
                      }
                      value={skillInput}
                      onChange={(e) => {
                        setType("skills");
                        setSkillInput(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && skillInput.trim()) {
                          e.preventDefault();
                          const newSkill = skillInput.trim();
                          setType("skills");
                          setSearchVal((prev) =>
                            prev ? `${prev},${newSkill}` : newSkill
                          );
                          setSkillInput("");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* AI Search Box */}
              <div
                className={`${outfit.className} flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4`}
              >
                <div className="relative w-[200px]" ref={dropdownRef}>
                  <button
                    onClick={() => setIsAIDropdownOpen(!isAIDropdownOpen)}
                    className="w-full py-3 px-4 rounded-lg border border-[#009379] flex items-center justify-between hover:bg-[#009379]/5"
                  >
                    <div className="flex items-center gap-2">
                      <span>Search with AI</span>
                      <Image
                        src="/ai-technology.png"
                        alt="AI"
                        width={20}
                        height={20}
                        className="opacity-80"
                      />
                    </div>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${
                        isAIDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {isAIDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2"
                        onClick={() => {
                          setIsRecordingModalOpen(true);
                          setIsAIDropdownOpen(false);
                        }}
                      >
                        Audio Search
                      </button>
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2 border-t"
                        onClick={() => {
                          setIsTextSearchModalOpen(true);
                          setIsAIDropdownOpen(false);
                        }}
                      >
                        Text Search
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={`${outfit.className} bg-[#F0F0F0] rounded-lg p-4`}>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#D6D6D6] h-[39.292px] rounded-lg">
                    <TableHead className="w-[40px] pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                      <input type="checkbox" className="rounded-sm" />
                    </TableHead>
                    <TableHead className="px-0 pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                      CANDIDATE NAME
                    </TableHead>
                    <TableHead className="px-0 pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                      LOCATION
                    </TableHead>
                    <TableHead className="px-0 pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                      SKILLS
                    </TableHead>
                    <TableHead className="px-0 pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                      MOST RECENT POSITION
                    </TableHead>
                    <TableHead className=" text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg ">
                      ATTACHMENTS
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {query.isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        <Loader2 className="animate-spin mx-auto" />
                      </TableCell>
                    </TableRow>
                  ) : query.data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No Talent at this moment
                      </TableCell>
                    </TableRow>
                  ) : (
                    query.data?.map((candidate, index) => (
                      <TableRow
                        key={index}
                        className="bg-[#F0F0F0] border-b border-white hover:bg-[#F0F0F0]/80 cursor-pointer  hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200"
                        onClick={() =>
                          router.push(
                            `/dashboard/talent-pool/${candidate.id}/details`
                          )
                        }
                      >
                        <TableCell className="py-4 pl-4 align-middle">
                          <input
                            type="checkbox"
                            className={`rounded-sm `}
                            checked={selectedApplications.includes(
                              candidate.id
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedApplications([
                                  ...selectedApplications,
                                  candidate.id,
                                ]);
                              } else {
                                setSelectedApplications(
                                  selectedApplications.filter(
                                    (id) => id !== candidate.id
                                  )
                                );
                              }
                              e.stopPropagation();
                            }}
                          />
                        </TableCell>
                        <TableCell className="py-4 align-middle">
                          <span className={`font-medium text-sm`}>
                            {candidate.name}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 text-sm align-middle">
                          <span>{candidate.nationality}</span>
                        </TableCell>
                        <TableCell className="py-4 text-sm max-w-[200px] truncate align-middle">
                          <span>{candidate.skills_summary}</span>
                        </TableCell>
                        <TableCell className="py-4 text-sm align-middle">
                          <span>{candidate.current_position}</span>
                        </TableCell>
                        <TableCell className="py-4 text-sm align-middle">
                          <div className={`flex items-center gap-1`}>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.75 2.5H5C4.0335 2.5 3.75 2.7835 3.75 3.75V16.25C3.75 17.2165 4.0335 17.5 5 17.5H15C15.9665 17.5 16.25 17.2165 16.25 16.25V5L13.75 2.5Z"
                                stroke="#1F2937"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13.75 2.5V5H16.25"
                                stroke="#1F2937"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.5 10H12.5"
                                stroke="#1F2937"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.5 12.5H12.5"
                                stroke="#1F2937"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <a
                              href={candidate.cv}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-blue-600 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Resume.pdf
                            </a>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Text Search Modal */}
      {isTextSearchModalOpen && (
        <div
          className={`${outfit.className} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
        >
          <div className="bg-white rounded-lg w-[600px] p-6">
            <div className="flex justify-between items-center pb-4 mb-2 border-b border-gray-200">
              <h2 className="text-[16px] font-semibold">Search With AI</h2>
              <button
                onClick={() => {
                  setIsTextSearchModalOpen(false);
                  setTextSearchInput("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center">
              <textarea
                value={textSearchInput}
                onChange={(e) => setTextSearchInput(e.target.value)}
                placeholder="Please provide the job description here

For more accurate results, please include the following in 
your write-up: Title, Years of Experience (YOE), Location, 
Job Type, Skills, Education, Salary Range and 
Language Requirements."
                className="w-full h-48 p-4 border border-gray-300 bg-gray-100 rounded-lg mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />

              <button
                className="w-fit px-8 py-2 bg-primary text-white rounded-lg hover:bg-black/90 transition-colors"
                onClick={() => {
                  // Handle text search
                  setIsTextSearchModalOpen(false);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recording Modal */}
      {isRecordingModalOpen && (
        <div
          className={`${outfit.className} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
        >
          <div className="bg-white rounded-lg w-[500px] p-6">
            <div className="flex justify-between items-center pb-4 mb-2 border-b border-gray-200">
              <h2 className="text-[16px] font-semibold">Search With AI</h2>
              <button
                onClick={() => {
                  setIsRecordingModalOpen(false);
                  if (isRecording) stopRecording();
                  if (audioURL) deleteRecording();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
            </div>

            <p className="text-gray-600  mb-8">Please record your search</p>

            <div className="flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full flex items-center justify-center mb-8">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`border-4 border-primary w-32 h-32 rounded-full bg-white ${
                    isRecording ? "recording-pulse" : ""
                  } flex items-center justify-center transition-all duration-200`}
                >
                  {isRecording ? (
                    <FiMic className="w-16 h-16 text-primary" />
                  ) : (
                    <FiMic className="w-16 h-16 text-primary" />
                  )}
                </button>
              </div>

              {(isRecording || audioURL) && (
                <div className="w-full h-16 bg-gray-100 rounded-lg mb-6 flex items-center px-4 gap-4">
                  {!isRecording && audioURL && (
                    <button
                      onClick={togglePlayPause}
                      className="text-black hover:text-black/80 shrink-0"
                    >
                      {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
                    </button>
                  )}
                  <div className="flex-1 h-full flex items-center min-w-0">
                    {isRecording ? (
                      <div className="w-full h-full flex items-center justify-between gap-[1px]">
                        {Array(64)
                          .fill(0)
                          .map((_, index) => (
                            <div
                              key={index}
                              className="w-[4px] bg-[#009379] rounded-full transition-all duration-50"
                              style={{
                                height: `${Math.max(
                                  4,
                                  (audioData[index] || 0) * 40
                                )}px`,
                                opacity: audioData[index] ? 1 : 0.3,
                                transform: "scaleY(1)", // Force repaint
                                willChange: "height", // Optimize animations
                                transition: "height 50ms linear",
                              }}
                            />
                          ))}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-between gap-[1px]">
                        {audioData.map((value, index) => (
                          <div
                            key={index}
                            className="w-[4px] bg-[#009379] rounded-full"
                            style={{
                              height: `${Math.max(4, value * 40)}px`,
                              opacity: value ? 1 : 0.3,
                              transform: "scaleY(1)", // Force repaint
                              willChange: "height", // Optimize animations
                              transition: "height 50ms linear",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {!isRecording && audioURL && (
                    <>
                      <span className="text-sm text-gray-500 shrink-0">
                        {Math.floor(
                          (isPlaying ? currentTime : recordingTime) / 60
                        )}
                        :
                        {((isPlaying ? currentTime : recordingTime) % 60)
                          .toString()
                          .padStart(2, "0")}
                      </span>
                      <button
                        onClick={deleteRecording}
                        className="text-red-500 hover:text-red-700 shrink-0"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </>
                  )}
                </div>
              )}

              <button
                className="w-fit px-8 py-2 bg-primary text-white rounded-lg hover:bg-black/90 transition-colors"
                onClick={() => {
                  // Handle search with recorded audio
                  setIsRecordingModalOpen(false);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardWrapper>
  );
}
