import type { FieldGroupFilter, PlantField, StatusFilter } from "../types";

const FIELD_LABELS: Record<string, string> = {
  date: "Date",
  plant_id: "Plant ID",
  day_number: "Day Number",
  feedstock_type: "Feedstock Type",
  feedstock_input_tons: "Feedstock Input (tons)",
  carbohydrate_percent: "Carbohydrate (%)",
  protein_percent: "Protein (%)",
  fat_percent: "Fat (%)",
  ph_value: "pH Value",
  temperature_c: "Temperature (°C)",
  oxygen_percent: "Oxygen (%)",
  retention_time_days: "Retention Time (days)",
  organic_loading_rate: "Organic Loading Rate",
  gas_flow_m3_h: "Gas Flow (m³/h)",
  methane_percent: "Methane (%)",
  co2_percent: "CO₂ (%)",
  h2s_ppm: "H₂S (ppm)",
  biogas_yield_m3_per_ton: "Biogas Yield (m³/ton)",
  pressure_bar: "Pressure (bar)",
  mixing_speed_rpm: "Mixing Speed (RPM)",
  pump_runtime_hours: "Pump Runtime (hours)",
  compressor_vibration_mm_s: "Compressor Vibration (mm/s)",
  outside_temperature_c: "Outside Temperature (°C)",
  season: "Season",
  maintenance_status: "Maintenance Status",
  ph_alert: "pH Alert",
  temperature_alert: "Temperature Alert",
  oxygen_alert: "Oxygen Alert",
  methane_alert: "Methane Alert",
  h2s_alert: "H₂S Alert",
  maintenance_alert: "Maintenance Alert",
  overall_rule_status: "Overall Rule Status",
  anomaly_score: "Anomaly Score",
  anomaly_flag: "Anomaly Status",
  expert_review_required: "Expert Review Required",
  possible_issue_category: "Possible Issue Category",
};

export function formatFieldName(key: string) {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];

  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bPh\b/g, "pH")
    .replace(/\bCo2\b/g, "CO2")
    .replace(/\bH2s\b/g, "H2S");
}

export function displayValue(value: PlantField["value"]) {
  if (value === null || value === undefined || value === "") return "Not available";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export function matchesFieldGroup(field: PlantField, selectedGroup: FieldGroupFilter) {
  return selectedGroup === "All" || field.group === selectedGroup;
}

export function matchesStatusFilter(field: PlantField, selectedStatus: StatusFilter) {
  if (selectedStatus === "All") return true;
  if (selectedStatus === "Expert review required") return field.expertReviewRequired === true;
  if (selectedStatus === "Normal records") return field.status === "Normal";
  if (selectedStatus === "Warning records") return field.status === "Warning";
  if (selectedStatus === "Critical records") return field.status === "Critical";
  if (selectedStatus === "Anomaly records") return field.status === "Anomaly";
  return true;
}
