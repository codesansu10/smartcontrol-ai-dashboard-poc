import { Download, Printer } from "lucide-react";
import { downloadReport, printReport } from "../utils/reporting";

interface ReportActionsProps {
  selectedPlant: string;
  selectedPeriod: string;
  primaryType?: string;
}

function ReportActions({
  selectedPlant,
  selectedPeriod,
  primaryType = "Anomaly Detection Report",
}: ReportActionsProps) {
  return (
    <div className="report-actions">
      <button
        type="button"
        className="primary-button"
        onClick={() => downloadReport("Full SMARTCONTROL PoC Summary Report", selectedPlant, selectedPeriod)}
      >
        <Download size={17} aria-hidden="true" />
        Download PoC Summary
      </button>
      <button
        type="button"
        className="secondary-button"
        onClick={() => downloadReport(primaryType, selectedPlant, selectedPeriod)}
      >
        <Download size={17} aria-hidden="true" />
        Download Report
      </button>
      <button
        type="button"
        className="secondary-button"
        onClick={() => printReport(primaryType, selectedPlant, selectedPeriod)}
      >
        <Printer size={17} aria-hidden="true" />
        Print Report
      </button>
    </div>
  );
}

export default ReportActions;
