import { Radio, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import CustomerUpdatePreview from "../components/CustomerUpdatePreview";
import PageHeader from "../components/PageHeader";
import ReportActions from "../components/ReportActions";
import RiskBadge from "../components/RiskBadge";
import { activePlantRecord, communicationLog } from "../data/mockData";
import type { RiskLevel } from "../types";

const updateSteps = ["Trigger", "Pull Data", "Generate Update", "Risk Check", "Send or Review", "Log"];
const riskOptions: RiskLevel[] = ["Low", "Medium", "High"];

function CustomerUpdatesPage() {
  const [risk, setRisk] = useState<RiskLevel>("Low");
  const canAutoSend = risk === "Low";

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Standard customer status updates"
        title="Customer Status Updates"
        description="The workflow shows how standardized messages are generated, checked, sent, or routed for expert review."
        action={<ReportActions selectedPlant={activePlantRecord.plantId} selectedPeriod={activePlantRecord.reportingPeriod} primaryType="Customer Status Update Report" />}
      />

      <section className="section-card">
        <div className="section-heading">
          <h4>Customer status update pipeline</h4>
          <p>Trigger to pull data to generate update to risk check to send or review to log.</p>
        </div>
        <div className="pipeline">
          {updateSteps.map((step, index) => (
            <div className="pipeline-step active" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="two-column">
        <section className="section-card">
          <div className="section-heading">
            <h4>Customer update workflow</h4>
            <p>Low-risk standard updates can be sent automatically after the content check.</p>
          </div>
          <div className="status-list">
            <p>
              <Radio size={17} aria-hidden="true" />
              <strong>Status update trigger:</strong> weekly routine customer summary
            </p>
            <p>
              <ShieldCheck size={17} aria-hidden="true" />
              <strong>Pulled plant data:</strong> uptime, current alerts, validated anomalies, operator decisions
            </p>
            <p>
              <Send size={17} aria-hidden="true" />
              <strong>Low-risk content check:</strong> standardized language with no unvalidated operational claims
            </p>
          </div>

          <div className="risk-selector">
            <span>Content risk level</span>
            <div className="segmented-control compact-control">
              {riskOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={risk === option ? "selected" : ""}
                  onClick={() => setRisk(option)}
                >
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={canAutoSend ? "decision-box send" : "decision-box review"}>
            <RiskBadge level={risk} compact />
            {canAutoSend
              ? "Send automatically because risk is low and information is standardized."
              : "Route to expert review because medium or high risk content needs human validation."}
          </div>
        </section>

        <CustomerUpdatePreview risk={risk} />
      </div>

      <section className="section-card">
        <div className="section-heading">
          <h4>Communication log</h4>
          <p>Every generated update keeps a decision record for traceability.</p>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Trigger</th>
                <th>Risk</th>
                <th>Decision</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {communicationLog.map((entry) => (
                <tr key={`${entry.customer}-${entry.time}`}>
                  <td>{entry.customer}</td>
                  <td>{entry.trigger}</td>
                  <td>
                    <RiskBadge level={entry.risk as RiskLevel} compact />
                  </td>
                  <td>{entry.decision}</td>
                  <td>{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-card">
        <div className="section-heading">
          <h4>Action and outcome record</h4>
          <p>Each update keeps the trigger, risk decision, communication state, and follow-up responsibility in one traceable record.</p>
        </div>
        <div className="learning-grid">
          <article>
            <strong>Customer communication</strong>
            <p>Low-risk messages can be released with standardized wording and logged automatically.</p>
          </article>
          <article>
            <strong>Expert review path</strong>
            <p>Medium or high risk updates are routed to expert review before external communication.</p>
          </article>
          <article>
            <strong>Lifecycle feedback</strong>
            <p>Maintenance decisions and customer responses update the lifecycle and audit record.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default CustomerUpdatesPage;
