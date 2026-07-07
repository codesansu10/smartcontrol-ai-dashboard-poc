import RiskBadge from "./RiskBadge";
import type { RiskLevel } from "../types";

function CustomerUpdatePreview({ risk }: { risk: RiskLevel }) {
  const needsReview = risk !== "Low";

  return (
    <section className="message-preview">
      <div className="document-header">
        <span>AI-generated standard customer message</span>
        <RiskBadge level={risk} compact />
      </div>
      <p>Hello, the current SMARTCONTROL status for your plant remains stable based on the latest dashboard data.</p>
      <p>
        No critical anomalies are open for your site. Routine monitoring continues, and validated operational events
        will be included in the next monthly expert report.
      </p>
      <div className={needsReview ? "decision-box review" : "decision-box send"}>
        {needsReview
          ? "Decision logic: route to expert review because risk is not low or the context is unclear."
          : "Decision logic: eligible for automatic sending because risk is low and content is standardized."}
      </div>
    </section>
  );
}

export default CustomerUpdatePreview;
