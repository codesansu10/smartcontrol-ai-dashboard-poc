import { BrainCircuit, ClipboardCheck, UserCheck } from "lucide-react";

interface ProcessFlowCardProps {
  title: string;
  metric: string;
  ai: string;
  expert: string;
  action: string;
}

function ProcessFlowCard({ title, metric, ai, expert, action }: ProcessFlowCardProps) {
  return (
    <article className="process-card">
      <div className="process-card-head">
        <h4>{title}</h4>
        <span>{metric}</span>
      </div>
      <div className="process-lanes">
        <div className="process-lane">
          <BrainCircuit size={18} aria-hidden="true" />
          <strong>AI acts</strong>
          <p>{ai}</p>
        </div>
        <div className="process-lane">
          <ClipboardCheck size={18} aria-hidden="true" />
          <strong>Expert review</strong>
          <p>{expert}</p>
        </div>
        <div className="process-lane">
          <UserCheck size={18} aria-hidden="true" />
          <strong>Decision or delivery</strong>
          <p>{action}</p>
        </div>
      </div>
    </article>
  );
}

export default ProcessFlowCard;
