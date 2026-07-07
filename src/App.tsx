import {
  Activity,
  AlertTriangle,
  ClipboardCheck,
  FileText,
  Home,
  Send,
  ShieldCheck,
} from "lucide-react";
import Layout from "./components/Layout";
import AnomalyDetectionPage from "./pages/AnomalyDetectionPage";
import CustomerUpdatesPage from "./pages/CustomerUpdatesPage";
import MonthlyReportingPage from "./pages/MonthlyReportingPage";
import OverviewPage from "./pages/OverviewPage";
import ResponsibleAIPage from "./pages/ResponsibleAIPage";
import type { PageKey } from "./types";
import { useState } from "react";

const navItems = [
  { key: "overview" as const, label: "Overview", icon: Home },
  { key: "anomaly" as const, label: "Anomaly Detection", icon: AlertTriangle },
  { key: "reporting" as const, label: "Monthly Reporting", icon: FileText },
  { key: "updates" as const, label: "Customer Updates", icon: Send },
  { key: "responsible" as const, label: "Responsible AI", icon: ShieldCheck },
];

function App() {
  const [activePage, setActivePage] = useState<PageKey>("anomaly");

  const renderPage = () => {
    switch (activePage) {
      case "overview":
        return <OverviewPage onOpenAnomaly={() => setActivePage("anomaly")} />;
      case "anomaly":
        return <AnomalyDetectionPage />;
      case "reporting":
        return <MonthlyReportingPage />;
      case "updates":
        return <CustomerUpdatesPage />;
      case "responsible":
        return <ResponsibleAIPage />;
      default:
        return <OverviewPage onOpenAnomaly={() => setActivePage("anomaly")} />;
    }
  };

  return (
    <Layout
      activePage={activePage}
      navItems={navItems}
      onNavigate={setActivePage}
      signalIcon={Activity}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
