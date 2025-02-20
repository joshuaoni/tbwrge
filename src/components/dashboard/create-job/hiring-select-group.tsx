import { CaretDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useOutsideClick } from "@/hooks/outside-click";
import toast from "react-hot-toast";

interface SelectGroupProps {
  title: string;
  defaultValue?: string;
  value?: string;
  options: { label: string; value: string; disabled: boolean }[];
  onChange: (val: string) => void;
  className?: string;
  actions?: { label: string; onClick: () => void }[];
}

export function CreateJobHiringSelectGroup(props: SelectGroupProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: string) => {
    setIsOpen(false);
    if (props.onChange) props.onChange(optionValue);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className={twMerge("relative w-full", props.className)}>
      <div className="flex justify-between items-end mb-2">
        <label className="block text-[#4A5568] text-sm">{props.title}</label>
        <div>
          {props.actions?.map((action, i) => (
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
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 flex justify-between items-center bg-[#EDF2F7] text-[#898989] rounded"
      >
        {props?.options?.find((o) => o.value === props.value)?.label ??
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
                className={twMerge(
                  classNames(
                    "py-3 px-6 hover:bg-lightgreen hover:text-white cursor-pointer transition-all block",
                    {
                      "bg-lightgreen text-white": option.value === props.value,
                      "cursor-not-allowed bg-gray-200 hover:bg-gray-300 hover:text-gray-500":
                        option.disabled && option.value !== props.value,
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
