import React from "react";

const RoleSelectionDropDown = ({
  role,
  setRole,
}: {
  role: string;
  setRole: (role: string) => void;
}) => {
  return (
    <div className="flex w-full rounded-lg overflow-hidden bg-[#EDF2F7]">
      <button
        type="button"
        onClick={() => setRole("Job Seeker")}
        className={`flex-1 py-3 px-4 text-sm transition-colors ${
          role === "Job Seeker"
            ? "bg-primary text-white"
            : "bg-[#EDF2F7] text-[#898989] hover:bg-gray-200"
        }`}
      >
        Job Seeker
      </button>
      <button
        type="button"
        onClick={() => setRole("Recruiter")}
        className={`flex-1 py-3 px-4 text-sm transition-colors ${
          role === "Recruiter"
            ? "bg-primary text-white"
            : "bg-[#EDF2F7] text-[#898989] hover:bg-gray-200"
        }`}
      >
        Recruiter
      </button>
    </div>
  );
};

export default RoleSelectionDropDown;
