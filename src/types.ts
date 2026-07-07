export type PageKey =
  | "overview"
  | "anomaly"
  | "reporting"
  | "updates"
  | "responsible";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export type ExpertStatus =
  | "Pending Review"
  | "Validated by Expert"
  | "Rejected / False Alarm"
  | "Escalated to Operator";

export type OperatorDecision =
  | "Monitor"
  | "Adjust process"
  | "Request maintenance"
  | "Ignore after review";

export interface AffectedVariable {
  name: string;
  current: string;
  expected: string;
  change: string;
  status: string;
  risk: RiskLevel;
  trend: number[];
}

export interface ActivityEntry {
  step: string;
  owner: "Plant" | "AI" | "Expert" | "Operator" | "System";
  time: string;
  detail: string;
  state: "Complete" | "Current" | "Waiting";
}
