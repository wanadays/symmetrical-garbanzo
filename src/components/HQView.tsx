import { useState } from "react";
import type { Announcement, Outlet } from "../types";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementForm from "./AnnouncementForm";
import AnnouncementDetail from "./AnnouncementDetail";

interface HQViewProps {
  announcements: Announcement[];
  outlets: Outlet[];
  onCreateAnnouncement: (announcement: Announcement) => void;
}

type HQScreen = "list" | "create" | "detail";

export default function HQView({ announcements, outlets, onCreateAnnouncement }: HQViewProps) {
  const [screen, setScreen] = useState<HQScreen>("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedAnnouncement = announcements.find((a) => a.id === selectedId) ?? null;

  function handleCardClick(id: string) {
    setSelectedId(id);
    setScreen("detail");
  }

  if (screen === "create") {
    return (
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-apple-text mb-6">
          New Announcement
        </h2>
        <div className="bg-apple-card rounded-2xl border border-apple-border p-6">
          <AnnouncementForm
            outlets={outlets}
            onSubmit={(a) => {
              onCreateAnnouncement(a);
              setScreen("list");
            }}
            onCancel={() => setScreen("list")}
          />
        </div>
      </div>
    );
  }

  if (screen === "detail" && selectedAnnouncement) {
    return (
      <AnnouncementDetail
        announcement={selectedAnnouncement}
        outlets={outlets}
        onBack={() => setScreen("list")}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-apple-text">
            Announcements
          </h2>
          <p className="text-sm text-apple-secondary mt-1">
            Manage and track announcements across all outlets
          </p>
        </div>
        <button
          onClick={() => setScreen("create")}
          className="px-5 py-2.5 bg-apple-blue text-white rounded-xl text-sm font-semibold
                     hover:bg-apple-blue-hover transition-all shadow-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Announcement
        </button>
      </div>

      {/* Announcement list */}
      {announcements.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-apple-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-apple-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-apple-text mb-1">No announcements yet</h3>
          <p className="text-sm text-apple-secondary">Create your first announcement to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              outlets={outlets}
              onClick={() => handleCardClick(announcement.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
