import { GitBranch, Split } from "lucide-react";

interface BpmnStep {
  title: string;
  detail: string;
}

interface BpmnProcessSummaryProps {
  title: string;
  description: string;
  steps: BpmnStep[];
}

function BpmnProcessSummary({ title, description, steps }: BpmnProcessSummaryProps) {
  return (
    <section className="section-card">
      <div className="section-title-row">
        <GitBranch size={20} aria-hidden="true" />
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
      <div className="bpmn-step-grid">
        {steps.map((step, index) => {
          const isDecision = step.title.toLowerCase().startsWith("decision:");
          return (
            <article className={isDecision ? "bpmn-step decision" : "bpmn-step"} key={step.title}>
              <div className="bpmn-step-index">
                {isDecision ? <Split size={16} aria-hidden="true" /> : index + 1}
              </div>
              <div>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default BpmnProcessSummary;
