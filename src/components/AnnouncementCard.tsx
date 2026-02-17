import type { Announcement, Outlet } from "../types";

interface AnnouncementCardProps {
  announcement: Announcement;
  outlets: Outlet[];
  onClick: () => void;
}

export default function AnnouncementCard({ announcement, outlets, onClick }: AnnouncementCardProps) {
  const doneCount = announcement.outletAcknowledgments.filter(
    (a) => a.status === "done"
  ).length;
  const totalCount = announcement.outletAcknowledgments.length;
  const allDone = doneCount === totalCount && totalCount > 0;
  const progress = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  const targetOutletNames = announcement.targetOutletIds
    .map((id) => outlets.find((o) => o.id === id)?.name)
    .filter(Boolean);

  const date = new Date(announcement.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-apple-card rounded-2xl border border-apple-border p-5
                 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-apple-text truncate group-hover:text-apple-blue transition-colors">
            {announcement.title}
          </h3>
          <p className="text-xs text-apple-secondary mt-0.5">{date}</p>
        </div>
        <span
          className={`shrink-0 ml-3 px-2.5 py-1 rounded-full text-xs font-medium ${
            allDone
              ? "bg-apple-green/10 text-apple-green"
              : "bg-apple-orange/10 text-apple-orange"
          }`}
        >
          {allDone ? "Complete" : `${doneCount}/${totalCount}`}
        </span>
      </div>

      <p className="text-sm text-apple-secondary line-clamp-2 mb-4">
        {announcement.content}
      </p>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-apple-bg rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            allDone ? "bg-apple-green" : "bg-apple-blue"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Outlet chips */}
      <div className="flex flex-wrap gap-1.5">
        {targetOutletNames.slice(0, 3).map((name) => (
          <span
            key={name}
            className="px-2 py-0.5 bg-apple-bg rounded-md text-[11px] text-apple-secondary"
          >
            {name}
          </span>
        ))}
        {targetOutletNames.length > 3 && (
          <span className="px-2 py-0.5 bg-apple-bg rounded-md text-[11px] text-apple-secondary">
            +{targetOutletNames.length - 3} more
          </span>
        )}
      </div>
    </button>
  );
}
