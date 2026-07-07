export type PageKey =
  | "dashboard"
  | "anomaly"
  | "reporting"
  | "updates"
  | "reports"
  | "settings";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export type RecordStatus = "Normal" | "Warning" | "Critical" | "Anomaly";

export type StatusFilter =
  | "All"
  | "Normal records"
  | "Warning records"
  | "Critical records"
  | "Anomaly records"
  | "Expert review required";

export type FieldGroupName =
  | "Plant Identification"
  | "Feedstock and Substrate"
  | "Anaerobic Digestion Process"
  | "Gas Production and Gas Quality"
  | "Equipment and Operations"
  | "Context"
  | "Rule-Based Monitoring"
  | "AI Anomaly Detection";

export type FieldGroupFilter = "All" | FieldGroupName;

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
  status: RecordStatus;
  description?: string;
  risk: RiskLevel;
  recordStatus?: RecordStatus;
  group?: FieldGroupName;
  expertReviewRequired?: boolean;
  trend: number[];
}

export interface PlantField {
  key: string;
  value: string | number | boolean | null | undefined;
  expected?: string;
  change?: string;
  status: RecordStatus;
  group: FieldGroupName;
  description: string;
  trend?: number[];
  expertReviewRequired?: boolean;
}

export interface PlantRecord {
  plantId: string;
  date: string;
  reportingPeriod: string;
  currentPlantStatus: RecordStatus;
  riskLevel: RiskLevel;
  anomalyScore: number;
  anomalyStatus: "Normal" | "Anomaly";
  expertReviewRequired: boolean;
  possibleIssueCategory: string;
}

export interface ActivityEntry {
  step: string;
  owner: "Plant" | "AI" | "Expert" | "Operator" | "System";
  time: string;
  detail: string;
  state: "Complete" | "Current" | "Waiting";
}
