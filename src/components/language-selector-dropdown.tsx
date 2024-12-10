import React from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { COUNTRIES } from "@/constants/countries";
import translateImage from "../../public/images/translate.png";
import Image from "next/image";

const LanguageSelectorDropDown = ({
  onSelect,
  value,
  outputLanguage,
  setValue,
}: {
  onSelect?: (value: string) => void;
  value: string;
  setValue: (value: string) => void;
  outputLanguage: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("English");
  const languages = [
    "English",
    "French",
    "Spanish",
    "German",
    "Arabic",
    "Portugese",
  ];
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="bg-white  border border-lightgreen px-4 flex items-center justify-between space-x-12 py-3 rounded-md cursor-pointer  outline-none "
          style={{ position: "relative" }}
        >
          {!outputLanguage && (
            <Image
              src={translateImage}
              alt=""
              width={20}
              height={20}
              className="mr-3"
            />
          )}

          {language}

          <ChevronDown className="h-4 w-4 ml-2" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="p-0 bg-white w-full max-h-[200px] overflow-y-scroll z-50"
      >
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandGroup>
            {languages.map((language) => (
              <CommandItem
                className="text-black"
                key={language}
                value={language}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  onSelect?.(language);
                  setOpen(false);
                  setLanguage(language);
                }}
              >
                {language === value && (
                  <Check className="mr-2 h-4 w-4" color="#065844" />
                )}
                {language}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelectorDropDown;
