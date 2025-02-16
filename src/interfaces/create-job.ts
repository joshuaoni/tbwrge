import type { Dispatch, SetStateAction } from "react";

import {
  createJobScreens,
  INITIAL_CREATE_JOB_FORM_DATA,
} from "@/constants/create-job.constant";

export type ICreateJobScreen = keyof typeof createJobScreens;
export type ICreateJobFormData = typeof INITIAL_CREATE_JOB_FORM_DATA;
export type ICreateJobFormDataKey = keyof typeof INITIAL_CREATE_JOB_FORM_DATA;

export interface ICreateJobContext {
  goTo: Dispatch<SetStateAction<ICreateJobScreen>>;
  nextScreen: () => void;
  prevScreen: () => void;
  formData: ICreateJobFormData;
  setFormData: (key: ICreateJobFormDataKey, value: string) => void;
}
