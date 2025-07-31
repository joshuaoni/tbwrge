import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, ChevronUp, Check, Plus } from "lucide-react";
import React, { useState } from "react";
import { ApplicationItem } from "@/actions/get-application-item";
import { useUserStore } from "@/hooks/use-user-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotes } from "@/actions/get-notes";
import { format } from "date-fns";
import { createNote } from "@/actions/create-note";
import { updateApplication } from "@/actions/update-application";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

interface CandidateDetailsProps {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  candidate: ApplicationItem;
  jobId?: string;
  refreshApplications: () => void;
}

const CandidateDetails = ({
  setCurrentView,
  candidate,
  jobId,
  refreshApplications,
}: CandidateDetailsProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(true);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [showMarkAsFitModal, setShowMarkAsFitModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { userData } = useUserStore();
  const queryClient = useQueryClient();
  const applicant = candidate.applicant;

  console.log("candidate", candidate);

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

  const markAsFitMutation = useMutation({
    mutationFn: async () => {
      if (!userData?.token || !jobId)
        throw new Error("Missing token or job ID");
      return await updateApplication(userData.token, jobId, {
        application_ids: [candidate.id],
        status: "shortlisted",
      });
    },
    onSuccess: () => {
      toast.success("Candidate marked as fit successfully");
      setShowMarkAsFitModal(false);
      queryClient.invalidateQueries({ queryKey: ["chat-messages"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      refreshApplications();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to mark candidate as fit");
    },
  });

  const rejectCandidateMutation = useMutation({
    mutationFn: async () => {
      if (!userData?.token || !jobId)
        throw new Error("Missing token or job ID");
      return await updateApplication(userData.token, jobId, {
        application_ids: [candidate.id],
        status: "rejected",
      });
    },
    onSuccess: () => {
      toast.success("Candidate rejected successfully");
      setShowRejectModal(false);
      queryClient.invalidateQueries({ queryKey: ["chat-messages"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      refreshApplications();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to reject candidate");
    },
  });

  const handleAddNote = () => {
    if (newNoteText.trim()) {
      createNoteMutation.mutate(newNoteText.trim());
    }
  };

  const handleGenerateReport = () => {
    // Navigate to report generator with candidate and job data
    const queryParams = {
      candidateId: candidate.id,
      jobId: jobId || "",
      cvUrl: candidate.cv || "",
      coverLetterUrl: candidate.cover_letter || "",
      applicantName: applicant.name || "",
    };

    router.push({
      pathname: "/dashboard/job-tools/report-generator",
      query: queryParams,
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView("details")}
              className="hover:bg-gray-100 p-1 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <h1 className="text-sm font-semibold">{applicant.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-sm text-[#009379] border border-[#009379] hover:bg-[#009379] hover:text-white px-6"
              onClick={handleGenerateReport}
            >
              {t("jobPostings.candidateDetails.generateReport")}
            </Button>
            <Button
              variant="ghost"
              className="text-sm text-red-500 border border-red-500 hover:bg-red-500 hover:text-white hover:bg-red px-6"
              onClick={() => setShowRejectModal(true)}
            >
              {t("jobPostings.candidateDetails.rejectCandidate")}
            </Button>
            <Button
              className="bg-[#009379] text-sm text-white hover:bg-[#009379]/90 px-6"
              onClick={() => setShowMarkAsFitModal(true)}
            >
              {t("jobPostings.candidateDetails.markAsFit")}
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
                <h2 className="text-sm font-semibold">
                  {t("jobPostings.candidateDetails.profileOverview")}
                </h2>
                <div className="flex flex-col items-center gap-2">
                  <h2 className="text-sm font-semibold">
                    {t("jobPostings.candidateDetails.fitScore")}
                  </h2>
                  <div className="flex items-center justify-center">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#009379]">
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
                    <p className="text-sm text-black w-[120px]">
                      {t("jobPostings.candidateDetails.email")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {applicant.email ||
                        t("jobPostings.candidateDetails.notProvided")}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">
                      {t("jobPostings.candidateDetails.phone")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {applicant.phone ||
                        t("jobPostings.candidateDetails.notProvided")}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">
                      {t("jobPostings.candidateDetails.dob")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {applicant.date_of_birth ||
                        t("jobPostings.candidateDetails.notProvided")}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">
                      {t("jobPostings.candidateDetails.linkedin")}
                    </p>
                    <p className="text-sm text-gray-500 cursor-pointer hover:underline">
                      {applicant.linkedin ? (
                        <a
                          href={applicant.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("jobPostings.candidateDetails.viewProfile")}
                        </a>
                      ) : (
                        t("jobPostings.candidateDetails.notProvided")
                      )}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">
                      {t("jobPostings.candidateDetails.currentPosition")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {applicant.current_position ||
                        t("jobPostings.candidateDetails.notProvided")}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">
                      {t("jobPostings.candidateDetails.company")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {applicant.current_company ||
                        t("jobPostings.candidateDetails.notProvided")}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">
                      {t("jobPostings.candidateDetails.nationality")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {applicant.nationality ||
                        t("jobPostings.candidateDetails.notProvided")}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">
                      {t("jobPostings.candidateDetails.location")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {applicant.country_of_residence ||
                        t("jobPostings.candidateDetails.notProvided")}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-black w-[120px]">
                      {t("jobPostings.candidateDetails.salaryRange")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t("jobPostings.candidateDetails.notProvided")}
                    </p>
                  </div>
                  <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <h2 className="text-sm font-semibold mb-4">
                {t("jobPostings.candidateDetails.profileSummary")}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {applicant.professional_summary ||
                  t("jobPostings.candidateDetails.notProvided")}
              </p>
            </div>

            {/* AI-Powered Insights */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <h2 className="text-sm font-semibold mb-4">
                {t("jobPostings.candidateDetails.aiInsights")}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-medium mb-2">
                    {t("jobPostings.candidateDetails.keySkills")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {candidate.skills_summary ||
                      t("jobPostings.candidateDetails.notProvided")}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-medium mb-2">
                    {t("jobPostings.candidateDetails.strengths")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {candidate.strength ||
                      t("jobPostings.candidateDetails.notProvided")}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    {t("jobPostings.candidateDetails.areasForDevelopment")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {candidate.areas_for_development ||
                      t("jobPostings.candidateDetails.notProvided")}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    {t("jobPostings.candidateDetails.cultureFitIndicators")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {candidate.culture_fit ||
                      t("jobPostings.candidateDetails.notProvided")}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    {t("jobPostings.candidateDetails.languages")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {candidate.languages ||
                      t("jobPostings.candidateDetails.notProvided")}
                  </p>
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
                <h2 className="text-sm font-semibold mb-4">
                  {t("jobPostings.candidateDetails.otherQuestions")}
                </h2>
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
                      candidate.application_answers
                        .filter(
                          (answer) => answer.question?.is_screening === false
                        )
                        .map((answer, index) => (
                          <div key={index}>
                            <p className="text-sm font-medium mb-2">
                              {answer.question?.text ||
                                t(
                                  "jobPostings.candidateDetails.questionNotAvailable"
                                )}
                            </p>
                            <p className="text-sm text-gray-600 bg-gray-100 rounded-xl p-3">
                              {answer.text ||
                                t(
                                  "jobPostings.candidateDetails.noAnswerProvided"
                                )}
                            </p>
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        {t("jobPostings.candidateDetails.noQuestionsAnswered")}
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
              <h2 className="text-sm font-semibold mb-4">
                {t("jobPostings.candidateDetails.supportingDocuments")}
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
                        {applicant.name}
                        {t("jobPostings.candidateDetails.cvSuffix")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t("jobPostings.candidateDetails.clickToView")}
                      </p>
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
                        {applicant.name}
                        {t("jobPostings.candidateDetails.coverLetterSuffix")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t("jobPostings.candidateDetails.clickToView")}
                      </p>
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
                          {t("jobPostings.candidateDetails.candidateVoicenote")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t("jobPostings.candidateDetails.clickToListen")}
                        </p>
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
                <h2 className="text-sm font-semibold">
                  {t("jobPostings.candidateDetails.addNotes")}
                </h2>
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
                    placeholder={t(
                      "jobPostings.candidateDetails.enterNoteHere"
                    )}
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
                    {t("jobPostings.candidateDetails.date")}
                  </div>
                  <div className="p-3 text-sm font-medium text-gray-600">
                    {t("jobPostings.candidateDetails.notes")}
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {isLoadingNotes ? (
                    <div className="p-3 text-center text-sm text-gray-500">
                      {t("jobPostings.candidateDetails.loadingNotes")}
                    </div>
                  ) : !notes?.length ? (
                    <div className="p-3 text-center text-sm text-gray-500">
                      {t("jobPostings.candidateDetails.noNotesAvailable")}
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
                <h2 className="text-sm font-semibold mb-4">
                  {t("jobPostings.candidateDetails.screeningFitScore")}
                </h2>
                <div className="flex items-center justify-center">
                  {candidate.screening_fit_score > 0 ? (
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#009379]">
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
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-gray-500 font-medium">
                        Not Available
                      </p>
                      <p className="text-xs text-gray-400">Yet</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-6">
                {candidate.application_answers &&
                candidate.application_answers.length > 0 ? (
                  candidate.application_answers
                    .filter((answer) => answer.question?.is_screening === true)
                    .map((answer, index) => (
                      <div key={index}>
                        <p className="text-sm font-medium mb-2">
                          {answer.question?.text ||
                            t(
                              "jobPostings.candidateDetails.questionNotAvailable"
                            )}
                        </p>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                          {answer.text ||
                            t("jobPostings.candidateDetails.noAnswerProvided")}
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-gray-500">
                    {t(
                      "jobPostings.candidateDetails.noScreeningQuestionsAnswered"
                    )}
                  </p>
                )}
              </div>
            </div>

            {/*Screening: AI-Powered Insights*/}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <h2 className="text-sm font-semibold mb-4">
                {t("jobPostings.candidateDetails.screeningAiInsights")}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {candidate.screening_ai_insights ||
                  t("jobPostings.candidateDetails.noAiInsightsAvailable")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mark as Fit Confirmation Modal */}
      <Dialog open={showMarkAsFitModal} onOpenChange={setShowMarkAsFitModal}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {t("jobPostings.candidateDetails.confirmMarkAsFit")}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-6">
              {t("jobPostings.candidateDetails.markAsFitConfirmMessage", {
                candidateName: applicant.name,
              })}
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setShowMarkAsFitModal(false)}
                disabled={markAsFitMutation.isPending}
              >
                {t("common.cancel")}
              </Button>
              <Button
                onClick={() => markAsFitMutation.mutate()}
                disabled={markAsFitMutation.isPending}
                className="bg-[#009379] text-white hover:bg-[#009379]/90 text-sm"
              >
                {markAsFitMutation.isPending
                  ? t("common.processing")
                  : t("jobPostings.candidateDetails.markAsFit")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Candidate Confirmation Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {t("jobPostings.candidateDetails.confirmRejectCandidate")}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-6">
              {t("jobPostings.candidateDetails.rejectCandidateConfirmMessage", {
                candidateName: applicant.name,
              })}
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setShowRejectModal(false)}
                disabled={rejectCandidateMutation.isPending}
              >
                {t("common.cancel")}
              </Button>
              <Button
                onClick={() => rejectCandidateMutation.mutate()}
                disabled={rejectCandidateMutation.isPending}
                variant="destructive"
                className="bg-red text-white hover:bg-red/90 text-sm"
              >
                {rejectCandidateMutation.isPending
                  ? t("common.processing")
                  : t("jobPostings.candidateDetails.rejectCandidate")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CandidateDetails;
