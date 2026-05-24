import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import StatCard from "@/components/dashboard/StatCard";
import CampaignTable from "@/components/dashboard/CampaignTable";
import { statCards } from "@/data/campaigns";

export default function CampaignsPage() {
  return (
    <div className="flex h-screen bg-muted/30 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-8 py-7">
          {/* Heading */}
          <h1 className="text-xl font-semibold text-foreground mb-6 tracking-tight">
            Campaigns
          </h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {statCards.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>

          {/* Table */}
          <CampaignTable />
        </main>
      </div>
    </div>
  );
}
