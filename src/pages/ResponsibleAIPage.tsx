import PageHeader from "../components/PageHeader";
import ResponsibleAICard from "../components/ResponsibleAICard";
import { responsibleAiCards } from "../data/mockData";

function ResponsibleAIPage() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Responsible AI safeguards"
        title="Human-centered governance for AI-enabled plant workflows"
        description="The mockup keeps data quality, explainability, access rules, and human responsibility visible across the dashboard."
      />

      <section className="responsible-grid">
        {responsibleAiCards.map((card) => (
          <ResponsibleAICard key={card.title} {...card} />
        ))}
      </section>
    </div>
  );
}

export default ResponsibleAIPage;
