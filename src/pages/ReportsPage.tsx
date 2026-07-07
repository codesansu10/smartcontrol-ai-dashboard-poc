import { FileText, Printer } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ReportActions from "../components/ReportActions";
import StatusBadge from "../components/StatusBadge";
import {
  activePlantRecord,
  aiExplanation,
  dateOptions,
  plantOptions,
  reportTypes,
} from "../data/mockData";
import { downloadReport, printReport } from "../utils/reporting";

function ReportsPage() {
  const [reportType, setReportType] = useState(reportTypes[0]);
  const [selectedPlant, setSelectedPlant] = useState(activePlantRecord.plantId);
  const [selectedPeriod, setSelectedPeriod] = useState(activePlantRecord.reportingPeriod);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Professional reporting"
        title="Reports"
        description="Preview, download, and print reports for the three SMARTCONTROL PoC process maps."
      />

      <section className="filter-bar reports-filter" aria-label="Report filters">
        <label>
          <span>
            <FileText size={16} aria-hidden="true" />
            Report type
          </span>
          <select value={reportType} onChange={(event) => setReportType(event.target.value)}>
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Plant</span>
          <select value={selectedPlant} onChange={(event) => setSelectedPlant(event.target.value)}>
            {plantOptions.map((plant) => (
              <option key={plant} value={plant}>
                {plant}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Date / period</span>
          <select value={selectedPeriod} onChange={(event) => setSelectedPeriod(event.target.value)}>
            {dateOptions.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="report-preview-card">
        <div className="report-preview-header">
          <div>
            <p className="eyebrow">Report preview</p>
            <h3>{reportType}</h3>
            <p>{selectedPlant} · {selectedPeriod}</p>
          </div>
          <StatusBadge status={activePlantRecord.currentPlantStatus} />
        </div>
        <div className="report-preview-grid">
          <article>
            <span>Current Plant Status</span>
            <strong>{activePlantRecord.currentPlantStatus}</strong>
          </article>
          <article>
            <span>Anomaly Score</span>
            <strong>{activePlantRecord.anomalyScore.toFixed(2)}</strong>
          </article>
          <article>
            <span>Risk Level</span>
            <strong>{activePlantRecord.riskLevel}</strong>
          </article>
          <article>
            <span>Expert Review Required</span>
            <strong>{activePlantRecord.expertReviewRequired ? "Yes" : "No"}</strong>
          </article>
        </div>
        <div className="report-preview-body">
          <p className="print-helper">Use Print Report to save as PDF.</p>
          <h4>AI anomaly detection result</h4>
          <p>{aiExplanation}</p>
          <h4>Human decision/action section</h4>
          <p>Expert review is pending. Operator decision will be documented after validation.</p>
          <h4>Learning feedback section</h4>
          <p>Outcome will be stored as learning data for future false-alarm and model-tuning feedback.</p>
        </div>
        <div className="report-actions">
          <button type="button" className="primary-button" onClick={() => downloadReport(reportType, selectedPlant, selectedPeriod)}>
            <FileText size={17} aria-hidden="true" />
            Download Report
          </button>
          <button type="button" className="secondary-button" onClick={() => printReport(reportType, selectedPlant, selectedPeriod)}>
            <Printer size={17} aria-hidden="true" />
            Print Report
          </button>
        </div>
      </section>

      <ReportActions selectedPlant={selectedPlant} selectedPeriod={selectedPeriod} primaryType={reportType} />
    </div>
  );
}

export default ReportsPage;
