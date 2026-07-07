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
        <li>Check `ph_value`, `organic_loading_rate`, and `feedstock_input_tons` before further input increases.</li>
        <li>Verify methane and gas quality readings from `methane_percent`, `co2_percent`, and `h2s_ppm`.</li>
        <li>Inspect `pressure_bar` and `compressor_vibration_mm_s` for equipment or gas line restriction risk.</li>
        <li>Escalate to the operator if the expert confirms biological instability or maintenance risk.</li>
      </ol>
    </section>
  );
}

export default RecommendationPanel;
