import { CaretDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

import { useOutsideClick } from "@/hooks/outside-click";

interface RankByFilterProps {
  title: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}

function RankByFilter(props: RankByFilterProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    props.options[0]?.value ?? ""
  );

  const handleOptionClick = (optionValue: string) => {
    setSelectedOption(optionValue);
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
        className="w-52 py-3 px-4 flex justify-between items-center rounded-full bg-[#ebebeb] text-[#898989]"
      >
        {props.title}&nbsp;
        {props.options.find((o) => o.value === selectedOption)?.label}
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

export default RankByFilter;
