import { CaretDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useOutsideClick } from "@/hooks/outside-click";
import toast from "react-hot-toast";

interface SelectGroupProps {
  title: string;
  options?: { label: string; value: string; disabled?: boolean }[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  customInput?: React.ReactNode;
  className?: string;
  actions?: { label: string; onClick: () => void }[];
}

export function CreateJobHiringSelectGroup({
  title,
  options = [],
  defaultValue,
  value,
  onChange,
  customInput,
  className,
  actions,
}: SelectGroupProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: string) => {
    setIsOpen(false);
    if (onChange) onChange(optionValue);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className={twMerge("relative w-full", className)}>
      <div className="flex justify-between items-end mb-2">
        <label className="block text-[#4A5568] text-sm">{title}</label>
        <div>
          {actions?.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              className="block capitalize text-[#009379] hover:text-[#009379] transition-all"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
      {customInput || (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-sm w-full py-3 px-4 flex justify-between items-center  text-[#898989] rounded bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.find((o) => o.value === value)?.label ?? defaultValue}
          <CaretDownIcon />
        </button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {options.map((option, i) => (
              <span
                key={i}
                className={twMerge(
                  classNames(
                    "py-3 px-6 hover:bg-lightgreen hover:text-white cursor-pointer transition-all block",
                    {
                      "bg-lightgreen text-white": option.value === value,
                      "cursor-not-allowed bg-gray-200 hover:bg-gray-300 hover:text-gray-500":
                        option.disabled && option.value !== value,
                    }
                  )
                )}
                onClick={() => {
                  if (option.disabled)
                    return toast.error("This option is disabled");
                  handleOptionClick(option.value);
                }}
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
