import { Download, GitBranch, Layers3 } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ReportActions from "../components/ReportActions";
import { activePlantRecord, workflowSections } from "../data/mockData";
import { downloadReport } from "../utils/reporting";

function AIProcessWorkflowPage() {
  const [selectedPlant] = useState(activePlantRecord.plantId);
  const [selectedPeriod] = useState(activePlantRecord.reportingPeriod);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Professor-friendly process explanation"
        title="AI Process Workflow"
        description="From plant data collection to expert validation, operator action, learning feedback, and reporting."
        action={
          <button
            type="button"
            className="primary-button"
            onClick={() => downloadReport("Process Workflow Report", selectedPlant, selectedPeriod)}
          >
            <Download size={17} aria-hidden="true" />
            Download Process Report
          </button>
        }
      />

      <section className="workflow-board">
        {workflowSections.map((section, sectionIndex) => (
          <article className="workflow-section" key={section.section}>
            <div className="workflow-section-head">
              <span>{sectionIndex + 1}</span>
              <div>
                <h4>{section.section}</h4>
                <p>{section.steps.length} explanation steps</p>
              </div>
            </div>
            <div className="workflow-steps">
              {section.steps.map((step, index) => (
                <div className="workflow-step" key={step.title}>
                  <div className="workflow-step-icon">
                    {index === 0 ? <Layers3 size={17} aria-hidden="true" /> : <GitBranch size={17} aria-hidden="true" />}
                  </div>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <ReportActions selectedPlant={selectedPlant} selectedPeriod={selectedPeriod} primaryType="Process Workflow Report" />
    </div>
  );
}

export default AIProcessWorkflowPage;
