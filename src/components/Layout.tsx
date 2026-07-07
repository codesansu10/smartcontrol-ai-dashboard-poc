import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
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
  signalIcon: LucideIcon;
  children: ReactNode;
}

function Layout({ activePage, navItems, onNavigate, signalIcon: SignalIcon, children }: LayoutProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand-block">
          <div className="brand-mark">
            <SignalIcon size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="brand-kicker">OEKOBIT PoC</p>
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
          <div>
            <p className="eyebrow">Phase 3 PoC visual mockup</p>
            <h2>SMARTCONTROL 2.0 AI Dashboard</h2>
            <p>Frontend PoC visual for AI-enabled process redesign</p>
          </div>
        </header>
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
