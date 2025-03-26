import { CaretDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { convertToSlug } from "@/components/settings/profile/input-group";
import { useOutsideClick } from "@/hooks/outside-click";
import { InputGroupProps } from "@/interfaces/input";

interface DashboardSelectGroupProps {
  title: string;
  defaultValue?: string;
  value?: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
  className?: string;
}

interface DashboardFileGroupProps {
  label: string;
  onChange?: (file: File) => void;
  file?: File | null;
}

export interface CheckBoxInputProps {
  label: string;
  value?: boolean;
  onChange?: (val: boolean) => void;
}

export function DashboardInputGroup(props: InputGroupProps) {
  return (
    <div className={twMerge("w-full space-y-2", props.className)}>
      <label
        htmlFor={convertToSlug(props.label)}
        className="block text-[#4A5568] text-sm"
      >
        {props.label}
      </label>
      <input
        {...props}
        type={props.type ?? "text"}
        id={convertToSlug(props.label)}
        name={props.name ?? convertToSlug(props.label)}
        className="bg-[#EDF2F7] py-4 px-6 rounded w-full focus:outline-none"
        placeholder={props.placeholder ?? `Enter your ${props.label}`}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </div>
  );
}

export function DashboardTextareaGroup(props: InputGroupProps) {
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
        className="bg-[#EDF2F7] py-4 px-6 rounded w-full focus:outline-none"
        placeholder={props.placeholder ?? `Enter your ${props.label}`}
        value={props.value}
        onChange={handleTextareaChange}
      />
      <span className="absolute top-8 right-6 text-xs font-medium text-[#87909E]">
        {wordCount} / {limit}
      </span>
    </div>
  );
}

export function DashboardSelectGroup(props: DashboardSelectGroupProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.value || "");

  useEffect(() => {
    if (props.value) {
      setSelectedOption(props.value);
    }
  }, [props.value]);

  const handleOptionClick = (optionValue: string) => {
    setSelectedOption(optionValue);
    setIsOpen(false);
    if (props.onChange) {
      props.onChange(optionValue);
    }
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className={twMerge("relative w-full", props.className)}>
      <label className="block text-[#4A5568] text-sm">{props.title}</label>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 flex justify-between items-center bg-[#EDF2F7] text-[#898989] rounded"
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

export function DashboardFileGroup(props: DashboardFileGroupProps) {
  return (
    <div className="w-full space-y-2">
      <label htmlFor={convertToSlug(props.label)} className="block">
        <span className="block text-[#4A5568] text-sm mb-2">{props.label}</span>
        <div className="w-full bg-[#EDF2F7] text-[#87909E] text-xs py-4 px-6 space-x-4 rounded">
          <span className="capitalize border border-gray-500 py-0.5 px-2 rounded-sm cursor-pointer">
            choose file
          </span>{" "}
          <span>{props.file?.name ?? "No file chosen"}</span>
        </div>
      </label>
      <input
        type="file"
        id={convertToSlug(props.label)}
        className="hidden"
        onChange={(e) =>
          props.onChange && e.target.files && props.onChange(e.target.files[0])
        }
      />
    </div>
  );
}

export function DashboardCheckBoxInput(props: CheckBoxInputProps) {
  const { value = false } = props;

  return (
    <div className="flex items-center gap-x-3">
      <input
        type="checkbox"
        name={convertToSlug(props.label)}
        id={convertToSlug(props.label)}
        className="h-5 w-5"
        checked={value}
        onChange={(e) => props?.onChange?.(e.target.checked)}
      />
      <label htmlFor={convertToSlug(props.label)} className="text-[#87909E]">
        {props.label}
      </label>
    </div>
  );
}
