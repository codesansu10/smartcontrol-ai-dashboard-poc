import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { OEKOBIT_LOGO_URL } from "../data/mockData";
import type { PageKey } from "../types";

interface NavItem {
  key: PageKey;
  label: string;
  icon: LucideIcon;
}

interface LayoutProps {
  activePage: PageKey;
  navItems: NavItem[];
  onNavigate: (page: PageKey) => void;
  children: ReactNode;
}

function Layout({ activePage, navItems, onNavigate, children }: LayoutProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand-block">
          <img className="brand-logo" src={OEKOBIT_LOGO_URL} alt="OEKOBIT Biogas" />
          <div>
            <p className="brand-kicker">OEKOBIT Biogas</p>
            <h1>SMARTCONTROL 2.0</h1>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.key}
                className={activePage === item.key ? "nav-item active" : "nav-item"}
                onClick={() => onNavigate(item.key)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="main-area">
        <header className="top-header">
          <div className="header-title-group">
            <img className="header-logo" src={OEKOBIT_LOGO_URL} alt="OEKOBIT Biogas" />
            <div>
              <p className="eyebrow">Industrial AI Monitoring PoC</p>
            <h2>SMARTCONTROL 2.0 AI Dashboard</h2>
              <p>Biogas Plant Monitoring, Anomaly Detection and Reporting</p>
            </div>
          </div>
        </header>
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
