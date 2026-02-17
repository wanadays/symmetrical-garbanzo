export type View = "hq" | "outlet";

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const NAV_ITEMS: { view: View; label: string; icon: string }[] = [
  { view: "hq", label: "HQ View", icon: "building" },
  { view: "outlet", label: "Outlet View", icon: "store" },
];

function NavIcon({ type }: { type: string }) {
  if (type === "building") {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
    </svg>
  );
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 bg-apple-sidebar border-r border-apple-border flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-xl font-semibold tracking-tight text-apple-text">
          Store Sync
        </h1>
        <p className="text-xs text-apple-secondary mt-1 tracking-wide">
          Announcement Manager
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        {NAV_ITEMS.map(({ view, label, icon }) => {
          const isActive = activeView === view;
          return (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 mb-1
                ${isActive
                  ? "bg-apple-blue text-white shadow-sm"
                  : "text-apple-text hover:bg-black/5"
                }
              `}
            >
              <NavIcon type={icon} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-apple-border">
        <p className="text-[11px] text-apple-secondary">
          Store Sync v1.0
        </p>
      </div>
    </aside>
  );
}
