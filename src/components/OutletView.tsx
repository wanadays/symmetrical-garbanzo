import { useState } from "react";
import type { Announcement, Outlet } from "../types";

interface OutletViewProps {
  announcements: Announcement[];
  outlets: Outlet[];
  onAcknowledge: (announcementId: string, outletId: string, itemId: string, checked: boolean) => void;
}

export default function OutletView({ announcements, outlets, onAcknowledge }: OutletViewProps) {
  const [selectedOutletId, setSelectedOutletId] = useState(outlets[0]?.id ?? "");

  const selectedOutlet = outlets.find((o) => o.id === selectedOutletId);

  const relevantAnnouncements = announcements.filter((a) =>
    a.targetOutletIds.includes(selectedOutletId)
  );

  return (
    <div>
      {/* Header + outlet picker */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-apple-text mb-1">Outlet View</h2>
        <p className="text-sm text-apple-secondary mb-5">
          View and acknowledge announcements for your outlet
        </p>

        {/* Outlet selector */}
        <div className="flex gap-2 flex-wrap">
          {outlets.map((outlet) => {
            const isActive = outlet.id === selectedOutletId;
            return (
              <button
                key={outlet.id}
                onClick={() => setSelectedOutletId(outlet.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-apple-blue text-white shadow-sm"
                    : "bg-apple-card border border-apple-border text-apple-text hover:bg-gray-100"
                }`}
              >
                {outlet.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected outlet info */}
      {selectedOutlet && (
        <div className="bg-apple-card rounded-2xl border border-apple-border p-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-apple-blue/10 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-apple-blue" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-apple-text">{selectedOutlet.name}</h3>
              <p className="text-xs text-apple-secondary">{selectedOutlet.location}</p>
            </div>
            <span className="ml-auto text-xs text-apple-secondary">
              {relevantAnnouncements.length} announcement{relevantAnnouncements.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      )}

      {/* Announcements for this outlet */}
      {relevantAnnouncements.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-apple-secondary">No announcements for this outlet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {relevantAnnouncements.map((announcement) => {
            const ack = announcement.outletAcknowledgments.find(
              (a) => a.outletId === selectedOutletId
            );
            if (!ack) return null;

            const isDone = ack.status === "done";
            const date = new Date(announcement.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            return (
              <div
                key={announcement.id}
                className="bg-apple-card rounded-2xl border border-apple-border overflow-hidden"
              >
                {/* Announcement header */}
                <div className="px-5 pt-5 pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-[15px] font-semibold text-apple-text">
                      {announcement.title}
                    </h3>
                    <span
                      className={`shrink-0 ml-3 px-2.5 py-1 rounded-full text-xs font-medium ${
                        isDone
                          ? "bg-apple-green/10 text-apple-green"
                          : "bg-apple-orange/10 text-apple-orange"
                      }`}
                    >
                      {isDone ? "Done" : "Pending"}
                    </span>
                  </div>
                  <p className="text-xs text-apple-secondary mb-3">{date}</p>
                  <p className="text-sm text-apple-secondary leading-relaxed">
                    {announcement.content}
                  </p>
                </div>

                {/* Acknowledgment checklist */}
                <div className="border-t border-apple-border">
                  <div className="px-5 py-3 bg-apple-bg/50">
                    <p className="text-xs font-medium text-apple-secondary uppercase tracking-wider">
                      Acknowledgments
                    </p>
                  </div>
                  {announcement.acknowledgmentItems.map((item, i) => {
                    const isChecked = ack.checkedItems.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer
                          hover:bg-apple-bg/30 transition-colors
                          ${i < announcement.acknowledgmentItems.length - 1 ? "border-b border-apple-border" : ""}
                          ${isDone ? "opacity-60 pointer-events-none" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            onAcknowledge(announcement.id, selectedOutletId, item.id, e.target.checked)
                          }
                          disabled={isDone}
                          className="w-[18px] h-[18px] rounded accent-apple-blue"
                        />
                        <span className={`text-sm ${isChecked ? "text-apple-text" : "text-apple-secondary"}`}>
                          {item.label}
                        </span>
                        {isChecked && (
                          <svg className="w-4 h-4 text-apple-green ml-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
