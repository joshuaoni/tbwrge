import {
  createJobScreens,
  INITIAL_CREATE_JOB_FORM_DATA,
  INITIAL_HIRING_FLOW_STATE,
} from "@/constants/create-job.constant";
import {
  ICreateJobContext,
  ICreateJobFormDataKey,
  ICreateJobScreen,
} from "@/interfaces/create-job";
import { createContext, useEffect, useMemo, useState } from "react";

export const CreateJobContext = createContext<ICreateJobContext>({
  goTo: () => {},
  nextScreen: () => {},
  prevScreen: () => {},
  formData: INITIAL_CREATE_JOB_FORM_DATA,
  setFormData: () => {},
  hiringFlow: INITIAL_HIRING_FLOW_STATE,
  setHiringFlow: () => {},
});

export function CreateJobProvider(props: { query: URLSearchParams }) {
  const [screen, setScreen] = useState<ICreateJobScreen>(
    Object.keys(createJobScreens)[0] as ICreateJobScreen
  );
  const [formData, setForm] = useState(INITIAL_CREATE_JOB_FORM_DATA);
  const [hiringFlow, setHiringFlow] = useState(INITIAL_HIRING_FLOW_STATE);

  useEffect(() => {
    const step = props.query.get("step");
    if (step && step in createJobScreens) {
      setScreen(step as ICreateJobScreen);
    }
  }, [props.query]);

  function nextScreen() {
    const screens = Object.keys(createJobScreens);
    const currentIndex = screens.indexOf(screen);
    if (currentIndex < screens.length - 1) {
      setScreen(screens[currentIndex + 1] as ICreateJobScreen);
    }
  }

  function prevScreen() {
    const screens = Object.keys(createJobScreens);
    const currentIndex = screens.indexOf(screen);
    if (currentIndex > 0) {
      setScreen(screens[currentIndex - 1] as ICreateJobScreen);
    }
  }

  function setFormData(key: ICreateJobFormDataKey, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const value = {
    goTo: setScreen,
    nextScreen,
    prevScreen,
    formData,
    setFormData,
    hiringFlow,
    setHiringFlow,
  } satisfies ICreateJobContext;

  const Screen = useMemo(() => createJobScreens[screen], [screen]);

  return (
    <CreateJobContext.Provider value={value}>
      <Screen />
    </CreateJobContext.Provider>
  );
}
