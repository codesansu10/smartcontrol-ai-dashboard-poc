import { AlertTriangle, ArrowRight, BrainCircuit, ClipboardCheck, Gauge, Lightbulb, Wrench } from "lucide-react";
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
import { matchesFieldGroup, matchesStatusFilter } from "../utils/formatters";

function DashboardPage({ onOpenAnomaly }: { onOpenAnomaly: () => void }) {
  const [selectedPlant, setSelectedPlant] = useState(activePlantRecord.plantId);
  const [selectedPeriod, setSelectedPeriod] = useState(activePlantRecord.reportingPeriod);
  const [selectedGroup, setSelectedGroup] = useState<FieldGroupFilter>("All");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("All");

  const filteredCount = useMemo(
    () =>
      plantFields.filter(
        (field) => matchesFieldGroup(field, selectedGroup) && matchesStatusFilter(field, selectedStatus)
      ).length,
    [selectedGroup, selectedStatus]
  );

  const ruleAlertCount = plantFields.filter((field) => field.group === "Rule-Based Monitoring" && field.status !== "Normal").length;

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Live plant monitoring"
        title="SMARTCONTROL 2.0 AI Dashboard"
        description="Biogas Plant Monitoring, Anomaly Detection and Reporting"
        action={
          <button type="button" className="primary-button" onClick={onOpenAnomaly}>
            <ArrowRight size={17} aria-hidden="true" />
            Open Anomaly Detection
          </button>
        }
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

      <section className="kpi-grid" aria-label="Dashboard KPI cards">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </section>

      <section className="summary-strip">
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
          <AlertTriangle size={20} aria-hidden="true" />
          <span>Rule-Based Alerts</span>
          <strong>{ruleAlertCount} active</strong>
        </article>
        <article>
          <BrainCircuit size={20} aria-hidden="true" />
          <span>Filtered Records</span>
          <strong>{filteredCount}</strong>
        </article>
      </section>

      <div className="dashboard-grid">
        <section className="section-card">
          <div className="section-title-row">
            <BrainCircuit size={20} aria-hidden="true" />
            <div>
              <h4>AI Explanation</h4>
              <p>Human-readable explanation for professor presentation.</p>
            </div>
          </div>
          <div className="insight-box">
            <StatusBadge status={activePlantRecord.currentPlantStatus} />
            <p>{aiExplanation}</p>
          </div>
        </section>

        <section className="section-card">
          <div className="section-title-row">
            <Wrench size={20} aria-hidden="true" />
            <div>
              <h4>Recommended Action</h4>
              <p>AI supports expert review; operator remains responsible.</p>
            </div>
          </div>
          <div className="insight-box accent">
            <p>{recommendedAction}</p>
          </div>
        </section>
      </div>

      <section className="section-card">
        <div className="section-title-row">
          <Lightbulb size={20} aria-hidden="true" />
          <div>
            <h4>Latest Plant Reading</h4>
            <p>Grouped plant variables with dropdown filtering and safe fallback values.</p>
          </div>
        </div>
        <PlantFieldGroups fields={plantFields} selectedGroup={selectedGroup} selectedStatus={selectedStatus} />
      </section>

      <ReportActions selectedPlant={selectedPlant} selectedPeriod={selectedPeriod} />
    </div>
  );
}

export default DashboardPage;
