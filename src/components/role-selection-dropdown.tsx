import React from "react";
import { CaretDownIcon } from "@radix-ui/react-icons";

const RoleSelectionDropDown = ({
  role,
  setRole,
}: {
  role: string;
  setRole: (role: string) => void;
}) => {
  const [showDropDown, setShowDropDown] = React.useState(false);

  return (
    <div>
      <div
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
        className="px-3 w-full py-3 cursor-pointer rounded-lg bg-[#EDF2F7] text-sm text-[#898989] flex items-center"
      >
        {role}
        <CaretDownIcon className="ml-auto" />
      </div>
      <div
        className={`overflow-hidden mt-4 rounded-md border duration-300 ease-in-out transform ${
          showDropDown
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div
          onClick={() => {
            setRole("Candidate");
            setShowDropDown(false);
          }}
          className={`p-2 ${
            role === "Candidate" ? "text-white bg-primary" : ""
          } cursor-pointer text-sm `}
        >
          Candidate
        </div>
        <div
          onClick={() => {
            setRole("Employer");
            setShowDropDown(false);
          }}
          className={`p-2 ${
            role === "Employer" ? "text-white bg-primary" : ""
          } cursor-pointer text-sm `}
        >
          Employer
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionDropDown;
