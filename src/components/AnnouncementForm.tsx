import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Outlet, Announcement, AcknowledgmentItem } from "../types";

interface AnnouncementFormProps {
  outlets: Outlet[];
  onSubmit: (announcement: Announcement) => void;
  onCancel: () => void;
}

export default function AnnouncementForm({ outlets, onSubmit, onCancel }: AnnouncementFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedOutletIds, setSelectedOutletIds] = useState<string[]>(
    outlets.map((o) => o.id)
  );
  const [ackItems, setAckItems] = useState<AcknowledgmentItem[]>([
    { id: uuidv4(), label: "I understand" },
  ]);
  const [newAckLabel, setNewAckLabel] = useState("");

  const allSelected = selectedOutletIds.length === outlets.length;

  function toggleSelectAll() {
    setSelectedOutletIds(allSelected ? [] : outlets.map((o) => o.id));
  }

  function toggleOutlet(outletId: string) {
    setSelectedOutletIds((prev) =>
      prev.includes(outletId)
        ? prev.filter((id) => id !== outletId)
        : [...prev, outletId]
    );
  }

  function addAckItem() {
    const label = newAckLabel.trim();
    if (!label) return;
    setAckItems((prev) => [...prev, { id: uuidv4(), label }]);
    setNewAckLabel("");
  }

  function removeAckItem(id: string) {
    setAckItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim() || selectedOutletIds.length === 0) return;

    const announcement: Announcement = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      targetOutletIds: selectedOutletIds,
      acknowledgmentItems: ackItems,
      outletAcknowledgments: selectedOutletIds.map((outletId) => ({
        outletId,
        status: "pending",
        checkedItems: [],
      })),
    };

    onSubmit(announcement);
  }

  const isValid = title.trim() && content.trim() && selectedOutletIds.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-apple-text mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. New Seasonal Menu Launch"
          className="w-full px-4 py-3 rounded-xl border border-apple-border bg-white
                     text-apple-text placeholder:text-apple-secondary/60
                     focus:outline-none focus:ring-2 focus:ring-apple-blue/30 focus:border-apple-blue
                     transition-all text-sm"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-apple-text mb-2">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Describe the announcement details..."
          className="w-full px-4 py-3 rounded-xl border border-apple-border bg-white
                     text-apple-text placeholder:text-apple-secondary/60
                     focus:outline-none focus:ring-2 focus:ring-apple-blue/30 focus:border-apple-blue
                     transition-all text-sm resize-none"
        />
      </div>

      {/* Target Outlets */}
      <div>
        <label className="block text-sm font-medium text-apple-text mb-2">
          Target Outlets
        </label>
        <div className="bg-white rounded-xl border border-apple-border overflow-hidden">
          {/* Select All */}
          <label className="flex items-center gap-3 px-4 py-3 border-b border-apple-border cursor-pointer hover:bg-apple-bg/50 transition-colors">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="w-4 h-4 rounded accent-apple-blue"
            />
            <span className="text-sm font-medium text-apple-text">Select All</span>
            <span className="ml-auto text-xs text-apple-secondary">
              {selectedOutletIds.length}/{outlets.length}
            </span>
          </label>
          {/* Individual outlets */}
          {outlets.map((outlet, i) => (
            <label
              key={outlet.id}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-apple-bg/50 transition-colors
                ${i < outlets.length - 1 ? "border-b border-apple-border" : ""}`}
            >
              <input
                type="checkbox"
                checked={selectedOutletIds.includes(outlet.id)}
                onChange={() => toggleOutlet(outlet.id)}
                className="w-4 h-4 rounded accent-apple-blue"
              />
              <div>
                <span className="text-sm text-apple-text">{outlet.name}</span>
                <span className="block text-xs text-apple-secondary">{outlet.location}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Acknowledgment Items */}
      <div>
        <label className="block text-sm font-medium text-apple-text mb-2">
          Acknowledgment Items
        </label>
        <div className="space-y-2 mb-3">
          {ackItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-apple-border"
            >
              <svg className="w-4 h-4 text-apple-secondary shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span className="text-sm text-apple-text flex-1">{item.label}</span>
              <button
                type="button"
                onClick={() => removeAckItem(item.id)}
                className="text-apple-secondary hover:text-apple-red transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newAckLabel}
            onChange={(e) => setNewAckLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAckItem();
              }
            }}
            placeholder="Add acknowledgment item..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-apple-border bg-white
                       text-apple-text placeholder:text-apple-secondary/60
                       focus:outline-none focus:ring-2 focus:ring-apple-blue/30 focus:border-apple-blue
                       transition-all text-sm"
          />
          <button
            type="button"
            onClick={addAckItem}
            disabled={!newAckLabel.trim()}
            className="px-4 py-2.5 rounded-xl bg-apple-bg border border-apple-border text-sm
                       font-medium text-apple-text hover:bg-gray-200
                       disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Add
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-xl border border-apple-border bg-white
                     text-sm font-medium text-apple-text hover:bg-apple-bg transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="flex-1 px-4 py-3 rounded-xl bg-apple-blue text-white text-sm font-semibold
                     hover:bg-apple-blue-hover disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all shadow-sm"
        >
          Send Announcement
        </button>
      </div>
    </form>
  );
}
