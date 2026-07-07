import type { RecordStatus } from "../types";

function StatusBadge({ status }: { status: RecordStatus }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
}

export default StatusBadge;
