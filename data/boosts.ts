export type BoostStatus = "Completed" | "Ongoing";

export interface Boost {
  id: number;
  title: string;
  labels: string[];
  status: BoostStatus;
  daysLeft?: number;
  gradient: string;
}

export const boosts: Boost[] = [
  {
    id: 1,
    title: "Helping a local business reinvent itself",
    labels: ["Gender", "Degree", "Age"],
    status: "Completed",
    gradient: "linear-gradient(135deg, #23D3FF 0%, #FDF5E0 38%, #FFC78C 68%, #FF1B07 100%)",
  },
  {
    id: 2,
    title: "Lessons and insights from 8 years of Pixelgrade",
    labels: ["Gender", "Degree", "Age"],
    status: "Ongoing",
    daysLeft: 2,
    gradient: "linear-gradient(135deg, #A790F3 0%, #BA84FF 35%, #5A46F5 89%)",
  },
  {
    id: 3,
    title: "How does writing influence your personal brand?",
    labels: ["Gender", "Degree", "Age"],
    status: "Completed",
    gradient: "linear-gradient(135deg, #E905FD 0%, #057AFD 58%, #00036E 100%)",
  },
  {
    id: 4,
    title: "Caring is the new marketing",
    labels: ["Gender", "Degree", "Age"],
    status: "Ongoing",
    daysLeft: 2,
    gradient: "linear-gradient(135deg, #F6E4F0 0%, #E16766 49%, #F756F2 100%)",
  },
  {
    id: 5,
    title: "Travelling as a way of self-discovery and...",
    labels: ["Gender", "Degree", "Age"],
    status: "Ongoing",
    daysLeft: 2,
    gradient: "linear-gradient(135deg, #E905FD 0%, #057AFD 58%, #00036E 100%)",
  },
  {
    id: 6,
    title: "How to choose the right colors when cr...",
    labels: ["Gender", "Degree", "Age"],
    status: "Ongoing",
    daysLeft: 2,
    gradient: "linear-gradient(135deg, #FFFFFA 0%, #EBA6FF 37%, #ED02F4 65%, #FF2354 100%)",
  },
  {
    id: 7,
    title: "How to choose the right customer for your photo business?",
    labels: ["Gender", "Degree", "Age"],
    status: "Completed",
    gradient: "linear-gradient(135deg, #FDFFFE 0%, #FAFF70 36%, #60FFDE 64%, #0030DC 100%)",
  },
  {
    id: 8,
    title: "Starting your traveling blog with Vasco",
    labels: ["Gender", "Degree", "Age"],
    status: "Ongoing",
    daysLeft: 2,
    gradient: "linear-gradient(135deg, #23D3FF 0%, #FDF5E0 38%, #FFC78C 68%, #FF1B07 100%)",
  },
  {
    id: 9,
    title: "How to build a loyal community online and offline",
    labels: ["Gender", "Degree", "Age"],
    status: "Ongoing",
    daysLeft: 2,
    gradient: "linear-gradient(135deg, #FF5F1F 0%, #F5E700 49%, #6EFE95 100%)",
  },
  {
    id: 10,
    title: "How to optimize images in WordPress for faster loading",
    labels: ["Gender", "Degree", "Age"],
    status: "Ongoing",
    daysLeft: 2,
    gradient: "linear-gradient(135deg, #E905FD 0%, #057AFD 58%, #00036E 100%)",
  },
  {
    id: 11,
    title: "How to design your site footer like we did",
    labels: ["Gender", "Degree", "Age"],
    status: "Ongoing",
    daysLeft: 2,
    gradient: "linear-gradient(135deg, #A790F3 0%, #E95C00 45%, #FFC548 100%)",
  },
  {
    id: 12,
    title: "Dashboard for database admin",
    labels: ["Gender", "Degree", "Age"],
    status: "Completed",
    gradient: "linear-gradient(135deg, #A790F3 0%, #BA84FF 35%, #5A46F5 89%)",
  },
];
