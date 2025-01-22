import { twMerge } from "tailwind-merge";

import { CheckBoxSectionWrapperProps } from "@/interfaces/settings.interface";

function CheckBoxSectionWrapper(props: CheckBoxSectionWrapperProps) {
  return (
    <section>
      <h4
        className={twMerge(
          "text-sm font-medium my-4 text-[#4A5568]",
          props.titleClass
        )}
      >
        {props.title}
      </h4>
      <div className="space-y-4">{props.children}</div>
    </section>
  );
}

export default CheckBoxSectionWrapper;
