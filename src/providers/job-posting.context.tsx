import { createJobScreens } from "@/constants/create-job.constant";
import { ICreateJobContext, ICreateJobScreen } from "@/interfaces/create-job";
import { createContext, useEffect, useMemo, useState } from "react";

export const CreateJobContext = createContext<ICreateJobContext>({
  goTo: () => {},
});

export function CreateJobProvider(props: { query: URLSearchParams }) {
  const [screen, setScreen] = useState<ICreateJobScreen>(
    Object.keys(createJobScreens)[0] as ICreateJobScreen
  );

  useEffect(() => {
    const step = props.query.get("step");
    if (step && step in createJobScreens) {
      setScreen(step as ICreateJobScreen);
    }
  }, [props.query]);

  const value = { goTo: setScreen } satisfies ICreateJobContext;

  const Screen = useMemo(() => createJobScreens[screen], [screen]);

  return (
    <CreateJobContext.Provider value={value}>
      <Screen />
    </CreateJobContext.Provider>
  );
}
