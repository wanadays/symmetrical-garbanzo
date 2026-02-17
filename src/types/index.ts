export interface Outlet {
  id: string;
  name: string;
  location: string;
}

export interface AcknowledgmentItem {
  id: string;
  label: string;
}

export type OutletStatus = "pending" | "done";

export interface OutletAcknowledgment {
  outletId: string;
  status: OutletStatus;
  /** Which acknowledgment item IDs have been checked off */
  checkedItems: string[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  /** IDs of targeted outlets (empty = none selected) */
  targetOutletIds: string[];
  acknowledgmentItems: AcknowledgmentItem[];
  /** Status tracking per outlet */
  outletAcknowledgments: OutletAcknowledgment[];
}
