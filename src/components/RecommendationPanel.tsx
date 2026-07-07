import { ClipboardList } from "lucide-react";

function RecommendationPanel() {
  return (
    <section className="recommendation-panel">
      <div className="section-title-row">
        <ClipboardList size={20} aria-hidden="true" />
        <div>
          <h4>Recommended expert review path</h4>
          <p>AI recommendation prepared for validation before operator action.</p>
        </div>
      </div>
      <ol className="recommendation-list">
        <li>Check pH Value, Organic Loading Rate, and Feedstock Input before further input increases.</li>
        <li>Verify Methane, CO2, and H2S readings for gas quality and corrosion risk.</li>
        <li>Inspect Pressure and Compressor Vibration for equipment or gas line restriction risk.</li>
        <li>Escalate to the operator if the expert confirms biological instability or maintenance risk.</li>
      </ol>
    </section>
  );
}

export default RecommendationPanel;
