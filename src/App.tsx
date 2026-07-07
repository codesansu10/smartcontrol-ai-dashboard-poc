import {
  AlertTriangle,
  FileText,
  LayoutDashboard,
  Send,
  ShieldCheck,
} from "lucide-react";
import Layout from "./components/Layout";
import AnomalyDetectionPage from "./pages/AnomalyDetectionPage";
import CustomerUpdatesPage from "./pages/CustomerUpdatesPage";
import DashboardPage from "./pages/DashboardPage";
import MonthlyReportingPage from "./pages/MonthlyReportingPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsAboutPage from "./pages/SettingsAboutPage";
import type { PageKey } from "./types";
import { useEffect, useState } from "react";

const navItems = [
  { key: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { key: "anomaly" as const, label: "Anomaly Detection", icon: AlertTriangle },
  { key: "reporting" as const, label: "Monthly Expert Reporting", icon: FileText },
  { key: "updates" as const, label: "Customer Status Updates", icon: Send },
  { key: "reports" as const, label: "Reports", icon: FileText },
  { key: "settings" as const, label: "Settings/About", icon: ShieldCheck },
];

function App() {
  const [activePage, setActivePage] = useState<PageKey>("dashboard");

  useEffect(() => {
    const handler = (event: Event) => {
      const page = (event as CustomEvent<PageKey>).detail;
      if (page) setActivePage(page);
    };

    window.addEventListener("smartcontrol:navigate", handler);
    return () => window.removeEventListener("smartcontrol:navigate", handler);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage onOpenAnomaly={() => setActivePage("anomaly")} />;
      case "anomaly":
        return <AnomalyDetectionPage />;
      case "reporting":
        return <MonthlyReportingPage />;
      case "updates":
        return <CustomerUpdatesPage />;
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
