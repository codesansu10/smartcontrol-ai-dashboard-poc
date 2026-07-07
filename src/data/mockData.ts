import type { AffectedVariable, ActivityEntry, RiskLevel } from "../types";

export const kpis = [
  { label: "Active Anomalies", value: "3", detail: "1 requires expert review", tone: "critical" },
  { label: "High Risk Alerts", value: "1", detail: "Digester B pressure drift", tone: "warning" },
  { label: "Reports Pending Review", value: "2", detail: "June customer packages", tone: "info" },
  { label: "Customer Updates Ready", value: "5", detail: "4 eligible for auto-send", tone: "success" },
];

export const processFlows = [
  {
    title: "AI Anomaly Detection",
    metric: "91% confidence",
    ai: "Detects correlated deviations across numerical Isolation Forest inputs from the dummy dataset.",
    expert: "Validates whether the alert is operationally meaningful or a false alarm.",
    action: "Operator monitors, adjusts process, requests maintenance, or documents no action.",
  },
  {
    title: "Monthly Expert Reporting",
    metric: "2 drafts pending",
    ai: "Collects validated events and structures the monthly draft report.",
    expert: "Interprets the draft, resolves missing information, and approves the narrative.",
    action: "Final customer report is delivered with traceable expert sign-off.",
  },
  {
    title: "Standard Customer Status Updates",
    metric: "4 low-risk sends",
    ai: "Drafts standardized routine updates from current plant and workflow data.",
    expert: "Reviews unclear, medium-risk, or high-risk messages before delivery.",
    action: "Customer receives a concise status update or a reviewed expert message.",
  },
];

export const riskLevels: RiskLevel[] = ["Low", "Medium", "High", "Critical"];

export const affectedVariables: AffectedVariable[] = [
  {
    name: "feedstock_input_tons",
    current: "132 t/day",
    expected: "120 t/day",
    change: "+10.0%",
    status: "Input increased",
    risk: "High",
    trend: [58, 59, 60, 63, 67, 70, 73],
  },
  {
    name: "carbohydrate_percent",
    current: "48%",
    expected: "38%",
    change: "+10 pp",
    status: "High substrate share",
    risk: "Medium",
    trend: [42, 43, 46, 49, 53, 56, 59],
  },
  {
    name: "protein_percent",
    current: "19%",
    expected: "24%",
    change: "-5 pp",
    status: "Below mix target",
    risk: "Low",
    trend: [60, 58, 57, 55, 52, 50, 49],
  },
  {
    name: "fat_percent",
    current: "33%",
    expected: "28%",
    change: "+5 pp",
    status: "Potential overload",
    risk: "Medium",
    trend: [48, 49, 50, 52, 55, 57, 58],
  },
  {
    name: "ph_value",
    current: "6.42",
    expected: "7.05",
    change: "-0.63",
    status: "Acidification risk",
    risk: "Critical",
    trend: [68, 66, 62, 58, 51, 45, 39],
  },
  {
    name: "temperature_c",
    current: "41.9 C",
    expected: "39.5 C",
    change: "+2.4 C",
    status: "Above target",
    risk: "Medium",
    trend: [52, 53, 54, 57, 60, 62, 64],
  },
  {
    name: "oxygen_percent",
    current: "0.18%",
    expected: "0.10%",
    change: "+0.08 pp",
    status: "Anaerobic risk",
    risk: "High",
    trend: [22, 24, 25, 31, 38, 45, 52],
  },
  {
    name: "retention_time_days",
    current: "22 days",
    expected: "30 days",
    change: "-8 days",
    status: "Short retention",
    risk: "Medium",
    trend: [70, 68, 64, 61, 58, 54, 50],
  },
  {
    name: "organic_loading_rate",
    current: "5.6 kg VS/m3 day",
    expected: "3.5 kg VS/m3 day",
    change: "+60.0%",
    status: "Overfeeding risk",
    risk: "Critical",
    trend: [47, 49, 54, 60, 67, 73, 79],
  },
  {
    name: "gas_flow_m3_h",
    current: "430 m3/h",
    expected: "560 m3/h",
    change: "-23.2%",
    status: "Below range",
    risk: "High",
    trend: [86, 88, 83, 79, 76, 72, 70],
  },
  {
    name: "methane_percent",
    current: "53.8%",
    expected: "58.5%",
    change: "-4.7 pp",
    status: "Low methane",
    risk: "High",
    trend: [74, 73, 72, 70, 67, 64, 63],
  },
  {
    name: "co2_percent",
    current: "44.8%",
    expected: "38.0%",
    change: "+6.8 pp",
    status: "Gas quality drift",
    risk: "Medium",
    trend: [44, 45, 47, 51, 56, 60, 63],
  },
  {
    name: "h2s_ppm",
    current: "890 ppm",
    expected: "500 ppm",
    change: "+78.0%",
    status: "Corrosion risk",
    risk: "High",
    trend: [35, 38, 42, 49, 58, 67, 74],
  },
  {
    name: "pressure_bar",
    current: "1.84 bar",
    expected: "1.35 bar",
    change: "+36.3%",
    status: "Rising quickly",
    risk: "Critical",
    trend: [47, 49, 52, 57, 63, 70, 77],
  },
  {
    name: "mixing_speed_rpm",
    current: "18 rpm",
    expected: "32 rpm",
    change: "-14 rpm",
    status: "Low mixing",
    risk: "Medium",
    trend: [69, 67, 64, 59, 55, 51, 48],
  },
  {
    name: "pump_runtime_hours",
    current: "23.5 h",
    expected: "16.0 h",
    change: "+7.5 h",
    status: "High workload",
    risk: "Medium",
    trend: [54, 56, 59, 62, 66, 70, 73],
  },
  {
    name: "compressor_vibration_mm_s",
    current: "6.4 mm/s",
    expected: "3.2 mm/s",
    change: "+100.0%",
    status: "Maintenance signal",
    risk: "Critical",
    trend: [37, 39, 44, 52, 61, 70, 80],
  },
  {
    name: "outside_temperature_c",
    current: "4 C",
    expected: "12 C",
    change: "-8 C",
    status: "Seasonal context",
    risk: "Low",
    trend: [56, 54, 51, 48, 45, 43, 41],
  },
];

export const baseActivity: ActivityEntry[] = [
  {
    step: "Plant data received",
    owner: "Plant",
    time: "08:10",
    detail: "Sensor packet from digester B ingested into dashboard analytics.",
    state: "Complete",
  },
  {
    step: "AI detected anomaly",
    owner: "AI",
    time: "08:12",
    detail: "ph_value, methane_percent, pressure_bar, and compressor_vibration_mm_s matched an anomaly pattern.",
    state: "Complete",
  },
  {
    step: "Alert generated",
    owner: "AI",
    time: "08:13",
    detail: "Critical process deviation alert created with 91% confidence.",
    state: "Complete",
  },
  {
    step: "Expert validation pending",
    owner: "Expert",
    time: "08:18",
    detail: "OEKOBIT expert review is needed before operator escalation.",
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
    detail: "Decision, rationale, and outcome will be attached to the monthly record.",
    state: "Waiting",
  },
];

export const monthlySources = [
  "Dashboard data",
  "Alerts",
  "Validated anomalies",
  "Operator decisions",
  "Outcomes",
];

export const communicationLog = [
  {
    customer: "North Plant Operations",
    trigger: "Weekly low-risk status",
    risk: "Low",
    decision: "Auto-sent",
    time: "Jul 06, 09:00",
  },
  {
    customer: "Bioenergy Site West",
    trigger: "Validated anomaly follow-up",
    risk: "Medium",
    decision: "Routed to expert",
    time: "Jul 05, 16:40",
  },
  {
    customer: "Municipal Digester Group",
    trigger: "Monthly readiness note",
    risk: "Low",
    decision: "Ready to send",
    time: "Jul 05, 11:15",
  },
];

export const responsibleAiCards = [
  {
    title: "Data quality",
    text: "AI output depends on complete, current, reliable plant data before detection or drafting is trusted.",
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
    text: "AI recommendations must explain which variables, thresholds, and patterns influenced the result.",
  },
  {
    title: "Cybersecurity",
    text: "Dashboard analytics remain separate from direct operational plant control and automation commands.",
  },
  {
    title: "GDPR / data protection",
    text: "Customer and plant data require role-based access, consent rules, and careful retention policies.",
  },
  {
    title: "Trust and adoption",
    text: "Operators need to understand why an alert or customer update was generated before relying on it.",
  },
];
