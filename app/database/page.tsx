import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import StatCard from "@/components/dashboard/StatCard";
import DatabaseTable from "@/components/dashboard/DatabaseTable";
import { visitorStats } from "@/data/visitors";

export default function DatabasePage() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-8 py-7">
          <h1 className="text-xl font-semibold text-foreground mb-6 tracking-tight">
            Database
          </h1>

          {/* 3 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {visitorStats.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>

          {/* Table */}
          <DatabaseTable />
        </main>
      </div>
    </div>
  );
}
