import type { Dispatch, SetStateAction } from "react";

import { createJobScreens } from "@/constants/create-job.constant";

export type ICreateJobScreen = keyof typeof createJobScreens;

export interface ICreateJobContext {
  goTo: Dispatch<SetStateAction<ICreateJobScreen>>;
}
