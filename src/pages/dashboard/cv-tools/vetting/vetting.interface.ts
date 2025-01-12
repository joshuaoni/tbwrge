export interface MetricCardProps {
  Metric: string;
  Score: number;
  Recommendation: string;
}

export interface VettingResponse {
  0: { metrics: { Metric: string; Score: number; Recommendation: string }[] };
}
