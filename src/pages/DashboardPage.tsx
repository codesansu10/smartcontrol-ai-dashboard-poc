import { AlertTriangle, ArrowRight, BrainCircuit, ClipboardCheck, Gauge, Lightbulb } from "lucide-react";
import { useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import KpiCard from "../components/KpiCard";
import PageHeader from "../components/PageHeader";
import PlantFieldGroups from "../components/PlantFieldGroups";
import ReportActions from "../components/ReportActions";
import StatusBadge from "../components/StatusBadge";
import {
  activePlantRecord,
  aiExplanation,
  kpis,
  plantFields,
  recommendedAction,
} from "../data/mockData";
import type { FieldGroupFilter, StatusFilter } from "../types";
import { displayValue, formatFieldName } from "../utils/formatters";

function DashboardPage({ onOpenAnomaly }: { onOpenAnomaly: () => void }) {
  const [selectedPlant, setSelectedPlant] = useState(activePlantRecord.plantId);
  const [selectedPeriod, setSelectedPeriod] = useState(activePlantRecord.reportingPeriod);
  const [selectedGroup, setSelectedGroup] = useState<FieldGroupFilter>("All");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("All");

  const ruleAlerts = useMemo(
    () => plantFields.filter((field) => field.group === "Rule-Based Monitoring"),
    []
  );

  const reportStatuses = [
    {
      label: "Anomaly Detection Report",
      status: "Expert review pending",
      detail: "Ready after alert validation and operator decision.",
    },
    {
      label: "Monthly Expert Reporting",
      status: "Draft review pending",
      detail: "KPI and issue summary prepared for expert approval.",
    },
    {
      label: "Customer Status Update",
      status: "Ready for review",
      detail: "Customer wording is held while the critical context is active.",
    },
    {
      label: "Last generated / ready to print",
      status: "Jul 07, 09:00",
      detail: "Report package is available for download or print.",
    },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Operational overview"
        title="Live Plant Monitoring Dashboard"
        description="Operational snapshot for the selected plant and reporting period."
      />

      <FilterBar
        selectedPlant={selectedPlant}
        selectedPeriod={selectedPeriod}
        selectedGroup={selectedGroup}
        selectedStatus={selectedStatus}
        onPlantChange={setSelectedPlant}
        onPeriodChange={setSelectedPeriod}
        onGroupChange={setSelectedGroup}
        onStatusChange={setSelectedStatus}
      />

      <section>
        <div className="section-heading">
          <h4>Current Plant Summary</h4>
          <p>Operational snapshot for the selected plant and reporting period.</p>
        </div>
        <div className="summary-strip dashboard-summary-grid">
          <article>
            <Gauge size={20} aria-hidden="true" />
            <span>Selected Plant</span>
            <strong>{selectedPlant}</strong>
          </article>
          <article>
            <ClipboardCheck size={20} aria-hidden="true" />
            <span>Reporting Period</span>
            <strong>{selectedPeriod}</strong>
          </article>
          <article>
            <Gauge size={20} aria-hidden="true" />
            <span>Current Plant Status</span>
            <StatusBadge status={activePlantRecord.currentPlantStatus} />
          </article>
          <article>
            <AlertTriangle size={20} aria-hidden="true" />
            <span>Risk Level</span>
            <strong>{activePlantRecord.riskLevel}</strong>
          </article>
          <article>
            <BrainCircuit size={20} aria-hidden="true" />
            <span>AI Anomaly Summary</span>
            <strong>{activePlantRecord.anomalyStatus}</strong>
          </article>
          <article>
            <ClipboardCheck size={20} aria-hidden="true" />
            <span>Report / Update Status</span>
            <strong>Review pending</strong>
          </article>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h4>Key Metrics</h4>
          <p>Live monitoring indicators for anomaly review, alerts, and report readiness.</p>
        </div>
        <div className="kpi-grid" aria-label="Dashboard KPI cards">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      <section className="section-card">
        <div className="section-heading">
          <h4>Active Alerts</h4>
          <p>Rule-based monitoring outputs for the current selected plant snapshot.</p>
        </div>
        <div className="table-wrap">
          <table className="data-table alert-table">
            <thead>
              <tr>
                <th>Alert</th>
                <th>Result</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ruleAlerts.map((field) => (
                <tr key={field.key}>
                  <td>{formatFieldName(field.key)}</td>
                  <td>{displayValue(field.value)}</td>
                  <td>
                    <StatusBadge status={field.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title-row">
          <BrainCircuit size={20} aria-hidden="true" />
          <div>
            <h4>AI Anomaly Summary</h4>
            <p>Human-readable explanation and recommended action for expert review.</p>
          </div>
        </div>
        <div className="summary-strip ai-summary-grid">
          <article>
            <Gauge size={20} aria-hidden="true" />
            <span>Anomaly Score</span>
            <strong>{activePlantRecord.anomalyScore.toFixed(2)}</strong>
          </article>
          <article>
            <BrainCircuit size={20} aria-hidden="true" />
            <span>Anomaly Status</span>
            <StatusBadge status={activePlantRecord.anomalyStatus} />
          </article>
          <article>
            <ClipboardCheck size={20} aria-hidden="true" />
            <span>Expert Review Required</span>
            <strong>{activePlantRecord.expertReviewRequired ? "Yes" : "No"}</strong>
          </article>
          <article>
            <AlertTriangle size={20} aria-hidden="true" />
            <span>Possible Issue Category</span>
            <strong>{activePlantRecord.possibleIssueCategory}</strong>
          </article>
        </div>
        <div className="dashboard-grid">
          <div className="insight-box">
            <p>{aiExplanation}</p>
          </div>
          <div className="insight-box accent">
            <p>{recommendedAction}</p>
          </div>
        </div>
        <div className="button-row">
          <button type="button" className="secondary-button" onClick={onOpenAnomaly}>
            <ArrowRight size={17} aria-hidden="true" />
            Open Anomaly Detection
          </button>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title-row">
          <Lightbulb size={20} aria-hidden="true" />
          <div>
            <h4>Latest Plant Readings</h4>
            <p>Grouped plant variables with dropdown filtering and safe fallback values.</p>
          </div>
        </div>
        <PlantFieldGroups fields={plantFields} selectedGroup={selectedGroup} selectedStatus={selectedStatus} />
      </section>

      <section className="section-card">
        <div className="section-heading">
          <h4>Report / Update Status</h4>
          <p>Current readiness of the report and communication outputs for the selected plant.</p>
        </div>
        <div className="report-status-grid">
          {reportStatuses.map((item) => (
            <article key={item.label} className="status-card">
              <span>{item.label}</span>
              <strong>{item.status}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        <ReportActions selectedPlant={selectedPlant} selectedPeriod={selectedPeriod} />
      </section>
    </div>
  );
}

export default DashboardPage;
