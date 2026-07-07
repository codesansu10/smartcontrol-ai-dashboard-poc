import { AlertTriangle, BrainCircuit, ClipboardCheck, Gauge, ShieldAlert, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import ActivityLog from "../components/ActivityLog";
import AffectedVariablesTable from "../components/AffectedVariablesTable";
import FilterBar from "../components/FilterBar";
import PageHeader from "../components/PageHeader";
import PlantFieldGroups from "../components/PlantFieldGroups";
import RecommendationPanel from "../components/RecommendationPanel";
import ReportActions from "../components/ReportActions";
import { ExpertReviewPanel, OperatorDecisionPanel } from "../components/ReviewPanels";
import RiskBadge, { RiskScale } from "../components/RiskBadge";
import StatusBadge from "../components/StatusBadge";
import TrendMiniCard from "../components/TrendMiniCard";
import {
  activePlantRecord,
  affectedVariables,
  aiExplanation,
  baseActivity,
  plantFields,
  recommendedAction,
} from "../data/mockData";
import type {
  ActivityEntry,
  ExpertStatus,
  FieldGroupFilter,
  OperatorDecision,
  StatusFilter,
} from "../types";

function buildActivity(status: ExpertStatus, decision: OperatorDecision | null): ActivityEntry[] {
  return baseActivity.map((entry) => {
    if (entry.step === "Expert validation pending" && status !== "Pending Review") {
      return {
        ...entry,
        state: "Complete",
        detail: `Expert status changed to "${status}" in the PoC workflow.`,
      };
    }

    if (entry.step === "Operator decision required") {
      if (status === "Escalated to Operator" && !decision) {
        return {
          ...entry,
          state: "Current",
          time: "Now",
          detail: "Expert escalation is complete. Operator decision is required.",
        };
      }

      if (decision) {
        return {
          ...entry,
          state: "Complete",
          time: "Now",
          detail: `Operator selected "${decision}" as the documented decision path.`,
        };
      }
    }

    if (entry.step === "Outcome documented" && decision) {
      return {
        ...entry,
        state: "Current",
        time: "Next",
        detail: "Outcome note is ready to be attached to the anomaly record, learning feedback, and report.",
      };
    }

    return entry;
  });
}

function statusMatchesFilter(status: string | undefined, selectedStatus: StatusFilter, expertReviewRequired?: boolean) {
  if (selectedStatus === "All") return true;
  if (selectedStatus === "Expert review required") return expertReviewRequired === true;
  if (selectedStatus === "Normal records") return status === "Normal";
  if (selectedStatus === "Warning records") return status === "Warning";
  if (selectedStatus === "Critical records") return status === "Critical";
  if (selectedStatus === "Anomaly records") return status === "Anomaly";
  return true;
}

function AnomalyDetectionPage() {
  const [expertStatus, setExpertStatus] = useState<ExpertStatus>("Pending Review");
  const [operatorDecision, setOperatorDecision] = useState<OperatorDecision | null>(null);
  const [selectedPlant, setSelectedPlant] = useState(activePlantRecord.plantId);
  const [selectedPeriod, setSelectedPeriod] = useState(activePlantRecord.reportingPeriod);
  const [selectedGroup, setSelectedGroup] = useState<FieldGroupFilter>("All");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("All");

  const activity = useMemo(
    () => buildActivity(expertStatus, operatorDecision),
    [expertStatus, operatorDecision]
  );

  const filteredVariables = useMemo(
    () =>
      affectedVariables.filter((variable) => {
        const groupMatch = selectedGroup === "All" || variable.group === selectedGroup;
        const statusMatch = statusMatchesFilter(
          variable.recordStatus,
          selectedStatus,
          variable.expertReviewRequired
        );
        return groupMatch && statusMatch;
      }),
    [selectedGroup, selectedStatus]
  );

  return (
    <div className="page-stack anomaly-page">
      <PageHeader
        eyebrow="Priority PoC candidate"
        title="AI Anomaly Detection"
        description="AI detects, OEKOBIT experts validate, plant operators decide."
        action={<ReportActions selectedPlant={selectedPlant} selectedPeriod={selectedPeriod} />}
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

      <section className="alert-card">
        <div className="alert-main">
          <div className="alert-icon">
            <ShieldAlert size={26} aria-hidden="true" />
          </div>
          <div className="alert-copy">
            <div className="alert-title-row">
              <div>
                <p className="eyebrow">Current anomaly alert</p>
                <h3>Critical biological instability and equipment stress pattern</h3>
              </div>
              <RiskBadge level={activePlantRecord.riskLevel} />
            </div>
            <p>{aiExplanation}</p>
          </div>
        </div>

        <div className="alert-metrics">
          <div>
            <Gauge size={18} aria-hidden="true" />
            <span>Anomaly Score</span>
            <strong>{activePlantRecord.anomalyScore.toFixed(2)}</strong>
          </div>
          <div>
            <BrainCircuit size={18} aria-hidden="true" />
            <span>Expert Review Required</span>
            <strong>{activePlantRecord.expertReviewRequired ? "Yes" : "No"}</strong>
          </div>
          <div>
            <AlertTriangle size={18} aria-hidden="true" />
            <span>Possible Issue Category</span>
            <strong>{activePlantRecord.possibleIssueCategory}</strong>
          </div>
        </div>

        <div className="risk-scale-wrap">
          <span>Risk level indicator</span>
          <RiskScale active={activePlantRecord.riskLevel} />
        </div>
      </section>

      <section className="summary-strip">
        <article>
          <BrainCircuit size={20} aria-hidden="true" />
          <span>AI Status</span>
          <strong>{activePlantRecord.anomalyStatus}</strong>
        </article>
        <article>
          <ClipboardCheck size={20} aria-hidden="true" />
          <span>Expert Review</span>
          <strong>{expertStatus}</strong>
        </article>
        <article>
          <Sparkles size={20} aria-hidden="true" />
          <span>Operator Action</span>
          <strong>{operatorDecision ?? "Pending"}</strong>
        </article>
        <article>
          <AlertTriangle size={20} aria-hidden="true" />
          <span>Current Status</span>
          <StatusBadge status={activePlantRecord.currentPlantStatus} />
        </article>
      </section>

      <section className="analysis-grid">
        <div className="section-card wide">
          <div className="section-heading">
            <h4>Affected plant variables</h4>
            <p>Human-readable labels from grouped plant, rule-based, and AI anomaly fields.</p>
          </div>
          {filteredVariables.length > 0 ? (
            <AffectedVariablesTable variables={filteredVariables} />
          ) : (
            <div className="empty-state inline-empty">
              <h4>No affected variables match this filter</h4>
              <p>Select All groups or a broader status filter to inspect more anomaly signals.</p>
            </div>
          )}
        </div>

        <div className="section-card">
          <div className="section-heading">
            <h4>Trend mini-cards</h4>
            <p>Compact signals for presentation and quick expert scanning.</p>
          </div>
          <div className="trend-grid">
            {filteredVariables.map((variable) => (
              <TrendMiniCard key={variable.name} variable={variable} />
            ))}
          </div>
        </div>
      </section>

      <div className="two-column">
        <section className="section-card">
          <div className="section-title-row">
            <BrainCircuit size={20} aria-hidden="true" />
            <div>
              <h4>AI Explanation</h4>
              <p>Simple anomaly logic for professor presentation.</p>
            </div>
          </div>
          <div className="insight-box">
            <p>{aiExplanation}</p>
          </div>
          <div className="insight-box accent">
            <p>{recommendedAction}</p>
          </div>
        </section>
        <RecommendationPanel />
      </div>

      <section className="section-card">
        <div className="section-heading">
          <h4>Grouped anomaly context</h4>
          <p>Use the dropdowns above to inspect each field group without raw backend names.</p>
        </div>
        <PlantFieldGroups
          fields={plantFields}
          selectedGroup={selectedGroup}
          selectedStatus={selectedStatus}
          compact
        />
      </section>

      <div className="two-column">
        <ExpertReviewPanel status={expertStatus} onChange={setExpertStatus} />
        <OperatorDecisionPanel decision={operatorDecision} onChange={setOperatorDecision} />
      </div>

      <section className="section-card">
        <div className="section-heading">
          <h4>Learning Feedback</h4>
          <p>Expert decisions, false alarms, operator actions, and outcomes become feedback for future tuning.</p>
        </div>
        <div className="learning-grid">
          <article>
            <strong>False alarm path</strong>
            <p>If expert rejects the alert, it is marked as a false alarm and logged for learning.</p>
          </article>
          <article>
            <strong>Relevant risk path</strong>
            <p>If expert validates the risk, the recommendation is sent to the operator for decision.</p>
          </article>
          <article>
            <strong>Outcome documentation</strong>
            <p>Action taken, no action, monitoring decision, and final result are stored in the report.</p>
          </article>
        </div>
      </section>

      <ActivityLog entries={activity} />
    </div>
  );
}

export default AnomalyDetectionPage;
