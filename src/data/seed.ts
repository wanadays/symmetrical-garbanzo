import type { Outlet, Announcement } from "../types";

export const OUTLETS: Outlet[] = [
  { id: "outlet-1", name: "Downtown Flagship", location: "123 Main St" },
  { id: "outlet-2", name: "Westside Mall", location: "456 West Ave" },
  { id: "outlet-3", name: "Airport Terminal", location: "789 Sky Rd" },
  { id: "outlet-4", name: "Harbor Point", location: "321 Dock Ln" },
  { id: "outlet-5", name: "University Campus", location: "654 College Blvd" },
];

export const SEED_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "New Seasonal Menu Launch",
    content:
      "All outlets must update their menu boards and POS systems to reflect the new Spring 2026 seasonal items. Please ensure all staff are briefed on new ingredients and allergen information.",
    createdAt: "2026-02-10T09:00:00Z",
    targetOutletIds: ["outlet-1", "outlet-2", "outlet-3", "outlet-4", "outlet-5"],
    acknowledgmentItems: [
      { id: "ack-1a", label: "Menu boards updated" },
      { id: "ack-1b", label: "POS system updated" },
      { id: "ack-1c", label: "Staff briefed on allergens" },
    ],
    outletAcknowledgments: [
      { outletId: "outlet-1", status: "done", checkedItems: ["ack-1a", "ack-1b", "ack-1c"] },
      { outletId: "outlet-2", status: "done", checkedItems: ["ack-1a", "ack-1b", "ack-1c"] },
      { outletId: "outlet-3", status: "pending", checkedItems: ["ack-1a"] },
      { outletId: "outlet-4", status: "pending", checkedItems: [] },
      { outletId: "outlet-5", status: "pending", checkedItems: [] },
    ],
  },
  {
    id: "ann-2",
    title: "Health & Safety Inspection Prep",
    content:
      "A scheduled health & safety inspection is coming up next week. Please ensure all areas are clean, fire exits are unobstructed, and first-aid kits are fully stocked.",
    createdAt: "2026-02-14T14:30:00Z",
    targetOutletIds: ["outlet-1", "outlet-3"],
    acknowledgmentItems: [
      { id: "ack-2a", label: "I understand the requirements" },
      { id: "ack-2b", label: "Fire exits checked" },
      { id: "ack-2c", label: "First-aid kits restocked" },
    ],
    outletAcknowledgments: [
      { outletId: "outlet-1", status: "pending", checkedItems: [] },
      { outletId: "outlet-3", status: "pending", checkedItems: [] },
    ],
  },
];
