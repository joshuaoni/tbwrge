import React from "react";
import { Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { COUNTRIES } from "@/constants/countries";

const ResidenceDropDown = ({
  onSelect,
}: {
  onSelect?: (value: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="bg-[#EDF2F7] px-4 py-3 rounded-md cursor-pointer border-none outline-none mt-2"
          style={{ position: "relative" }}
        >
          {value
            ? COUNTRIES.find((country) => country.label === value)?.label
            : "Select country..."}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="p-0 bg-white w-full max-h-[200px] overflow-y-scroll z-50"
      >
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup>
            {COUNTRIES.map((country) => (
              <CommandItem
                className="text-black"
                key={country.label}
                value={country.label}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  onSelect?.(country.label);
                  setOpen(false);
                }}
              >
                {country.label === value && (
                  <Check className="mr-2 h-4 w-4" color="#065844" />
                )}
                {country.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ResidenceDropDown;
