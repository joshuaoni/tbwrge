export interface MetricCardProps extends IMetric {}

export type VettingResponse = { metrics: IMetric[] }[];

export interface IMetric {
  Metric: string;
  Score: number;
  Recommendation: string;
  name: string;
}
