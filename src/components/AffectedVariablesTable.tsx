import type { AffectedVariable } from "../types";
import { formatFieldName } from "../utils/formatters";
import RiskBadge from "./RiskBadge";

function AffectedVariablesTable({ variables }: { variables: AffectedVariable[] }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Plant variable</th>
            <th>Current</th>
            <th>Expected</th>
            <th>Change</th>
            <th>Status</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable) => (
            <tr key={variable.name}>
              <td>{formatFieldName(variable.name)}</td>
              <td>{variable.current}</td>
              <td>{variable.expected}</td>
              <td className={variable.change.startsWith("+") ? "delta-up" : "delta-down"}>{variable.change}</td>
              <td>{variable.status}</td>
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
