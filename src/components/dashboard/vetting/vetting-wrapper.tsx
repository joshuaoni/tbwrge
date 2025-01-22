import classNames from "classnames";
import { useState } from "react";

import { VettingResponse } from "@/interfaces/vetting.interface";
import MetricCard from "./metric-card";

function VettingWrapper({
  files,
  vets,
}: {
  files: File[];
  vets: VettingResponse;
}) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="">
      <div className="flex items-center gap-6 w-full overflow-x-scroll">
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
      </div>
      <div className="grid gap-4 mt-4">
        {vets[tabIndex].metrics.map((item, i) => (
          <MetricCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export default VettingWrapper;
