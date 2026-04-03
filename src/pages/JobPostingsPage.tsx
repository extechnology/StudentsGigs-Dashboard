import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { DateFilterBar } from "@/components/DateFilterBar";
import { useDateFilter } from "@/hooks/useDateFilter";
import { jobPostings } from "@/lib/mock-data";
import { Briefcase, Globe, MapPin, Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function JobPostingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { filter, setPreset, setCustomRange, filterByDate } = useDateFilter();

  const filteredByDate = useMemo(() => filterByDate(jobPostings, "postedDate"), [filterByDate]);

  const onlineJobs = filteredByDate.filter((j) => j.type === "online");
  const offlineJobs = filteredByDate.filter((j) => j.type === "offline");
  const activeJobs = filteredByDate.filter((j) => j.status === "active").length;
  const totalApplicants = filteredByDate.reduce((sum, j) => sum + j.applicants, 0);

  const categoryData = filteredByDate.reduce((acc, j) => {
    const existing = acc.find((a) => a.category === j.category);
    if (existing) existing.count++;
    else acc.push({ category: j.category, count: 1 });
    return acc;
  }, [] as { category: string; count: number }[]);

  const filterJobs = (jobs: typeof jobPostings) =>
    jobs.filter(
      (j) => j.title.toLowerCase().includes(searchTerm.toLowerCase()) || j.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const JobTable = ({ jobs }: { jobs: typeof jobPostings }) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Job Title</th>
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden md:table-cell">Company</th>
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden sm:table-cell">Location</th>
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden lg:table-cell">Salary</th>
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Applicants</th>
            <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, i) => (
            <motion.tr key={job.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
              <td className="py-3 px-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{job.title}</p>
                  <p className="text-xs text-muted-foreground md:hidden">{job.company}</p>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{job.company}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{job.location}</td>
              <td className="py-3 px-4 text-sm font-medium text-foreground hidden lg:table-cell">{job.salary}</td>
              <td className="py-3 px-4 text-sm font-semibold text-foreground">{job.applicants}</td>
              <td className="py-3 px-4">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${job.status === "active" ? "bg-success/10 text-success" : job.status === "closed" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                  {job.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Job Postings</h1>
            <p className="text-muted-foreground mt-1">All jobs posted by employers across the platform.</p>
          </div>
          <DateFilterBar preset={filter.preset} from={filter.from} to={filter.to} onPresetChange={setPreset} onCustomRangeChange={setCustomRange} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Jobs" value={filteredByDate.length} icon={Briefcase} iconColor="hsl(24, 95%, 53%)" delay={0} />
          <StatCard title="Online Jobs" value={onlineJobs.length} icon={Globe} iconColor="hsl(200, 80%, 50%)" delay={0.1} />
          <StatCard title="Offline Jobs" value={offlineJobs.length} icon={MapPin} iconColor="hsl(150, 60%, 45%)" delay={0.2} />
          <StatCard title="Total Applicants" value={totalApplicants} change="+18%" changeType="positive" icon={Eye} iconColor="hsl(280, 65%, 55%)" delay={0.3} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground text-lg mb-4">Jobs by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="count" fill="hsl(24, 95%, 53%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-muted/50 border-transparent focus:border-primary/30" />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="bg-muted/50 mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All ({filteredByDate.length})</TabsTrigger>
              <TabsTrigger value="online" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Online ({onlineJobs.length})</TabsTrigger>
              <TabsTrigger value="offline" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Offline ({offlineJobs.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="all"><JobTable jobs={filterJobs(filteredByDate)} /></TabsContent>
            <TabsContent value="online"><JobTable jobs={filterJobs(onlineJobs)} /></TabsContent>
            <TabsContent value="offline"><JobTable jobs={filterJobs(offlineJobs)} /></TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
