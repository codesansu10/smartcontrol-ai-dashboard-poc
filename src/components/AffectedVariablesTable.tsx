import type { AffectedVariable } from "../types";
import { formatFieldName } from "../utils/formatters";
import RiskBadge from "./RiskBadge";
import StatusBadge from "./StatusBadge";

function valueOrDash(value: string) {
  return value && value.toLowerCase() !== "not available" ? value : "-";
}

function AffectedVariablesTable({ variables }: { variables: AffectedVariable[] }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Plant variable</th>
            <th>Current</th>
            <th>Expected / Reference</th>
            <th>Change</th>
            <th>Status</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable) => (
            <tr key={variable.name}>
              <td>{formatFieldName(variable.name)}</td>
              <td>{valueOrDash(variable.current)}</td>
              <td>{valueOrDash(variable.expected)}</td>
              <td className={variable.change.startsWith("+") ? "delta-up" : variable.change.startsWith("-") ? "delta-down" : ""}>
                {valueOrDash(variable.change)}
              </td>
              <td>
                <StatusBadge status={variable.status} />
              </td>
              <td>
                <RiskBadge level={variable.risk} compact />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AffectedVariablesTable;
