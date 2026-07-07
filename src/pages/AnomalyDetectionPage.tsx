import { AlertTriangle, BrainCircuit, Gauge, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import ActivityLog from "../components/ActivityLog";
import AffectedVariablesTable from "../components/AffectedVariablesTable";
import PageHeader from "../components/PageHeader";
import RecommendationPanel from "../components/RecommendationPanel";
import { ExpertReviewPanel, OperatorDecisionPanel } from "../components/ReviewPanels";
import RiskBadge, { RiskScale } from "../components/RiskBadge";
import TrendMiniCard from "../components/TrendMiniCard";
import { affectedVariables, baseActivity } from "../data/mockData";
import type { ActivityEntry, ExpertStatus, OperatorDecision } from "../types";

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
        detail: "Outcome note is ready to be attached to the anomaly record and monthly report.",
      };
    }

    return entry;
  });
}

function AnomalyDetectionPage() {
  const [expertStatus, setExpertStatus] = useState<ExpertStatus>("Pending Review");
  const [operatorDecision, setOperatorDecision] = useState<OperatorDecision | null>(null);

  const activity = useMemo(
    () => buildActivity(expertStatus, operatorDecision),
    [expertStatus, operatorDecision]
  );

  return (
    <div className="page-stack anomaly-page">
      <PageHeader
        eyebrow="Priority PoC candidate"
        title="AI Anomaly Detection"
        description="AI detects, OEKOBIT experts validate, plant operators decide."
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
                <h3>Isolation Forest anomaly across digester stability variables</h3>
              </div>
              <RiskBadge level="Critical" />
            </div>
            <p>
              The AI model detected correlated deviation across ph_value, organic_loading_rate, gas_flow_m3_h,
              methane_percent, pressure_bar, and compressor_vibration_mm_s. The pattern suggests possible biological
              instability plus equipment stress.
            </p>
          </div>
        </div>

        <div className="alert-metrics">
          <div>
            <Gauge size={18} aria-hidden="true" />
            <span>AI confidence score</span>
            <strong>91%</strong>
          </div>
          <div>
            <BrainCircuit size={18} aria-hidden="true" />
            <span>Model explanation</span>
            <strong>18 numeric inputs scored</strong>
          </div>
          <div>
            <AlertTriangle size={18} aria-hidden="true" />
            <span>Expert status</span>
            <strong>{expertStatus}</strong>
          </div>
        </div>

        <div className="risk-scale-wrap">
          <span>Risk level indicator</span>
          <RiskScale active="Critical" />
        </div>
      </section>

      <section className="analysis-grid">
        <div className="section-card wide">
          <div className="section-heading">
            <h4>Affected plant variables</h4>
            <p>DOCX Isolation Forest inputs highlight the variables that explain the anomaly.</p>
          </div>
          <AffectedVariablesTable variables={affectedVariables} />
        </div>

        <div className="section-card">
          <div className="section-heading">
            <h4>Trend mini-cards</h4>
            <p>Compact signals for presentation and quick expert scanning.</p>
          </div>
          <div className="trend-grid">
            {affectedVariables.map((variable) => (
              <TrendMiniCard key={variable.name} variable={variable} />
            ))}
          </div>
        </div>
      </section>

      <div className="two-column">
        <RecommendationPanel />
        <div className="review-stack">
          <ExpertReviewPanel status={expertStatus} onChange={setExpertStatus} />
          <OperatorDecisionPanel decision={operatorDecision} onChange={setOperatorDecision} />
        </div>
      </div>

      <ActivityLog entries={activity} />
    </div>
  );
}

export default AnomalyDetectionPage;
