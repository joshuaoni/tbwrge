import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FiMic, FiSquare, FiPlay, FiTrash2, FiPause } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import {
  formatDateAndDifference,
  getJobOpen,
  IGetJobOpen,
  IGetJobOpenJobType,
  IGetJobOpenRes,
} from "@/actions/get-jobs-open";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useDebounce } from "@/hooks/debounce";
import Table from "./components/Table/Table";
import { outfit } from "@/constants/app";

const JOB_TYPE = {
  full_time: "Full Time",
  hybrid: "Hybrid",
  part_time: "Part Time",
  internship: "Internship",
};

const ITEMS_PER_PAGE = 10;

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
`;

const JobBoardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState<IGetJobOpenJobType>("full_time");
  const [skills, setSkills] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSkills = useDebounce(skills, 1500);
  const debouncedLocation = useDebounce(location, 1500);
  const _ = require("lodash");
  const [skillInput, setSkillInput] = useState("");

  // AI Search states
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

  const mutation = useMutation<IGetJobOpenRes[], Error, IGetJobOpen>({
    mutationKey: ["get-jobs-open"],
    mutationFn: async (data) => await getJobOpen(data),
  });

  useEffect(() => {
    mutation.mutate({
      search_term: searchTerm,
      job_type: jobType,
      skills: debouncedSkills,
      location: debouncedLocation,
    });
  }, [searchTerm, jobType, debouncedSkills, debouncedLocation]);

  // Handle click outside for AI dropdown
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

  // Audio recording functions
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

  // Clean up resources on unmount
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

  // Pagination logic
  const totalItems = mutation.data?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageItems = mutation.data?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardWrapper searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className={`${outfit.className} min-h-screen bg-white`}>
        <div className="w-full mx-auto">
          {/* Filters */}
          <div className="w-full max-w-screen-lg flex flex-wrap gap-4 mt-4">
            <div className="relative w-[200px]">
              <input
                className="w-full py-3 px-4 rounded-lg bg-[#F2F2F2] focus:outline-none text-[#333] placeholder-[#333]"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="relative w-[200px]">
              <select
                className="w-full py-3 px-4 rounded-lg bg-[#F2F2F2] focus:outline-none text-[#333] appearance-none cursor-pointer"
                value={jobType}
                onChange={(e) =>
                  setJobType(e.target.value as IGetJobOpenJobType)
                }
              >
                {Object.entries(JOB_TYPE).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="#333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="relative w-[200px]">
              <div className="w-full min-h-[48px] py-2 px-4 rounded-lg bg-[#F2F2F2] focus-within:outline-none flex flex-wrap gap-2 items-center">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white rounded-full px-3 py-1 text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() =>
                          setSkills(skills.filter((_, i) => i !== index))
                        }
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
                  placeholder={skills.length > 0 ? "" : "Press enter to add"}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && skillInput.trim()) {
                      e.preventDefault();
                      setSkills([...skills, skillInput.trim()]);
                      setSkillInput("");
                    }
                  }}
                />
              </div>
            </div>

            {/* AI Search Box */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
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
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C11.0111 2 10.0444 2.29324 9.22215 2.84265C8.39991 3.39206 7.75904 4.17295 7.3806 5.08658C7.00216 6.00021 6.90315 7.00555 7.09607 7.97545C7.289 8.94536 7.76521 9.83627 8.46447 10.5355C9.16373 11.2348 10.0546 11.711 11.0245 11.9039C11.9945 12.0969 12.9998 11.9978 13.9134 11.6194C14.827 11.241 15.6079 10.6001 16.1573 9.77785C16.7068 8.95561 17 7.98891 17 7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2Z"
                          fill="#009379"
                        />
                      </svg>
                      Audio Search
                    </button>
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2 border-t"
                      onClick={() => {
                        setIsTextSearchModalOpen(true);
                        setIsAIDropdownOpen(false);
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                          stroke="#009379"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 7H17"
                          stroke="#009379"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 12H17"
                          stroke="#009379"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 17H13"
                          stroke="#009379"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Text Search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Table */}
          <div className="w-full mt-8">
            <Table data={currentPageItems} isLoading={mutation.isPending} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-[#ebebeb] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-[#ebebeb] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text Search Modal */}
      {isTextSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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

            <p className="text-gray-600 mb-8">Please record your search</p>

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
};

export default JobBoardPage;
