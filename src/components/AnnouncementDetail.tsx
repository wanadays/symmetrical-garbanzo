import type { Announcement, Outlet } from "../types";

interface AnnouncementDetailProps {
  announcement: Announcement;
  outlets: Outlet[];
  onBack: () => void;
}

export default function AnnouncementDetail({ announcement, outlets, onBack }: AnnouncementDetailProps) {
  const doneCount = announcement.outletAcknowledgments.filter((a) => a.status === "done").length;
  const totalCount = announcement.outletAcknowledgments.length;

  const date = new Date(announcement.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-apple-blue text-sm font-medium mb-6
                   hover:underline transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Back to Announcements
      </button>

      {/* Header */}
      <div className="bg-apple-card rounded-2xl border border-apple-border p-6 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-apple-text">{announcement.title}</h2>
            <p className="text-xs text-apple-secondary mt-1">{date}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-apple-blue/10 text-apple-blue">
            {doneCount}/{totalCount} Complete
          </span>
        </div>
        <p className="text-sm text-apple-secondary leading-relaxed">{announcement.content}</p>
      </div>

      {/* Acknowledgment items */}
      <div className="bg-apple-card rounded-2xl border border-apple-border p-6 mb-4">
        <h3 className="text-sm font-semibold text-apple-text mb-3">Required Acknowledgments</h3>
        <div className="space-y-2">
          {announcement.acknowledgmentItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 px-3 py-2 bg-apple-bg rounded-xl">
              <svg className="w-4 h-4 text-apple-blue shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span className="text-sm text-apple-text">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Outlet status list */}
      <div className="bg-apple-card rounded-2xl border border-apple-border overflow-hidden">
        <div className="px-6 py-4 border-b border-apple-border">
          <h3 className="text-sm font-semibold text-apple-text">Outlet Status</h3>
        </div>
        {announcement.outletAcknowledgments.map((ack, i) => {
          const outlet = outlets.find((o) => o.id === ack.outletId);
          if (!outlet) return null;
          const checkedCount = ack.checkedItems.length;
          const totalItems = announcement.acknowledgmentItems.length;

          return (
            <div
              key={ack.outletId}
              className={`flex items-center gap-4 px-6 py-4 ${
                i < announcement.outletAcknowledgments.length - 1 ? "border-b border-apple-border" : ""
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                ack.status === "done" ? "bg-apple-green" : "bg-apple-orange"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-apple-text">{outlet.name}</p>
                <p className="text-xs text-apple-secondary">{outlet.location}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  ack.status === "done"
                    ? "bg-apple-green/10 text-apple-green"
                    : "bg-apple-orange/10 text-apple-orange"
                }`}>
                  {ack.status === "done" ? "Done" : "Pending"}
                </span>
                <p className="text-[11px] text-apple-secondary mt-1">
                  {checkedCount}/{totalItems} items
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
