import type { Dispatch, SetStateAction } from "react";

import {
  createJobScreens,
  INITIAL_CREATE_JOB_FORM_DATA,
  INITIAL_HIRING_FLOW_STATE,
} from "@/constants/create-job.constant";

export type ICreateJobScreen = keyof typeof createJobScreens;
export type ICreateJobFormData = typeof INITIAL_CREATE_JOB_FORM_DATA;
export type ICreateJobFormDataKey = keyof typeof INITIAL_CREATE_JOB_FORM_DATA;
export type ICreateJobHiringFlow = typeof INITIAL_HIRING_FLOW_STATE;

export interface ICreateJobContext {
  goTo: Dispatch<SetStateAction<ICreateJobScreen>>;
  nextScreen: () => void;
  prevScreen: () => void;
  formData: ICreateJobFormData;
  setFormData: (key: ICreateJobFormDataKey, value: string) => void;
  hiringFlow: ICreateJobHiringFlow;
  setHiringFlow: Dispatch<SetStateAction<ICreateJobHiringFlow>>;
}
