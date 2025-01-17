import { forwardRef } from "react";
import { CoverLetterProps } from "./generator.interface";

const CoverLetter = forwardRef<HTMLDivElement, CoverLetterProps>(
  (props, ref) => {
    const lines = props.letter.split("\n");

    return (
      <div ref={ref}>
        <h3 className="text-xl font-bold text-center">{props.name}</h3>
        <p>
          {lines.map((line, index) => {
            // Trim the line to remove excess whitespace
            const trimmedLine = line.trim();

            // Skip empty lines
            if (!trimmedLine) {
              return <br key={index} />; // Add a break for extra spacing
            }

            // Check for specific placeholders to apply special styles
            if (trimmedLine.startsWith("[") && trimmedLine.endsWith("]")) {
              return (
                <h4 key={index} className="font-bold my-2.5">
                  {trimmedLine}
                </h4>
              );
            }

            // Render the rest as normal paragraphs
            return <p key={index}>{trimmedLine}</p>;
          })}
        </p>
      </div>
    );
  }
);

export default CoverLetter;
