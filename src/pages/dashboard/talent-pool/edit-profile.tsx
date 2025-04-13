import {
  ChevronLeft,
  Edit2,
  Check,
  ArrowLeft,
  Mic,
  Loader2,
  Plus,
  StopCircleIcon,
  Trash,
  X,
} from "lucide-react";
import Link from "next/link";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  TalentProfile,
  getTalentProfile,
  updateTalentProfile,
  updateTalentProfileWithFormData,
} from "@/actions/talent-profile";
import { useUserStore } from "@/hooks/use-user-store";
import { toast } from "react-hot-toast";

export default function EditTalentPool() {
  const { userData } = useUserStore();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<TalentProfile>>({});
  const [tempData, setTempData] = useState<Partial<TalentProfile>>({});
  const [salaryRange, setSalaryRange] = useState({
    min: "",
    max: "",
  });

  // File uploads
  const [fileUploads, setFileUploads] = useState<{
    cv: File | null;
    cover_letter: File | null;
    voicenote: File | null;
    profile_photo: File | null;
  }>({
    cv: null,
    cover_letter: null,
    voicenote: null,
    profile_photo: null,
  });

  // File paths for display
  const [tempDocuments, setTempDocuments] = useState({
    cv: "",
    cover_letter: "",
    voicenote: "",
  });

  // Audio recording enhanced state management
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioVisualization, setAudioVisualization] = useState<number[]>([]);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Fetch profile data
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["talentProfile"],
    queryFn: () => getTalentProfile(userData?.token || ""),
    enabled: !!userData?.token,
  });

  // Mutation for updating profile
  const mutation = useMutation({
    mutationFn: (data: {
      textData: Partial<TalentProfile>;
      files: {
        cv: File | null;
        cover_letter: File | null;
        voicenote: File | null;
        profile_photo: File | null;
      };
    }) => {
      const formData = {
        ...data.textData,
        ...data.files,
      };
      // Use type assertion to resolve type mismatch
      return updateTalentProfileWithFormData(
        userData?.token || "",
        formData as any
      );
    },
    onSuccess: (data) => {
      // Update local state with server response
      setEditedData(data);

      // Reset file uploads
      setFileUploads({
        cv: null,
        cover_letter: null,
        voicenote: null,
        profile_photo: null,
      });

      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      console.error("Update error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    },
  });

  // Update state when profile data is loaded
  useEffect(() => {
    if (profileData) {
      setEditedData(profileData);
      setTempData(profileData);
      setSalaryRange({
        min: profileData.salary_range_min?.toString() || "",
        max: profileData.salary_range_max?.toString() || "",
      });
      setTempDocuments({
        cv: profileData.cv || "",
        cover_letter: profileData.cover_letter || "",
        voicenote: profileData.voicenote || "",
      });
    }
  }, [profileData]);

  // Reset tempData when editing section changes
  useEffect(() => {
    if (editingSection) {
      setTempData(editedData);
      setSalaryRange({
        min: editedData.salary_range_min?.toString() || "",
        max: editedData.salary_range_max?.toString() || "",
      });

      // When entering edit mode for documents, reset the voice note
      if (editingSection === "documents") {
        setTempDocuments({
          cv: editedData.cv || "",
          cover_letter: editedData.cover_letter || "",
          voicenote: "", // Reset voicenote to empty when editing starts
        });
      } else {
        setTempDocuments({
          cv: editedData.cv || "",
          cover_letter: editedData.cover_letter || "",
          voicenote: editedData.voicenote || "",
        });
      }
    }
  }, [editingSection, editedData]);

  const handleEditClick = (section: string) => {
    setTempData(editedData);
    setSalaryRange({
      min: editedData.salary_range_min?.toString() || "",
      max: editedData.salary_range_max?.toString() || "",
    });

    // If entering documents edit mode, reset voice note
    if (section === "documents") {
      setTempDocuments({
        cv: editedData.cv || "",
        cover_letter: editedData.cover_letter || "",
        voicenote: "", // Reset voicenote to empty when documents editing starts
      });
      // Reset audio player state
      setIsPlaying(false);
      setAudioBlob(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      setTempDocuments({
        cv: editedData.cv || "",
        cover_letter: editedData.cover_letter || "",
        voicenote: editedData.voicenote || "",
      });
    }

    setEditingSection(section);
  };

  const handleInputChange = (field: keyof TalentProfile, value: string) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSalaryChange = (type: "min" | "max", value: string) => {
    setSalaryRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleDocumentChange = (
    type: "cv" | "cover_letter" | "voicenote",
    value: string
  ) => {
    setTempDocuments((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSectionSave = (section: string) => {
    // Create a copy of the current temp data
    const updatedData = { ...tempData };

    // Handle specific section updates
    if (section === "overview") {
      // Include all overview fields explicitly
      updatedData.name = tempData.name;
      updatedData.email = tempData.email;
      updatedData.phone = tempData.phone;
      updatedData.date_of_birth = tempData.date_of_birth;
      updatedData.linkedin = tempData.linkedin;
      updatedData.current_position = tempData.current_position;
      updatedData.current_company = tempData.current_company;
      updatedData.nationality = tempData.nationality;
      updatedData.country_of_residence = tempData.country_of_residence;
      updatedData.salary_range_min = parseInt(salaryRange.min) || null;
      updatedData.salary_range_max = parseInt(salaryRange.max) || null;
      updatedData.salary_currency = tempData.salary_currency || "USD";
    } else if (section === "summary") {
      // Include summary fields explicitly
      updatedData.professional_summary = tempData.professional_summary;
      updatedData.experience_summary = tempData.experience_summary;
      updatedData.skills_summary = tempData.skills_summary;
    } else if (section === "documents") {
      // Include document URLs if files are not being uploaded
      if (!fileUploads.cv && tempDocuments.cv) {
        updatedData.cv = tempDocuments.cv;
      }
      if (!fileUploads.cover_letter && tempDocuments.cover_letter) {
        updatedData.cover_letter = tempDocuments.cover_letter;
      }
      if (!fileUploads.voicenote && tempDocuments.voicenote) {
        updatedData.voicenote = tempDocuments.voicenote;
      }
    }

    // Update local state with the changes
    setEditedData(updatedData);

    // Log the data being sent for debugging
    console.log("Updating data:", updatedData);
    console.log("Files:", fileUploads);

    // Send update to server with any file uploads
    mutation.mutate({
      textData: updatedData,
      files: fileUploads,
    });

    // Exit edit mode
    setEditingSection(null);
  };

  const handleCancel = () => {
    setEditingSection(null);
    setTempData(editedData);
    setTempDocuments({
      cv: editedData.cv || "",
      cover_letter: editedData.cover_letter || "",
      voicenote: editedData.voicenote || "",
    });
  };

  // Format duration to MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Clean up timers and audio resources when component unmounts
  useEffect(() => {
    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Audio playback event handlers
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(Math.floor(audioRef.current?.currentTime || 0));
      };
    }
  }, [tempDocuments.voicenote]);

  // Update audio visualization
  const updateAudioVisualization = () => {
    if (analyzerRef.current) {
      const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
      analyzerRef.current.getByteFrequencyData(dataArray);

      // Get average of frequencies for visualization
      const values = Array.from(dataArray)
        .slice(0, 10)
        .map((value) => value / 255);
      setAudioVisualization(values);

      animationFrameRef.current = requestAnimationFrame(
        updateAudioVisualization
      );
    }
  };

  // Start recording with visualization and timer
  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Set up audio context for visualization
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      source.connect(analyzer);
      analyzerRef.current = analyzer;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);

        const audioFile = new File([audioBlob], "voice-introduction.wav", {
          type: "audio/wav",
        });

        // Update file uploads
        setFileUploads((prev) => ({ ...prev, voicenote: audioFile }));

        // Create temporary URL for playback
        const audioUrl = URL.createObjectURL(audioBlob);
        setTempDocuments((prev) => ({ ...prev, voicenote: audioUrl }));

        // Reset recording state
        setIsRecording(false);

        // Stop timers and visualization
        if (durationIntervalRef.current) {
          clearInterval(durationIntervalRef.current);
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        setAudioVisualization([]);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      // Start duration timer
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);

      // Start visualization
      updateAudioVisualization();
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      // Stop all tracks on the stream
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    }
  };

  // Clear recording function
  const clearRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (tempDocuments.voicenote) {
      URL.revokeObjectURL(tempDocuments.voicenote);
    }

    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setAudioBlob(null);
    setTempDocuments((prev) => ({ ...prev, voicenote: "" }));
    setFileUploads((prev) => ({ ...prev, voicenote: null }));
    setRecordingDuration(0);
    setAudioVisualization([]);
  };

  // Handle play/pause for audio
  const handlePlayRecording = () => {
    if (audioRef.current && tempDocuments.voicenote) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle file upload changes
  const handleFileChange = (
    type: "cv" | "cover_letter" | "voicenote" | "profile_photo",
    file: File
  ) => {
    // Update file uploads state with the new file
    setFileUploads((prev) => ({ ...prev, [type]: file }));

    // Create temporary URL for preview
    const fileUrl = URL.createObjectURL(file);

    if (type === "profile_photo") {
      setEditedData((prev) => ({ ...prev, profile_photo: fileUrl }));
    } else {
      setTempDocuments((prev) => ({ ...prev, [type]: fileUrl }));
    }
  };

  // Update profile photo handling
  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange("profile_photo", file);

      // Immediately save the profile photo
      const updatedData = { ...editedData };
      mutation.mutate({
        textData: updatedData,
        files: {
          ...fileUploads,
          profile_photo: file,
          cv: null,
          cover_letter: null,
          voicenote: null,
        },
      });

      toast.success("Uploading profile photo...");
    }
  };

  // Handle document file upload
  const handleDocumentFileChange = (
    type: "cv" | "cover_letter" | "voicenote",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(type, file);
    }
  };

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <DashboardWrapper>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardWrapper>
    );
  }

  // Show error state if data fetch failed
  if (error) {
    return (
      <DashboardWrapper>
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-red-500 mb-2">Error loading profile data.</p>
          <button
            className="px-4 py-2 bg-primary text-white rounded-md"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper>
      <div className="mx-auto bg-white p-6">
        <div className="flex justify-between mb-4 items-center">
          <div className="flex items-center">
            <Link href="/dashboard/talent-pool" className="hover:text-primary">
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </Link>
            <div className="flex items-center gap-6 ml-2">
              <h2 className="text-2xl font-semibold">
                {editedData.name || "Profile"}
              </h2>
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  {editedData.profile_photo ? (
                    <Image
                      src={editedData.profile_photo}
                      alt={editedData.name || "Profile photo"}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-2xl font-semibold text-gray-600">
                      {editedData.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePhotoChange}
                  />
                  <Edit2 className="w-3.5 h-3.5 text-gray-600" />
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/talent-pool/stats"
              className="flex items-center gap-2 text-primary hover:text-primary/90 font-medium text-[16px]"
            >
              <span>View Talent Pool Stats</span>
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
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Profile Overview */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between mb-10">
              <h2 className="text-lg font-semibold">Profile Overview</h2>
              {editingSection === "overview" ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSectionSave("overview")}
                    className="text-green-500 hover:text-green-600"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditClick("overview")}
                  className="text-gray-500 hover:text-primary"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Email</p>
                  {editingSection === "overview" ? (
                    <input
                      type="email"
                      className="text-sm text-gray-500 border rounded-lg p-2 w-[200px]"
                      value={tempData.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm text-gray-500">
                      {editedData.email || "Not provided"}
                    </p>
                  )}
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Phone</p>
                  {editingSection === "overview" ? (
                    <input
                      type="tel"
                      className="text-sm text-gray-500 border rounded-lg p-2 w-[200px]"
                      value={tempData.phone || ""}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm text-gray-500">
                      {editedData.phone || "Not provided"}
                    </p>
                  )}
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">DOB</p>
                  {editingSection === "overview" ? (
                    <input
                      type="date"
                      className="text-sm text-gray-500 border rounded-lg p-2 w-[200px]"
                      value={tempData.date_of_birth || ""}
                      onChange={(e) =>
                        handleInputChange("date_of_birth", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm text-gray-500">
                      {editedData.date_of_birth || "Not provided"}
                    </p>
                  )}
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">LinkedIn</p>
                  {editingSection === "overview" ? (
                    <input
                      type="url"
                      className="text-sm text-gray-500 border rounded-lg p-2 w-[200px]"
                      value={tempData.linkedin || ""}
                      onChange={(e) =>
                        handleInputChange("linkedin", e.target.value)
                      }
                    />
                  ) : (
                    <a
                      href={editedData.linkedin || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:underline"
                    >
                      {editedData.linkedin ? "View Profile" : "Not provided"}
                    </a>
                  )}
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">
                    Current Position
                  </p>
                  {editingSection === "overview" ? (
                    <input
                      type="text"
                      className="text-sm text-gray-500 border rounded-lg p-2 w-[200px]"
                      value={tempData.current_position || ""}
                      onChange={(e) =>
                        handleInputChange("current_position", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm text-gray-500">
                      {editedData.current_position || "Not provided"}
                    </p>
                  )}
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Company</p>
                  {editingSection === "overview" ? (
                    <input
                      type="text"
                      className="text-sm text-gray-500 border rounded-lg p-2 w-[200px]"
                      value={tempData.current_company || ""}
                      onChange={(e) =>
                        handleInputChange("current_company", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm text-gray-500">
                      {editedData.current_company || "Not provided"}
                    </p>
                  )}
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Nationality</p>
                  {editingSection === "overview" ? (
                    <input
                      type="text"
                      className="text-sm text-gray-500 border rounded-lg p-2 w-[200px]"
                      value={tempData.nationality || ""}
                      onChange={(e) =>
                        handleInputChange("nationality", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm text-gray-500">
                      {editedData.nationality || "Not provided"}
                    </p>
                  )}
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Location</p>
                  {editingSection === "overview" ? (
                    <input
                      type="text"
                      className="text-sm text-gray-500 border rounded-lg p-2 w-[200px]"
                      value={tempData.country_of_residence || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "country_of_residence",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p className="text-sm text-gray-500">
                      {editedData.country_of_residence || "Not provided"}
                    </p>
                  )}
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Salary Range</p>
                  {editingSection === "overview" ? (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        className="text-sm text-gray-500 border rounded-lg p-2 w-[95px]"
                        placeholder="Min"
                        value={salaryRange.min}
                        onChange={(e) =>
                          handleSalaryChange("min", e.target.value)
                        }
                      />
                      <input
                        type="number"
                        className="text-sm text-gray-500 border rounded-lg p-2 w-[95px]"
                        placeholder="Max"
                        value={salaryRange.max}
                        onChange={(e) =>
                          handleSalaryChange("max", e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {editedData.salary_range_min !== null &&
                      editedData.salary_range_max !== null
                        ? `${
                            editedData.salary_currency || "$"
                          }${editedData.salary_range_min?.toLocaleString()} - ${
                            editedData.salary_currency || "$"
                          }${editedData.salary_range_max?.toLocaleString()}`
                        : "Not provided"}
                    </p>
                  )}
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-semibold">Profile Summary</h2>
              {editingSection === "summary" ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSectionSave("summary")}
                    className="text-green-500 hover:text-green-600"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditClick("summary")}
                  className="text-gray-500 hover:text-primary"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>
            {editingSection === "summary" ? (
              <textarea
                className="w-full h-[200px] border rounded-lg p-3 text-sm text-gray-600"
                value={tempData.professional_summary || ""}
                onChange={(e) =>
                  handleInputChange("professional_summary", e.target.value)
                }
              />
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed">
                {editedData.professional_summary ||
                  "No professional summary provided."}
              </p>
            )}
          </div>

          {/* AI-Powered Insights */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-semibold">AI-Powered Insights</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Key Skills</h3>
                <p className="text-sm text-gray-600">
                  {editedData.skills_summary || "No skills data available."}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Strengths</h3>
                <p className="text-sm text-gray-600">
                  {editedData.strength || "No data available."}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Areas for Development
                </h3>
                <p className="text-sm text-gray-600">
                  {editedData.areas_for_development || "No data available."}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Culture Fit Indicators
                </h3>
                <p className="text-sm text-gray-600">
                  {editedData.culture_fit || "No data available."}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Languages</h3>
                <p className="text-sm text-gray-600">
                  {editedData.languages || "No data available."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {/* Supporting Documents */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-semibold">Supporting Documents</h2>
              {editingSection === "documents" ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSectionSave("documents")}
                    className="text-green-500 hover:text-green-600"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditClick("documents")}
                  className="text-gray-500 hover:text-primary"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="space-y-3">
              {editingSection === "documents" ? (
                <>
                  <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-lg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.75 2.5H5C4.0335 2.5 3.75 2.7835 3.75 3.75V16.25C3.75 17.2165 4.0335 17.5 5 17.5H15C15.9665 17.5 16.25 17.2165 16.25 16.25V5L13.75 2.5Z"
                          stroke="#FF0000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.75 2.5V5H16.25"
                          stroke="#FF0000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 10H12.5"
                          stroke="#FF0000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 12.5H12.5"
                          stroke="#FF0000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Upload CV</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleDocumentFileChange("cv", e)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-lg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.75 2.5H5C4.0335 2.5 3.75 2.7835 3.75 3.75V16.25C3.75 17.2165 4.0335 17.5 5 17.5H15C15.9665 17.5 16.25 17.2165 16.25 16.25V5L13.75 2.5Z"
                          stroke="#FF0000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.75 2.5V5H16.25"
                          stroke="#FF0000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 10H12.5"
                          stroke="#FF0000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 12.5H12.5"
                          stroke="#FF0000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Upload Cover Letter</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                          handleDocumentFileChange("cover_letter", e)
                        }
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200"
                      />
                    </div>
                  </div>

                  {/* Voice Introduction Recording with updated UI */}
                  <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-100/0 rounded-lg">
                      <Mic className="w-5 h-5 text-[#009379]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Voice Introduction</p>

                      {!tempDocuments.voicenote ? (
                        isRecording ? (
                          <div className="bg-gray-50 rounded-lg p-2 mt-2">
                            <div className="flex items-center w-full">
                              <span className="text-xs text-gray-600 mr-1 whitespace-nowrap shrink-0">
                                Recording...
                              </span>
                              <div className="flex-1 mx-1 overflow-hidden">
                                <div className="flex items-center gap-[1px] justify-between">
                                  {Array.from({ length: 30 }).map(
                                    (_, index) => (
                                      <div
                                        key={index}
                                        className="w-[1px] bg-[#009379]"
                                        style={{
                                          height:
                                            index <
                                            audioVisualization.length * 5
                                              ? `${Math.max(
                                                  3,
                                                  audioVisualization[
                                                    index %
                                                      audioVisualization.length
                                                  ] * 16
                                                )}px`
                                              : "3px",
                                          opacity:
                                            index <
                                            audioVisualization.length * 5
                                              ? 1
                                              : 0.2,
                                        }}
                                      />
                                    )
                                  )}
                                </div>
                              </div>
                              <span className="text-xs text-gray-500 ml-1 mr-1 whitespace-nowrap shrink-0">
                                {formatDuration(recordingDuration)}
                              </span>
                              <button
                                onClick={stopRecording}
                                className="shrink-0 text-red-500 hover:text-red-600"
                              >
                                <StopCircleIcon className="w-5 text-red h-5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="h-[38px] bg-[#F8F9FF] w-full rounded-lg flex items-center px-3 cursor-pointer hover:bg-[#F0F2FF] transition-colors mt-2"
                            onClick={startRecording}
                          >
                            <span className="text-sm text-gray-500 flex-1">
                              Record
                            </span>
                            <Mic className="w-4 h-4 text-[#009379]" />
                          </div>
                        )
                      ) : (
                        <div className="mt-2">
                          <div className="flex items-center bg-gray-50 rounded-lg p-2 w-full">
                            <button
                              onClick={handlePlayRecording}
                              className="shrink-0 text-gray-600 hover:text-gray-800 mr-1"
                            >
                              {isPlaying ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    x="6"
                                    y="4"
                                    width="4"
                                    height="16"
                                  ></rect>
                                  <rect
                                    x="14"
                                    y="4"
                                    width="4"
                                    height="16"
                                  ></rect>
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                              )}
                            </button>
                            <div className="flex-1 overflow-hidden mx-1">
                              <div className="flex items-center gap-0 justify-between">
                                {Array.from({ length: 30 }).map((_, index) => (
                                  <div
                                    key={index}
                                    className="w-[1px] bg-[#009379]"
                                    style={{
                                      height: `${Math.max(
                                        3,
                                        Math.random() * 12
                                      )}px`,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 ml-1 mr-1 whitespace-nowrap shrink-0">
                              {isPlaying
                                ? formatDuration(currentTime)
                                : "00:05"}
                            </span>
                            <button
                              onClick={clearRecording}
                              className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash size={14} />
                            </button>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <input
                              type="file"
                              accept="audio/*"
                              id="voicenote-upload"
                              className="hidden"
                              onChange={(e) =>
                                handleDocumentFileChange("voicenote", e)
                              }
                            />
                          </div>
                        </div>
                      )}
                      <audio
                        ref={audioRef}
                        src={tempDocuments.voicenote || ""}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {editedData.cv && (
                    <a
                      href={editedData.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-lg">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.75 2.5H5C4.0335 2.5 3.75 2.7835 3.75 3.75V16.25C3.75 17.2165 4.0335 17.5 5 17.5H15C15.9665 17.5 16.25 17.2165 16.25 16.25V5L13.75 2.5Z"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.75 2.5V5H16.25"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.5 10H12.5"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.5 12.5H12.5"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {editedData.name || "Your"}'s CV
                        </p>
                        <p className="text-xs text-gray-500">Click to view</p>
                      </div>
                    </a>
                  )}

                  {editedData.cover_letter && (
                    <a
                      href={editedData.cover_letter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-lg">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.75 2.5H5C4.0335 2.5 3.75 2.7835 3.75 3.75V16.25C3.75 17.2165 4.0335 17.5 5 17.5H15C15.9665 17.5 16.25 17.2165 16.25 16.25V5L13.75 2.5Z"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.75 2.5V5H16.25"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.5 10H12.5"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.5 12.5H12.5"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {editedData.name || "Your"}'s Cover Letter
                        </p>
                        <p className="text-xs text-gray-500">Click to view</p>
                      </div>
                    </a>
                  )}

                  {/* Voice Introduction Display when viewing (not editing) */}
                  {editedData.voicenote && (
                    <a
                      href={editedData.voicenote}
                      download={`${
                        editedData.name || "Candidate"
                      }_Introduction.wav`}
                      className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-100/0 rounded-lg">
                        <Mic className="w-5 h-5 text-[#009379]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {editedData.name || "Your"}'s Introduction Voicenote
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Click to download
                        </p>
                      </div>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
