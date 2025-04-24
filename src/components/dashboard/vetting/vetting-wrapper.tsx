import classNames from "classnames";
import { useState } from "react";

import { VettingResponse } from "@/interfaces/vetting.interface";
import MetricCard from "./metric-card";
import { outfit } from "@/constants/app";

function VettingWrapper({
  files,
  vets,
}: {
  files: File[];
  vets: VettingResponse;
}) {
  console.log({ vets });
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={`${outfit.className}`}>
      {/* <div className="flex items-center gap-6 w-full">
        {vets.map((vet: any, i) => (
          <button
            key={i}
            onClick={() => setTabIndex(i)}
            className={classNames(
              tabIndex === i ? "text-black" : "text-gray-400",
              "font-semibold w-full"
            )}
          >
            {vet.name}
          </button>
        ))}
      </div> */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {vets[tabIndex].metrics.map((item, i) => (
          <MetricCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export default VettingWrapper;
