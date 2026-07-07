import { CheckCircle2, FileText, Play, Stamp } from "lucide-react";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import ReportPreview from "../components/ReportPreview";
import ReportActions from "../components/ReportActions";
import { activePlantRecord, monthlySources } from "../data/mockData";

const steps = ["Collect Data", "AI Draft", "Missing Info Check", "Expert Review", "Approval", "Customer Delivery"];

function MonthlyReportingPage() {
  const [stage, setStage] = useState(1);

  const status = useMemo(() => {
    return {
      review: stage >= 3 ? "Reviewed by expert" : "Expert edit pending",
      approval: stage >= 4 ? "Approved" : "Awaiting approval",
      delivery: stage >= 5 ? "Delivered to customer" : "Not yet delivered",
    };
  }, [stage]);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="AI-assisted monthly expert reporting"
        title="Monthly Expert Reporting"
        description="A transparent reporting workflow turns validated dashboard events into an expert-approved customer report."
        action={<ReportActions selectedPlant={activePlantRecord.plantId} selectedPeriod={activePlantRecord.reportingPeriod} primaryType="Monthly Expert Reporting Report" />}
      />

      <section className="section-card">
        <div className="section-heading">
          <h4>Report generation pipeline</h4>
          <p>Mock state changes show how a report moves from data collection to delivery.</p>
        </div>
        <div className="pipeline">
          {steps.map((step, index) => (
            <div className={index <= stage ? "pipeline-step active" : "pipeline-step"} key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="two-column reporting-grid">
        <section className="section-card">
          <div className="section-heading">
            <h4>Monthly reporting workflow</h4>
            <p>Collected sources are structured by AI and then interpreted by an expert.</p>
          </div>
          <div className="source-list">
            {monthlySources.map((source) => (
              <span key={source}>
                <CheckCircle2 size={16} aria-hidden="true" />
                {source}
              </span>
            ))}
          </div>
          <div className="warning-strip">Missing information warning: manual sample result is not attached.</div>
          <div className="status-list">
            <p>
              <strong>Suggested recommendation structure:</strong> explain cause, summarize evidence, document operator
              action, assign follow-up.
            </p>
            <p>
              <strong>Expert edit/review status:</strong> {status.review}
            </p>
            <p>
              <strong>Approval status:</strong> {status.approval}
            </p>
            <p>
              <strong>Final customer delivery status:</strong> {status.delivery}
            </p>
          </div>
          <div className="button-row">
            <button type="button" className="primary-button" onClick={() => setStage(Math.max(stage, 1))}>
              <Play size={17} aria-hidden="true" />
              Generate Draft
            </button>
            <button type="button" className="secondary-button" onClick={() => setStage(Math.max(stage, 3))}>
              <FileText size={17} aria-hidden="true" />
              Mark as Reviewed
            </button>
            <button type="button" className="secondary-button" onClick={() => setStage(Math.max(stage, 4))}>
              <Stamp size={17} aria-hidden="true" />
              Approve Report
            </button>
          </div>
        </section>

        <ReportPreview />
      </div>

      <section className="section-card">
        <div className="section-heading">
          <h4>Outcome and audit record</h4>
          <p>Approved reports keep the source list, expert review decision, release state, and submission record together.</p>
        </div>
        <div className="learning-grid">
          <article>
            <strong>Data completeness</strong>
            <p>Dashboard data, alerts, anomaly decisions, and operator notes are checked before release.</p>
          </article>
          <article>
            <strong>Expert approval</strong>
            <p>The report remains in review until flagged issues and missing information are resolved.</p>
          </article>
          <article>
            <strong>Final archive</strong>
            <p>The approved report is logged with its delivery status and audit trail for future reference.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default MonthlyReportingPage;
