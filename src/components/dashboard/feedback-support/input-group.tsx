import { CaretDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { convertToSlug } from "@/components/settings/profile/input-group";
import { useOutsideClick } from "@/hooks/outside-click";
import { InputGroupProps } from "@/interfaces/input";

interface FeedbackSupportSelectGroupProps {
  title: string;
  defaultValue?: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}

interface FeebackSupportFileGroupProps {
  label: string;
  onChange?: (file: File) => void;
  file?: File | null;
}

export function FeedbackSupportInputGroup(props: InputGroupProps) {
  return (
    <div className={twMerge("w-full space-y-2", props.className)}>
      <label
        htmlFor={convertToSlug(props.label)}
        className="block text-[#4A5568] text-sm"
      >
        {props.label}
      </label>
      <input
        type={props.type ?? "text"}
        id={convertToSlug(props.label)}
        name={props.name ?? convertToSlug(props.label)}
        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
        placeholder={`Enter your ${props.label}`}
        onChange={(e) => props.onChange?.(e.target.value)}
        value={props.value}
      />
    </div>
  );
}

export function FeedbackSupportTextareaGroup(props: InputGroupProps) {
  const [wordCount, setWordCount] = useState(0);
  const limit = 500;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWordCount(e.target.value.split(/\s+/).filter(Boolean).length);

    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  return (
    <div className={twMerge("w-full space-y-2 relative", props.className)}>
      <label
        htmlFor={convertToSlug(props.label)}
        className="block text-[#4A5568] text-sm"
      >
        {props.label}
      </label>
      <textarea
        id={convertToSlug(props.label)}
        name={props.name ?? convertToSlug(props.label)}
        rows={5}
        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
        placeholder={`Enter your ${props.label}`}
        value={props.value}
        onChange={handleTextareaChange}
      />
      <span className="absolute top-8 right-6 text-xs font-medium text-[#87909E]">
        {wordCount} / {limit}
      </span>
    </div>
  );
}

export function FeedbackSupportSelectGroup(
  props: FeedbackSupportSelectGroupProps
) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (optionValue: string) => {
    setSelectedOption(optionValue);
    setIsOpen(false);
    if (props.onChange) {
      props.onChange(optionValue);
    }
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative w-full">
      <label className="block text-[#4A5568] text-sm">{props.title}</label>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] flex justify-between items-center"
      >
        {props?.options?.find((o) => o.value === selectedOption)?.label ??
          props.defaultValue}
        <CaretDownIcon />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {props.options.map((option, i) => (
              <span
                key={i}
                className={classNames(
                  "py-3 px-6 hover:bg-lightgreen hover:text-white cursor-pointer transition-all block",
                  {
                    "bg-lightgreen text-white": option.value === selectedOption,
                  }
                )}
                onClick={() => handleOptionClick(option.value)}
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

export function FeedbackSupportFileGroup(props: FeebackSupportFileGroupProps) {
  return (
    <div className="w-full space-y-2">
      <label htmlFor={convertToSlug(props.label)} className="block">
        <span className="block text-[#4A5568] text-sm mb-2">{props.label}</span>
        <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-[#6B7280] hover:file:bg-gray-200">
          <input
            type="file"
            id={convertToSlug(props.label)}
            className="w-full"
            onChange={(e) =>
              props.onChange &&
              e.target.files &&
              props.onChange(e.target.files[0])
            }
          />
        </div>
      </label>
    </div>
  );
}
