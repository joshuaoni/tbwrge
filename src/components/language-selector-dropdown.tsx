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
import translateImage from "../../public/images/translate.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

const LanguageSelectorDropDown = ({
  onSelect,
  value,
  outputLanguage,
  setValue,
}: {
  onSelect?: (value: string) => void;
  value?: string;
  setValue?: (value: string) => void;
  outputLanguage?: boolean;
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
        className="p-0 bg-white w-[200px] shadow-lg border border-gray-100 rounded-lg overflow-hidden"
      >
        <Command className="bg-white">
          <CommandInput
            placeholder="Search language..."
            className="h-11 px-4 border-b border-gray-100"
          />
          <CommandGroup className="max-h-[200px] overflow-y-auto py-2">
            {languages.map((language) => (
              <CommandItem
                key={language}
                value={language}
                onSelect={(currentValue) => {
                  setValue?.(currentValue === value ? "" : currentValue);
                  onSelect?.(language);
                  setOpen(false);
                  setLanguage(language);
                }}
                className="px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer data-[selected=true]:bg-emerald-50 data-[selected=true]:text-emerald-800 transition-colors flex items-center gap-2"
              >
                <Check
                  className={cn(
                    "h-4 w-4",
                    language === value ? "text-emerald-600" : "opacity-0"
                  )}
                />
                <span>{language}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelectorDropDown;
