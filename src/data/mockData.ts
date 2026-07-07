import type {
  AffectedVariable,
  ActivityEntry,
  FieldGroupFilter,
  FieldGroupName,
  PlantField,
  PlantRecord,
  RecordStatus,
  RiskLevel,
  StatusFilter,
} from "../types";

export const OEKOBIT_LOGO_URL =
  "https://www.oekobit-biogas.com/wp-content/uploads/20231109_oekobitbiogas_logo_compact_rgb.png";

export const plantOptions = ["Plant 01", "Plant 02", "Plant 03"];
export const dateOptions = ["Today", "Last 7 days", "June 2026", "Q2 2026"];

export const fieldGroupOptions: FieldGroupFilter[] = [
  "All",
  "Plant Identification",
  "Feedstock and Substrate",
  "Anaerobic Digestion Process",
  "Gas Production and Gas Quality",
  "Equipment and Operations",
  "Context",
  "Rule-Based Monitoring",
  "AI Anomaly Detection",
];

export const statusFilterOptions: StatusFilter[] = [
  "All",
  "Normal records",
  "Warning records",
  "Critical records",
  "Anomaly records",
  "Expert review required",
];

export const fieldGroupDescriptions: Record<FieldGroupName, string> = {
  "Plant Identification": "Plant and time metadata used to compare readings across reporting periods.",
  "Feedstock and Substrate": "Input volume and substrate composition values that influence digestion stability.",
  "Anaerobic Digestion Process": "Biological process indicators used to detect instability before production drops.",
  "Gas Production and Gas Quality": "Output quality and energy-value signals from the biogas process.",
  "Equipment and Operations": "Operational workload and predictive maintenance indicators.",
  Context: "Weather, season, and maintenance context used to interpret thresholds.",
  "Rule-Based Monitoring": "Backend rule results that provide transparent threshold-based monitoring.",
  "AI Anomaly Detection": "Isolation Forest outputs used to prioritize expert validation.",
};

export const activePlantRecord: PlantRecord = {
  plantId: "Plant 01",
  date: "2026-07-07",
  reportingPeriod: "Last 7 days",
  currentPlantStatus: "Anomaly",
  riskLevel: "Critical",
  anomalyScore: 0.82,
  anomalyStatus: "Anomaly",
  expertReviewRequired: true,
  possibleIssueCategory: "Biological instability and equipment maintenance risk",
};

export const plantFields: PlantField[] = [
  {
    key: "date",
    value: activePlantRecord.date,
    status: "Normal",
    group: "Plant Identification",
    description: "Timestamp for the current monitoring snapshot.",
  },
  {
    key: "plant_id",
    value: activePlantRecord.plantId,
    status: "Normal",
    group: "Plant Identification",
    description: "Selected biogas plant in the dummy monitoring dataset.",
  },
  {
    key: "day_number",
    value: 188,
    status: "Normal",
    group: "Plant Identification",
    description: "Sequential day number for trend plotting and filtering.",
  },
  {
    key: "feedstock_type",
    value: "Mixed",
    status: "Normal",
    group: "Feedstock and Substrate",
    description: "Human-readable input material label used for dashboard interpretation.",
  },
  {
    key: "feedstock_input_tons",
    value: "132 t/day",
    expected: "120 t/day",
    change: "+10.0%",
    status: "Warning",
    group: "Feedstock and Substrate",
    description: "Higher feedstock input can overload digestion if gas conversion falls.",
    trend: [58, 59, 60, 63, 67, 70, 73],
  },
  {
    key: "carbohydrate_percent",
    value: "48%",
    expected: "38%",
    change: "+10 pp",
    status: "Warning",
    group: "Feedstock and Substrate",
    description: "High carbohydrate share can contribute to acidification when pH drops.",
    trend: [42, 43, 46, 49, 53, 56, 59],
  },
  {
    key: "protein_percent",
    value: "19%",
    expected: "24%",
    change: "-5 pp",
    status: "Normal",
    group: "Feedstock and Substrate",
    description: "Protein share is below mix target but not the primary current anomaly driver.",
    trend: [60, 58, 57, 55, 52, 50, 49],
  },
  {
    key: "fat_percent",
    value: "33%",
    expected: "28%",
    change: "+5 pp",
    status: "Warning",
    group: "Feedstock and Substrate",
    description: "Higher fat share can slow degradation and create overload risk.",
    trend: [48, 49, 50, 52, 55, 57, 58],
  },
  {
    key: "ph_value",
    value: "6.42",
    expected: "6.8-7.5",
    change: "-0.63",
    status: "Critical",
    group: "Anaerobic Digestion Process",
    description: "pH is below the normal methanogenesis range and drives acidification risk.",
    trend: [68, 66, 62, 58, 51, 45, 39],
    expertReviewRequired: true,
  },
  {
    key: "temperature_c",
    value: "41.9 °C",
    expected: "39.5 °C",
    change: "+2.4 °C",
    status: "Warning",
    group: "Anaerobic Digestion Process",
    description: "Temperature is above target and may amplify biological stress.",
    trend: [52, 53, 54, 57, 60, 62, 64],
  },
  {
    key: "oxygen_percent",
    value: "0.18%",
    expected: "0.00-0.20%",
    change: "+0.08 pp",
    status: "Warning",
    group: "Anaerobic Digestion Process",
    description: "Anaerobic digestion requires very low oxygen; this value is close to the upper range.",
    trend: [22, 24, 25, 31, 38, 45, 52],
  },
  {
    key: "retention_time_days",
    value: "22 days",
    expected: "20-40 days",
    change: "-8 days",
    status: "Warning",
    group: "Anaerobic Digestion Process",
    description: "Shorter retention time can reduce substrate conversion and process stability.",
    trend: [70, 68, 64, 61, 58, 54, 50],
  },
  {
    key: "organic_loading_rate",
    value: "5.6 kg VS/m3 day",
    expected: "1.5-5.0 kg VS/m3 day",
    change: "+60.0%",
    status: "Critical",
    group: "Anaerobic Digestion Process",
    description: "Organic loading is above the safe dummy range, suggesting overfeeding risk.",
    trend: [47, 49, 54, 60, 67, 73, 79],
    expertReviewRequired: true,
  },
  {
    key: "gas_flow_m3_h",
    value: "430 m3/h",
    expected: "400-650 m3/h",
    change: "-23.2%",
    status: "Anomaly",
    group: "Gas Production and Gas Quality",
    description: "Gas flow dropped while input and loading increased, which is unusual.",
    trend: [86, 88, 83, 79, 76, 72, 70],
    expertReviewRequired: true,
  },
  {
    key: "methane_percent",
    value: "53.8%",
    expected: "52-65%",
    change: "-4.7 pp",
    status: "Anomaly",
    group: "Gas Production and Gas Quality",
    description: "Methane percentage has dropped alongside low pH, indicating possible acidification.",
    trend: [74, 73, 72, 70, 67, 64, 63],
    expertReviewRequired: true,
  },
  {
    key: "co2_percent",
    value: "44.8%",
    expected: "32-45%",
    change: "+6.8 pp",
    status: "Warning",
    group: "Gas Production and Gas Quality",
    description: "CO2 is near the high end of the dummy gas-quality range.",
    trend: [44, 45, 47, 51, 56, 60, 63],
  },
  {
    key: "h2s_ppm",
    value: "890 ppm",
    expected: "200-800 ppm",
    change: "+78.0%",
    status: "Critical",
    group: "Gas Production and Gas Quality",
    description: "High H2S can indicate gas quality and corrosion risk.",
    trend: [35, 38, 42, 49, 58, 67, 74],
    expertReviewRequired: true,
  },
  {
    key: "biogas_yield_m3_per_ton",
    value: "78.2 m3/ton",
    change: "-18.0%",
    status: "Warning",
    group: "Gas Production and Gas Quality",
    description: "Calculated gas yield indicates weaker conversion efficiency.",
    trend: [72, 70, 68, 64, 60, 56, 52],
  },
  {
    key: "pressure_bar",
    value: "1.84 bar",
    expected: "1.0-1.5 bar",
    change: "+36.3%",
    status: "Critical",
    group: "Equipment and Operations",
    description: "Pressure is above the normal dummy range and requires validation.",
    trend: [47, 49, 52, 57, 63, 70, 77],
    expertReviewRequired: true,
  },
  {
    key: "mixing_speed_rpm",
    value: "18 RPM",
    expected: "10-50 RPM",
    change: "-14 RPM",
    status: "Warning",
    group: "Equipment and Operations",
    description: "Low mixing speed can worsen substrate imbalance.",
    trend: [69, 67, 64, 59, 55, 51, 48],
  },
  {
    key: "pump_runtime_hours",
    value: "23.5 hours",
    expected: "8-24 hours",
    change: "+7.5 h",
    status: "Warning",
    group: "Equipment and Operations",
    description: "High runtime indicates elevated equipment workload.",
    trend: [54, 56, 59, 62, 66, 70, 73],
  },
  {
    key: "compressor_vibration_mm_s",
    value: "6.4 mm/s",
    expected: "1-5 mm/s",
    change: "+100.0%",
    status: "Critical",
    group: "Equipment and Operations",
    description: "Vibration above range is a predictive maintenance signal.",
    trend: [37, 39, 44, 52, 61, 70, 80],
    expertReviewRequired: true,
  },
  {
    key: "outside_temperature_c",
    value: "4 °C",
    expected: "12 °C",
    change: "-8 °C",
    status: "Normal",
    group: "Context",
    description: "Weather context explains seasonal operating conditions.",
    trend: [56, 54, 51, 48, 45, 43, 41],
  },
  {
    key: "season",
    value: "Winter",
    status: "Normal",
    group: "Context",
    description: "Seasonal context helps explain threshold differences.",
  },
  {
    key: "maintenance_status",
    value: "Overdue",
    status: "Warning",
    group: "Context",
    description: "Maintenance context supports interpretation of equipment anomalies.",
  },
  {
    key: "ph_alert",
    value: "Critical",
    status: "Critical",
    group: "Rule-Based Monitoring",
    description: "Rule-based pH threshold indicates biological instability.",
  },
  {
    key: "temperature_alert",
    value: "Warning",
    status: "Warning",
    group: "Rule-Based Monitoring",
    description: "Temperature is above target but not the highest risk factor.",
  },
  {
    key: "oxygen_alert",
    value: "Warning",
    status: "Warning",
    group: "Rule-Based Monitoring",
    description: "Oxygen remains within range but close to the upper threshold.",
  },
  {
    key: "methane_alert",
    value: "Low methane",
    status: "Anomaly",
    group: "Rule-Based Monitoring",
    description: "Methane drop is consistent with the AI anomaly explanation.",
    expertReviewRequired: true,
  },
  {
    key: "h2s_alert",
    value: "Gas quality warning",
    status: "Critical",
    group: "Rule-Based Monitoring",
    description: "H2S is above the dummy threshold and should be checked.",
    expertReviewRequired: true,
  },
  {
    key: "maintenance_alert",
    value: "Check compressor",
    status: "Critical",
    group: "Rule-Based Monitoring",
    description: "Compressor vibration and overdue maintenance require expert review.",
    expertReviewRequired: true,
  },
  {
    key: "overall_rule_status",
    value: "Critical",
    status: "Critical",
    group: "Rule-Based Monitoring",
    description: "Rule-based monitoring routes the current case into critical review.",
  },
  {
    key: "anomaly_score",
    value: activePlantRecord.anomalyScore.toFixed(2),
    status: "Anomaly",
    group: "AI Anomaly Detection",
    description: "Isolation Forest score showing how unusual the current pattern is.",
    expertReviewRequired: true,
  },
  {
    key: "anomaly_flag",
    value: activePlantRecord.anomalyStatus,
    status: "Anomaly",
    group: "AI Anomaly Detection",
    description: "AI model result for the current monitoring window.",
    expertReviewRequired: true,
  },
  {
    key: "expert_review_required",
    value: activePlantRecord.expertReviewRequired,
    status: "Anomaly",
    group: "AI Anomaly Detection",
    description: "Human validation is required before operator escalation.",
    expertReviewRequired: true,
  },
  {
    key: "possible_issue_category",
    value: activePlantRecord.possibleIssueCategory,
    status: "Anomaly",
    group: "AI Anomaly Detection",
    description: "AI-generated issue category prepared for expert review.",
    expertReviewRequired: true,
  },
];

const riskFromStatus: Record<RecordStatus, RiskLevel> = {
  Normal: "Low",
  Warning: "Medium",
  Critical: "Critical",
  Anomaly: "High",
};

export const affectedVariables: AffectedVariable[] = plantFields
  .filter((field) => field.trend)
  .map((field) => ({
    name: field.key,
    current: String(field.value ?? "-"),
    expected: field.expected && field.expected.toLowerCase() !== "not available" ? field.expected : "-",
    change: field.change ?? "-",
    status: field.status,
    description: field.description,
    risk: riskFromStatus[field.status],
    recordStatus: field.status,
    group: field.group,
    expertReviewRequired: field.expertReviewRequired,
    trend: field.trend ?? [50, 50, 50, 50],
  }));

export const kpis = [
  { label: "Current Plant Status", value: "Anomaly", detail: "Expert review required", tone: "critical" },
  { label: "Anomaly Score", value: "0.82", detail: "Isolation Forest output", tone: "warning" },
  { label: "Rule Alerts", value: "6", detail: "3 critical, 3 warning", tone: "info" },
  { label: "Reports Ready", value: "4", detail: "Anomaly, monthly, customer, summary", tone: "success" },
];

export const processFlows = [
  {
    title: "AI Anomaly Detection",
    metric: "0.82 score",
    ai: "Runs anomaly detection on numerical process, gas quality, and equipment variables.",
    expert: "Validates whether the alert is operationally meaningful or a false alarm.",
    action: "Operator monitors, adjusts process, requests maintenance, or documents no action.",
  },
  {
    title: "Expert Reporting",
    metric: "4 report types",
    ai: "Structures plant status, rule alerts, anomaly results, and workflow evidence.",
    expert: "Interprets the draft and signs off before customer or professor delivery.",
    action: "Report is downloaded or printed with traceable human decision context.",
  },
  {
    title: "Learning Feedback",
    metric: "Closed loop",
    ai: "Stores false alarms, relevant risks, actions, and outcomes as learning data.",
    expert: "Confirms which alerts should influence future model and rule tuning.",
    action: "Dashboard and reports reflect the documented outcome.",
  },
];

export const riskLevels: RiskLevel[] = ["Low", "Medium", "High", "Critical"];

export const aiExplanation =
  "pH is below the normal range while methane percentage and gas flow have dropped. At the same time, organic loading, pressure, H2S, and compressor vibration are elevated. This may indicate biological instability or acidification risk combined with equipment stress.";

export const recommendedAction =
  "Pause additional feedstock increases, verify pH and methane readings, inspect gas line pressure, check compressor vibration, and route the alert to an OEKOBIT expert before the operator decides on process adjustment or maintenance.";

export const baseActivity: ActivityEntry[] = [
  {
    step: "Plant data received",
    owner: "Plant",
    time: "08:10",
    detail: "Latest sensor packet from Plant 01 was collected for the dashboard.",
    state: "Complete",
  },
  {
    step: "Data quality validated",
    owner: "System",
    time: "08:11",
    detail: "Smart/control validation confirmed usable data for the current monitoring window.",
    state: "Complete",
  },
  {
    step: "AI detected anomaly",
    owner: "AI",
    time: "08:12",
    detail: "pH Value, Methane, Gas Flow, Pressure, and Compressor Vibration matched an anomaly pattern.",
    state: "Complete",
  },
  {
    step: "Alert generated",
    owner: "AI",
    time: "08:13",
    detail: "Critical anomaly alert created with an Isolation Forest score of 0.82.",
    state: "Complete",
  },
  {
    step: "Expert validation pending",
    owner: "Expert",
    time: "08:18",
    detail: "OEKOBIT expert review is required before operator escalation.",
    state: "Current",
  },
  {
    step: "Operator decision required",
    owner: "Operator",
    time: "Waiting",
    detail: "Operational action remains with the plant operator after expert review.",
    state: "Waiting",
  },
  {
    step: "Outcome documented",
    owner: "System",
    time: "Waiting",
    detail: "Decision, action, and outcome will be stored as learning data and included in the report.",
    state: "Waiting",
  },
];

export const workflowSections = [
  {
    section: "A. Data Collection",
    steps: [
      {
        title: "Plant/data source collects plant data",
        detail: "Sensor and operational values from Plant 01 are collected for the selected reporting period.",
      },
      {
        title: "Selected plant and period are attached",
        detail: "Plant ID, date, and day number provide traceability for trends and reports.",
      },
    ],
  },
  {
    section: "B. Data Validation",
    steps: [
      {
        title: "Smart/control system validates data quality",
        detail: "Missing, stale, or impossible sensor values are checked before AI analysis.",
      },
      {
        title: "If data is not usable, flag data issue",
        detail: "The dashboard requests sensor review instead of generating misleading AI output.",
      },
      {
        title: "If data is usable, update dashboard",
        detail: "Validated plant readings update KPI cards, rule alerts, and trend panels.",
      },
    ],
  },
  {
    section: "C. AI Anomaly Detection",
    steps: [
      {
        title: "AI layer runs anomaly detection",
        detail: "Isolation Forest scores numerical plant, process, gas quality, and equipment inputs.",
      },
      {
        title: "AI calculates anomaly score",
        detail: "The current score is 0.82, which is treated as an anomaly in this PoC.",
      },
      {
        title: "If anomaly detected, generate alert",
        detail: "A critical alert is created with an explanation in human language.",
      },
      {
        title: "Prepare AI explanation",
        detail: "The dashboard explains the link between low pH, methane drop, gas flow decline, and equipment stress.",
      },
    ],
  },
  {
    section: "D. Expert Review",
    steps: [
      {
        title: "Expert reviews alert",
        detail: "OEKOBIT experts validate whether the AI result is a real operational risk.",
      },
      {
        title: "If false alarm, log feedback",
        detail: "False alarms are marked and stored as learning feedback for future tuning.",
      },
      {
        title: "If relevant risk, create recommendation",
        detail: "The expert prepares a recommendation before the operator decides.",
      },
    ],
  },
  {
    section: "E. Operator Action",
    steps: [
      {
        title: "Operator decides action",
        detail: "The plant operator remains responsible for process and maintenance decisions.",
      },
      {
        title: "If action taken, document action and outcome",
        detail: "Process adjustment or maintenance request is recorded in the activity log.",
      },
      {
        title: "If no action taken, monitor situation",
        detail: "The dashboard keeps monitoring the same variables and risk level.",
      },
    ],
  },
  {
    section: "F. Learning and Reporting",
    steps: [
      {
        title: "Store outcome as learning data",
        detail: "Confirmed risks, false alarms, actions, and outcomes become structured feedback.",
      },
      {
        title: "Update report and document outcome",
        detail: "The professional report includes the workflow, expert review, operator action, and learning feedback.",
      },
    ],
  },
];

export const reportTypes = [
  "Anomaly Detection Report",
  "Monthly Expert Reporting Report",
  "Customer Status Update Report",
  "Full SMARTCONTROL PoC Summary Report",
];

export const anomalyBpmnSteps = [
  { title: "Plant operation running", detail: "The biogas plant continues normal operation while process data is collected." },
  { title: "Collect plant data", detail: "Process, gas quality, equipment, and context signals are collected from the plant." },
  { title: "Validate data quality", detail: "Smart/control checks whether sensor values are complete, current, and plausible." },
  { title: "Decision: Data usable?", detail: "No: flag data issue, request sensor review, and document it. Yes: update the live dashboard." },
  { title: "Run anomaly detection", detail: "The AI model scores the validated monitoring window." },
  { title: "Decision: Anomaly detected?", detail: "No: show normal status and update dashboard/report. Yes: generate alert and prepare AI explanation." },
  { title: "Expert reviews alert", detail: "An OEKOBIT expert validates whether the AI alert is a relevant operational risk." },
  { title: "Decision: Relevant risk?", detail: "No: mark as false alarm and log feedback. Yes: create a recommendation." },
  { title: "Operator decides action", detail: "The plant operator decides whether to monitor, adjust process, or request maintenance." },
  { title: "Outcome documented", detail: "Action, no action, learning feedback, dashboard update, and report update are stored." },
];

export const monthlyReportingBpmnSteps = [
  { title: "Reporting period ends", detail: "The monthly reporting cycle starts for the selected plant and period." },
  { title: "Confirm report scope", detail: "The plant operator confirms which plant, period, and scope should be included." },
  { title: "Collect plant and SCADA data", detail: "Dashboard data, alerts, validated anomalies, operator decisions, and outcomes are collected." },
  { title: "Validate data quality", detail: "Data completeness and plausibility are checked before KPI calculation." },
  { title: "Decision: Data complete?", detail: "No: add missing information and return to validation. Yes: calculate KPIs." },
  { title: "Generate draft report", detail: "AI drafts the report structure and prepares sections for expert interpretation." },
  { title: "Decision: Risk or anomaly?", detail: "Yes: create correction task. No: continue with flagged issue review." },
  { title: "Expert reviews flagged issues", detail: "OEKOBIT expert reviews anomalies, recommendations, and missing context." },
  { title: "Decision: Expert sign-off?", detail: "No: return to correction or missing info. Yes: approve release." },
  { title: "Submit and archive", detail: "Lock final report, submit externally, archive audit trail, and mark report submitted." },
];

export const customerStatusBpmnSteps = [
  { title: "Collect lifecycle data", detail: "Sensor data, component runtime, maintenance history, and schedule are collected." },
  { title: "Validate data quality", detail: "Smart/control checks whether lifecycle and maintenance data are usable." },
  { title: "Decision: Data usable?", detail: "No: flag and log data issue. Yes: update dashboard." },
  { title: "Calculate maintenance status", detail: "Component lifetime, runtime, and maintenance status are calculated." },
  { title: "Decision: Update due?", detail: "No: continue monitoring. Yes: trigger the update process." },
  { title: "AI predicts wear risk", detail: "The AI layer predicts wear risk or lifecycle alert conditions." },
  { title: "Decision: Lifecycle alert?", detail: "No: assess plant status and draft status update. Yes: generate lifecycle alert for expert review." },
  { title: "Decision: Repair needed?", detail: "No: monitor next cycle. Yes: send maintenance notification." },
  { title: "Expert approves update", detail: "Expert reviews draft; rejected drafts are revised and resubmitted." },
  { title: "Customer action and learning", detail: "Send update, receive operator action, log communication, update lifecycle record, store learning data, and document outcome." },
];

export const monthlySources = [
  "Dashboard data",
  "Rule-based alerts",
  "Validated anomalies",
  "Expert review status",
  "Operator decisions",
  "Documented outcomes",
];

export const communicationLog = [
  {
    customer: "Professor demonstration",
    trigger: "Full SMARTCONTROL PoC Summary Report",
    risk: "Low",
    decision: "Ready to print",
    time: "Jul 07, 09:00",
  },
  {
    customer: "OEKOBIT expert review",
    trigger: "Critical anomaly follow-up",
    risk: "Critical",
    decision: "Expert review required",
    time: "Jul 07, 08:18",
  },
  {
    customer: "Plant operator",
    trigger: "Operator decision request",
    risk: "High",
    decision: "Pending",
    time: "Jul 07, 08:20",
  },
];

export const responsibleAiCards = [
  {
    title: "Data quality",
    text: "AI output depends on complete, current, reliable plant data before detection or reporting is trusted.",
  },
  {
    title: "Human oversight",
    text: "Experts validate anomalies and reports when the output affects operations or customer interpretation.",
  },
  {
    title: "Accountability",
    text: "Operators make final operational decisions and every decision is documented in the activity record.",
  },
  {
    title: "Transparency",
    text: "AI recommendations explain which variables, thresholds, and patterns influenced the result.",
  },
  {
    title: "Cybersecurity",
    text: "Dashboard analytics stay separate from direct operational plant control and automation commands.",
  },
  {
    title: "GDPR / data protection",
    text: "Customer and plant data require role-based access, consent rules, and careful retention policies.",
  },
  {
    title: "Trust and adoption",
    text: "Operators need to understand why an alert or report was generated before relying on it.",
  },
];
