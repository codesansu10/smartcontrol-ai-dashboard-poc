import {
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Settings2,
  Wrench,
  XCircle,
} from "lucide-react";
import type { ExpertStatus, OperatorDecision } from "../types";

const expertStatuses: ExpertStatus[] = [
  "Pending Review",
  "Validated by Expert",
  "Rejected / False Alarm",
  "Escalated to Operator",
];

const operatorDecisions: OperatorDecision[] = [
  "Monitor",
  "Adjust process",
  "Request maintenance",
  "Ignore after review",
];

const expertCopy: Record<ExpertStatus, string> = {
  "Pending Review": "Expert validation has not yet been completed.",
  "Validated by Expert": "The AI anomaly is confirmed as operationally meaningful.",
  "Rejected / False Alarm": "The expert determined this is not a valid operational anomaly.",
  "Escalated to Operator": "The expert has routed the alert to the plant operator for decision.",
};

const decisionCopy: Record<OperatorDecision, string> = {
  Monitor: "Continue close observation and document any further drift.",
  "Adjust process": "Prepare a controlled process adjustment after expert confirmation.",
  "Request maintenance": "Create a maintenance request for equipment inspection.",
  "Ignore after review": "Document rationale and close after expert false-alarm review.",
};

function statusIcon(status: ExpertStatus) {
  if (status === "Validated by Expert") return <CheckCircle2 size={17} aria-hidden="true" />;
  if (status === "Rejected / False Alarm") return <XCircle size={17} aria-hidden="true" />;
  return <ClipboardCheck size={17} aria-hidden="true" />;
}

function decisionIcon(decision: OperatorDecision) {
  if (decision === "Monitor") return <Eye size={17} aria-hidden="true" />;
  if (decision === "Adjust process") return <Settings2 size={17} aria-hidden="true" />;
  if (decision === "Request maintenance") return <Wrench size={17} aria-hidden="true" />;
  return <XCircle size={17} aria-hidden="true" />;
}

interface ExpertReviewPanelProps {
  status: ExpertStatus;
  onChange: (status: ExpertStatus) => void;
}

export function ExpertReviewPanel({ status, onChange }: ExpertReviewPanelProps) {
  return (
    <section className="workflow-panel">
      <div className="section-title-row">
        <ClipboardCheck size={20} aria-hidden="true" />
        <div>
          <h4>Expert review status</h4>
          <p>{expertCopy[status]}</p>
        </div>
      </div>
      <div className="segmented-control">
        {expertStatuses.map((item) => (
          <button
            type="button"
            key={item}
            className={status === item ? "selected" : ""}
            onClick={() => onChange(item)}
          >
            {statusIcon(item)}
            <span>{item}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

interface OperatorDecisionPanelProps {
  decision: OperatorDecision | null;
  onChange: (decision: OperatorDecision) => void;
}

export function OperatorDecisionPanel({ decision, onChange }: OperatorDecisionPanelProps) {
  return (
    <section className="workflow-panel">
      <div className="section-title-row">
        <Settings2 size={20} aria-hidden="true" />
        <div>
          <h4>Operator decision area</h4>
          <p>{decision ? decisionCopy[decision] : "Select the mock operational decision after expert review."}</p>
        </div>
      </div>
      <div className="segmented-control">
        {operatorDecisions.map((item) => (
          <button
            type="button"
            key={item}
            className={decision === item ? "selected" : ""}
            onClick={() => onChange(item)}
          >
            {decisionIcon(item)}
            <span>{item}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
