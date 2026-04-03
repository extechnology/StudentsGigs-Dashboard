import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { DateFilterBar } from "@/components/DateFilterBar";
import { useDateFilter } from "@/hooks/useDateFilter";
import { employees, employers, jobPostings, monthlyRevenue, planDistribution } from "@/lib/mock-data";
import { Users, Building2, DollarSign, Briefcase } from "lucide-react";
import { useMemo } from "react";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { PlanDistribution } from "@/components/dashboard/PlanDistribution";
import { RecentEmployees } from "@/components/dashboard/RecentEmployees";
import { RecentJobs } from "@/components/dashboard/RecentJobs";

export default function DashboardOverview() {
  const { filter, setPreset, setCustomRange, filterByDate } = useDateFilter();

  const filteredEmployees = useMemo(() => filterByDate(employees, "joinDate"), [filterByDate]);
  const filteredEmployers = useMemo(() => filterByDate(employers, "joinDate"), [filterByDate]);
  const filteredJobs = useMemo(() => filterByDate(jobPostings, "postedDate"), [filterByDate]);

  const totalEmployees = filteredEmployees.length;
  const totalEmployers = filteredEmployers.length;
  const totalRevenue = filteredEmployees.reduce((sum, e) => sum + e.planPrice, 0) + filteredEmployers.reduce((sum, e) => sum + e.planPrice, 0);
  const totalJobs = filteredJobs.filter((j) => j.status === "active").length;

  const pieColors = ["hsl(20, 10%, 55%)", "hsl(200, 80%, 50%)", "hsl(24, 95%, 53%)"];
  const pieData = planDistribution.map((p) => ({
    name: p.name,
    value: filteredEmployees.filter(e => e.plan === p.name.toLowerCase()).length + filteredEmployers.filter(e => e.plan === p.name.toLowerCase()).length,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening.</p>
          </div>
          <DateFilterBar preset={filter.preset} from={filter.from} to={filter.to} onPresetChange={setPreset} onCustomRangeChange={setCustomRange} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Employees" value={totalEmployees} change="+12%" changeType="positive" icon={Users} iconColor="hsl(200, 80%, 50%)" delay={0} />
          <StatCard title="Total Employers" value={totalEmployers} change="+8%" changeType="positive" icon={Building2} iconColor="hsl(150, 60%, 45%)" delay={0.1} />
          <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} change="+24%" changeType="positive" icon={DollarSign} iconColor="hsl(24, 95%, 53%)" delay={0.2} />
          <StatCard title="Active Jobs" value={totalJobs} change="+5" changeType="positive" icon={Briefcase} iconColor="hsl(280, 65%, 55%)" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RevenueChart data={monthlyRevenue} />
          <PlanDistribution data={pieData} colors={pieColors} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RecentEmployees employees={filteredEmployees.slice(0, 5) as any[]} />
          <RecentJobs jobs={filteredJobs.slice(0, 5) as any[]} />
        </div>
      </div>
    </DashboardLayout>
  );
}
