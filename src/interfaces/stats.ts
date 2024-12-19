import { IJob } from "./job";

export interface IStats {
  total_job_posts: number;
  qualified_candidates: number;
  rejected_candidates: number;
  total_applications: number;
  open_jobs: IJob;
  closed_jobs: IJob;
}
