import { CaretDownIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

import { useOutsideClick } from "@/hooks/outside-click";
import { JobBoardFilterProps } from "../../../interfaces/job-board.interface";

function JobBoardFilter(props: JobBoardFilterProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [_, setSelectedOption] = useState(props.options?.[0]?.value ?? "");

  const handleOptionClick = (optionLabel: string, optionValue: string) => {
    setSelectedOption(optionLabel);
    setIsOpen(false);
    if (props.onChange) {
      props.onChange(optionValue);
    }
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative">
      <label className="sr-only">{props.title}</label>
      <button
        onClick={() => setIsOpen(true)}
        className="w-52 py-3 px-4 flex justify-between items-center rounded-lg bg-[#ebebeb]"
      >
        {props.title}
        <CaretDownIcon />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-[#ebebeb] rounded-md shadow-lg p-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {props?.options?.map((option, i) => (
              <span
                key={i}
                className="py-2 px-4 hover:bg-[#c0c0c0] cursor-pointer rounded-lg transition-all block"
                onClick={() => handleOptionClick(option.label, option.value)}
              >
                {option.label}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default JobBoardFilter;
