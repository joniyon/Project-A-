export type CampaignStatus = "Completed" | "In Progress" | "Inactive";

export type CampaignLabel =
  | "Location"
  | "Gender"
  | "Age"
  | "Work Type"
  | "Income"
  | "Degree"
  | "Earnings"
  | "Experience";

export interface Campaign {
  id: number;
  title: string;
  labels: CampaignLabel[];
  reward: number;
  status: CampaignStatus;
  gradient: string; // Tailwind gradient classes
}

export type TabKey = "all" | "in-progress" | "inactive" | "completed";

export interface Tab {
  key: TabKey;
  label: string;
  count: number;
}
