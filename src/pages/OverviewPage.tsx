import { ArrowRight } from "lucide-react";
import KpiCard from "../components/KpiCard";
import PageHeader from "../components/PageHeader";
import ProcessFlowCard from "../components/ProcessFlowCard";
import { kpis, processFlows } from "../data/mockData";

function OverviewPage({ onOpenAnomaly }: { onOpenAnomaly: () => void }) {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Executive overview"
        title="AI-enabled process redesign at a glance"
        description="The dashboard makes automation, expert validation, and operator responsibility visible in one presentation-ready view."
        action={
          <button type="button" className="primary-button" onClick={onOpenAnomaly}>
            <ArrowRight size={17} aria-hidden="true" />
            Open anomaly PoC
          </button>
        }
      />

      <section className="kpi-grid" aria-label="Dashboard KPI cards">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </section>

      <section className="section-card">
        <div className="section-heading">
          <h4>Process Flow Overview</h4>
          <p>Each process separates AI assistance from human review and final action.</p>
        </div>
        <div className="process-grid">
          {processFlows.map((flow) => (
            <ProcessFlowCard key={flow.title} {...flow} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default OverviewPage;
