import type { AffectedVariable } from "../types";
import RiskBadge from "./RiskBadge";

function sparklinePoints(values: number[]) {
  const width = 120;
  const height = 42;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
}

function TrendMiniCard({ variable }: { variable: AffectedVariable }) {
  const isRising = variable.change.startsWith("+");

  return (
    <article className="trend-card">
      <div className="trend-card-head">
        <div>
          <p>{variable.name}</p>
          <strong>{variable.current}</strong>
        </div>
        <RiskBadge level={variable.risk} compact />
      </div>
      <svg viewBox="0 0 120 48" role="img" aria-label={`${variable.name} trend`}>
        <polyline
          points={sparklinePoints(variable.trend)}
          fill="none"
          stroke={isRising ? "var(--risk-low)" : "var(--risk-critical)"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{variable.change} vs expected</span>
    </article>
  );
}

export default TrendMiniCard;
