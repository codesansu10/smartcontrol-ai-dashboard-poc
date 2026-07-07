import { ShieldCheck } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ResponsibleAICard from "../components/ResponsibleAICard";
import { OEKOBIT_LOGO_URL, responsibleAiCards } from "../data/mockData";

function SettingsAboutPage() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Settings and responsible AI"
        title="About SMARTCONTROL 2.0"
        description="A university PoC frontend showing how AI supports biogas plant monitoring without replacing expert or operator responsibility."
      />

      <section className="about-panel">
        <img src={OEKOBIT_LOGO_URL} alt="OEKOBIT Biogas" />
        <div>
          <h4>Biogas Plant Monitoring, Anomaly Detection and Reporting</h4>
          <p>
            The dashboard uses static dummy data to demonstrate grouped plant variables, rule-based monitoring,
            Isolation Forest anomaly detection, expert validation, operator action, reporting, and learning feedback.
          </p>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title-row">
          <ShieldCheck size={20} aria-hidden="true" />
          <div>
            <h4>Responsible AI safeguards</h4>
            <p>Visible safeguards keep the dashboard suitable for academic explanation and industrial trust.</p>
          </div>
        </div>
        <div className="responsible-grid">
          {responsibleAiCards.map((card) => (
            <ResponsibleAICard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default SettingsAboutPage;
