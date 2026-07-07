import type { RiskLevel } from "../types";

interface RiskBadgeProps {
  level: RiskLevel;
  compact?: boolean;
}

function RiskBadge({ level, compact = false }: RiskBadgeProps) {
  return <span className={`risk-badge risk-${level.toLowerCase()} ${compact ? "compact" : ""}`}>{level}</span>;
}

export function RiskScale({ active }: { active: RiskLevel }) {
  const levels: RiskLevel[] = ["Low", "Medium", "High", "Critical"];

  return (
    <div className="risk-scale" aria-label={`Current risk level is ${active}`}>
      {levels.map((level) => (
        <span key={level} className={`risk-step risk-${level.toLowerCase()} ${active === level ? "active" : ""}`}>
          {level}
        </span>
      ))}
    </div>
  );
}

export default RiskBadge;
