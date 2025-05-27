import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, ChevronUp, Check, Plus } from "lucide-react";
import React, { useState } from "react";
import { ApplicationItem } from "@/actions/get-application-item";
import { useUserStore } from "@/hooks/use-user-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotes } from "@/actions/get-notes";
import { format } from "date-fns";
import { createNote } from "@/actions/create-note";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";

interface CandidateDetailsProps {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  candidate: ApplicationItem;
}

const CandidateDetails = ({
  setCurrentView,
  candidate,
}: CandidateDetailsProps) => {
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(true);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const { userData } = useUserStore();
  const queryClient = useQueryClient();
  const applicant = candidate.applicant;

  const { data: notes, isLoading: isLoadingNotes } = useQuery({
    queryKey: ["candidate-notes", candidate.id],
    queryFn: async () => {
      if (!userData?.token) return [];
      return await getNotes(userData.token, candidate.id);
    },
    enabled: !!userData?.token && !!candidate.id,
  });

  const createNoteMutation = useMutation({
    mutationFn: async (text: string) => {
      if (!userData?.token) throw new Error("No token available");
      return await createNote(userData.token, candidate.id, text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidate-notes", candidate.id],
      });
      setIsAddingNote(false);
      setNewNoteText("");
    },
  });

  const handleAddNote = () => {
    if (newNoteText.trim()) {
      createNoteMutation.mutate(newNoteText.trim());
    }
  };

  console.log({ candidate });

  return (
    <div className="bg-white min-h-screen">
      <div className="px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView("details")}
              className="hover:bg-gray-100 p-1 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold">{applicant.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-[#009379] border border-[#009379] hover:bg-[#009379] hover:text-white px-6"
            >
              Generate Candidate Report
            </Button>
            <Button
              variant="ghost"
              className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white hover:bg-red px-6"
            >
              Reject Candidate
            </Button>
            <Button className="bg-[#009379] text-white hover:bg-[#009379]/90 px-6">
              Mark as Fit
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col gap-6">
          {/* First Row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Profile Overview */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-semibold">Profile Overview</h2>
                <div className="flex flex-col items-center gap-2">
                  <h2 className="text-lg font-semibold">Fit Score</h2>
                  <div className="flex items-center justify-center">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[16px] font-bold text-[#009379]">
                          {candidate.fit_score}%
                        </span>
                      </div>
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#009379"
                          strokeWidth="3"
                          strokeDasharray={`${candidate.fit_score}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">Email</p>
                    <p className="text-sm text-gray-500">{applicant.email}</p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">Phone</p>
                    <p className="text-sm text-gray-500">{applicant.phone}</p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">DOB</p>
                    <p className="text-sm text-gray-500">
                      {applicant.date_of_birth || "Not provided"}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">LinkedIn</p>
                    <p className="text-sm text-gray-500 cursor-pointer hover:underline">
                      {applicant.linkedin ? (
                        <a
                          href={applicant.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Profile
                        </a>
                      ) : (
                        "Not provided"
                      )}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">
                      Current Position
                    </p>
                    <p className="text-sm text-gray-500">
                      {applicant.current_position}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">Company</p>
                    <p className="text-sm text-gray-500">
                      {applicant.current_company}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">Nationality</p>
                    <p className="text-sm text-gray-500">
                      {applicant.nationality}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">Location</p>
                    <p className="text-sm text-gray-500">
                      {applicant.country_of_residence}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">Salary Range</p>
                    <p className="text-sm text-gray-500">{"Not provided"}</p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <h2 className="text-lg font-semibold mb-4">Profile Summary</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {applicant.professional_summary}
              </p>
            </div>

            {/* AI-Powered Insights */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <h2 className="text-lg font-semibold mb-4">
                AI-Powered Insights
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Key Skills</h3>
                  <p className="text-sm text-gray-600">
                    {candidate.skills_summary}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Strengths</h3>
                  <p className="text-sm text-gray-600">{candidate.strength}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Areas for Development
                  </h3>
                  <p className="text-sm text-gray-600">
                    {candidate.areas_for_development}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Culture Fit Indicators
                  </h3>
                  <p className="text-sm text-gray-600">
                    {candidate.culture_fit}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Languages</h3>
                  <p className="text-sm text-gray-600">{candidate.languages}</p>
                </div>
              </div>
            </div>
          </div>

          {/*Other Questions*/}
          <div className="grid grid-cols-1">
            <div className="rounded-lg p-4">
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => setIsQuestionsOpen(!isQuestionsOpen)}
              >
                <h2 className="text-lg font-semibold mb-4">Other Questions</h2>
                {isQuestionsOpen ? (
                  <ChevronUp className="w-5 h-5 mb-4 text-gray-600 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 mb-4 text-gray-600 transition-transform duration-300" />
                )}
              </div>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isQuestionsOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-6">
                    {candidate.application_answers &&
                    candidate.application_answers.length > 0 ? (
                      candidate.application_answers.map((answer, index) => (
                        <div key={index}>
                          <p className="text-sm font-medium mb-2">
                            {answer.question?.text || "Question not available"}
                          </p>
                          <p className="text-sm text-gray-600 bg-gray-100 rounded-xl p-3">
                            {answer.text || "No answer provided"}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No questions answered
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-[0.8fr_2fr] gap-6">
            {/* Supporting Documents */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <h2 className="text-lg font-semibold mb-4">
                Supporting Documents
              </h2>
              <div className="space-y-3">
                {candidate.cv && (
                  <a
                    href={candidate.cv}
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
                        {applicant.name}'s CV
                      </p>
                      <p className="text-xs text-gray-500">Click to view</p>
                    </div>
                  </a>
                )}

                {candidate.cover_letter && (
                  <a
                    href={candidate.cover_letter}
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
                        {applicant.name}'s Cover Letter
                      </p>
                      <p className="text-xs text-gray-500">Click to view</p>
                    </div>
                  </a>
                )}

                {candidate.voicenote && (
                  <div className="flex flex-col border border-gray-200 rounded-xl p-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#009379]/10 rounded-lg">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 13.75C11.7259 13.75 13.125 12.3509 13.125 10.625V5.625C13.125 3.89911 11.7259 2.5 10 2.5C8.27411 2.5 6.875 3.89911 6.875 5.625V10.625C6.875 12.3509 8.27411 13.75 10 13.75Z"
                            stroke="#009379"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.375 8.75V10.625C4.375 13.7316 6.89339 16.25 10 16.25C13.1066 16.25 15.625 13.7316 15.625 10.625V8.75"
                            stroke="#009379"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Candidate Application Voicenote
                        </p>
                        <p className="text-xs text-gray-500">Click to listen</p>
                      </div>
                    </div>
                    <div className="h-8 flex items-center gap-[2px]">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gray-300 rounded-sm"
                          style={{
                            height: `${Math.random() * 100}%`,
                            minWidth: "2px",
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Add Notes */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Add Notes</h2>
                <button
                  onClick={() => {
                    if (isAddingNote) {
                      handleAddNote();
                    } else {
                      setIsAddingNote(true);
                    }
                  }}
                  className="w-7 h-7 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  disabled={isAddingNote && !newNoteText.trim()}
                >
                  {isAddingNote ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>
              </div>
              {isAddingNote && (
                <div className="mb-4">
                  <Textarea
                    placeholder="Enter your note here..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="min-h-[100px] w-full bg-gray-100"
                    autoFocus
                  />
                </div>
              )}
              <div className="overflow-hidden">
                <div className="grid rounded-xl grid-cols-[120px_1fr] bg-gray-200">
                  <div className="p-3 text-sm font-medium text-gray-600">
                    Date
                  </div>
                  <div className="p-3 text-sm font-medium text-gray-600">
                    Notes
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {isLoadingNotes ? (
                    <div className="p-3 text-center text-sm text-gray-500">
                      Loading notes...
                    </div>
                  ) : !notes?.length ? (
                    <div className="p-3 text-center text-sm text-gray-500">
                      No notes available
                    </div>
                  ) : (
                    notes.map((note) => (
                      <div key={note.id} className="grid grid-cols-[120px_1fr]">
                        <div className="p-3 text-sm text-gray-500">
                          {format(new Date(note.created_at), "dd/MM/yy")}
                        </div>
                        <div className="p-3 text-sm">{note.text}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Screening Questions */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <div className="bg-white rounded-lg p-4 mb-4 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">
                  Screening Fit Score
                </h2>
                <div className="flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[20px] font-bold text-[#009379]">
                        {candidate.screening_fit_score}%
                      </span>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#009379"
                        strokeWidth="3"
                        strokeDasharray={`${candidate.screening_fit_score}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {candidate.application_answers &&
                candidate.application_answers.length > 0 ? (
                  candidate.application_answers.map((answer, index) => (
                    <div key={index}>
                      <p className="text-sm font-medium mb-2">
                        {answer.question?.text || "Question not available"}
                      </p>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                        {answer.text || "No answer provided"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No screening questions answered
                  </p>
                )}
              </div>
            </div>

            {/*Screening: AI-Powered Insights*/}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <h2 className="text-lg font-semibold mb-4">
                Screening: AI-Powered Insights
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {candidate.screening_ai_insights ||
                  "No AI insights available for screening"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
