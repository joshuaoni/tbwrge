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
import { useTranslation } from "react-i18next";

const LanguageSelectorDropDown = ({
  onSelect,
  value,
  outputLanguage,
  setValue,
  fullPageTranslation = false,
}: {
  onSelect?: (value: string) => void;
  value?: string;
  setValue?: (value: string) => void;
  outputLanguage?: boolean;
  fullPageTranslation?: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState(() => {
    if (fullPageTranslation) {
      const languageMap: Record<string, string> = {
        en: t("language.english"),
        fr: t("language.french"),
        es: t("language.spanish"),
        de: t("language.german"),
        ar: t("language.arabic"),
        pt: t("language.portuguese"),
      };
      return languageMap[i18n.language] || t("language.english");
    }
    return "English";
  });

  const languages = fullPageTranslation
    ? [
        { code: "en", name: t("language.english") },
        { code: "fr", name: t("language.french") },
        { code: "es", name: t("language.spanish") },
        { code: "de", name: t("language.german") },
        { code: "ar", name: t("language.arabic") },
        { code: "pt", name: t("language.portuguese") },
      ]
    : ["English", "French", "Spanish", "German", "Arabic", "Portugese"];

  const handleLanguageSelect = (
    selectedLanguage: string | { code: string; name: string }
  ) => {
    if (fullPageTranslation && typeof selectedLanguage === "object") {
      i18n.changeLanguage(selectedLanguage.code);
      setLanguage(selectedLanguage.name);
      onSelect?.(selectedLanguage.code);
    } else if (!fullPageTranslation && typeof selectedLanguage === "string") {
      setValue?.(selectedLanguage === value ? "" : selectedLanguage);
      onSelect?.(selectedLanguage);
      setLanguage(selectedLanguage);
    }
    setOpen(false);
  };

  React.useEffect(() => {
    if (fullPageTranslation) {
      const languageMap: Record<string, string> = {
        en: t("language.english"),
        fr: t("language.french"),
        es: t("language.spanish"),
        de: t("language.german"),
        ar: t("language.arabic"),
        pt: t("language.portuguese"),
      };
      setLanguage(languageMap[i18n.language] || t("language.english"));
    }
  }, [i18n.language, t, fullPageTranslation]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="bg-white border border-lightgreen px-4 flex items-center justify-between space-x-12 py-3 rounded-md cursor-pointer outline-none"
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
            placeholder={
              fullPageTranslation
                ? t("language.selectLanguage")
                : t("language.searchLanguage")
            }
            className="h-11 px-4 border-b border-gray-100"
          />
          <CommandGroup className="max-h-[200px] overflow-y-auto py-2">
            {fullPageTranslation
              ? (languages as Array<{ code: string; name: string }>).map(
                  (lang) => (
                    <CommandItem
                      key={lang.code}
                      value={lang.name}
                      onSelect={() => handleLanguageSelect(lang)}
                      className="px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer data-[selected=true]:bg-emerald-50 data-[selected=true]:text-emerald-800 transition-colors flex items-center gap-2"
                    >
                      <Check
                        className={cn(
                          "h-4 w-4",
                          i18n.language === lang.code
                            ? "text-emerald-600"
                            : "opacity-0"
                        )}
                      />
                      <span>{lang.name}</span>
                    </CommandItem>
                  )
                )
              : (languages as string[]).map((language) => (
                  <CommandItem
                    key={language}
                    value={language}
                    onSelect={() => handleLanguageSelect(language)}
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
