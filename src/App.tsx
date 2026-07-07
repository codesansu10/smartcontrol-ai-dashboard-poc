import {
  AlertTriangle,
  FileText,
  GitBranch,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import Layout from "./components/Layout";
import AnomalyDetectionPage from "./pages/AnomalyDetectionPage";
import AIProcessWorkflowPage from "./pages/AIProcessWorkflowPage";
import DashboardPage from "./pages/DashboardPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsAboutPage from "./pages/SettingsAboutPage";
import type { PageKey } from "./types";
import { useState } from "react";

const navItems = [
  { key: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { key: "anomaly" as const, label: "Anomaly Detection", icon: AlertTriangle },
  { key: "workflow" as const, label: "AI Process Workflow", icon: GitBranch },
  { key: "reports" as const, label: "Reports", icon: FileText },
  { key: "settings" as const, label: "Settings/About", icon: ShieldCheck },
];

function App() {
  const [activePage, setActivePage] = useState<PageKey>("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage onOpenAnomaly={() => setActivePage("anomaly")} />;
      case "anomaly":
        return <AnomalyDetectionPage />;
      case "workflow":
        return <AIProcessWorkflowPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsAboutPage />;
      default:
        return <DashboardPage onOpenAnomaly={() => setActivePage("anomaly")} />;
    }
  };

  return (
    <Layout
      activePage={activePage}
      navItems={navItems}
      onNavigate={setActivePage}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
