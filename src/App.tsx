import { useState } from "react";
import Sidebar, { type View } from "./components/Sidebar";
import HQView from "./components/HQView";
import OutletView from "./components/OutletView";
import type { Announcement } from "./types";
import { OUTLETS, SEED_ANNOUNCEMENTS } from "./data/seed";

export default function App() {
  const [activeView, setActiveView] = useState<View>("hq");
  const [announcements, setAnnouncements] = useState<Announcement[]>(SEED_ANNOUNCEMENTS);

  function handleCreateAnnouncement(announcement: Announcement) {
    setAnnouncements((prev) => [announcement, ...prev]);
  }

  function handleAcknowledge(
    announcementId: string,
    outletId: string,
    itemId: string,
    checked: boolean
  ) {
    setAnnouncements((prev) =>
      prev.map((ann) => {
        if (ann.id !== announcementId) return ann;

        const updatedAcks = ann.outletAcknowledgments.map((ack) => {
          if (ack.outletId !== outletId) return ack;

          const checkedItems = checked
            ? [...ack.checkedItems, itemId]
            : ack.checkedItems.filter((id) => id !== itemId);

          const allChecked = ann.acknowledgmentItems.every((item) =>
            checkedItems.includes(item.id)
          );

          return {
            ...ack,
            checkedItems,
            status: allChecked ? ("done" as const) : ("pending" as const),
          };
        });

        return { ...ann, outletAcknowledgments: updatedAcks };
      })
    );
  }

  return (
    <div className="flex h-screen bg-apple-bg">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">
          {activeView === "hq" ? (
            <HQView
              announcements={announcements}
              outlets={OUTLETS}
              onCreateAnnouncement={handleCreateAnnouncement}
            />
          ) : (
            <OutletView
              announcements={announcements}
              outlets={OUTLETS}
              onAcknowledge={handleAcknowledge}
            />
          )}
        </div>
      </main>
    </div>
  );
}
