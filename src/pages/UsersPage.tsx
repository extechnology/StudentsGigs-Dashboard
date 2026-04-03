import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { DateFilterBar } from "@/components/DateFilterBar";
import { useDateFilter } from "@/hooks/useDateFilter";
import { employees, employers } from "@/lib/mock-data";
import { Users, Building2, UserCheck, UserX, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { filter, setPreset, setCustomRange, filterByDate } = useDateFilter();

  const dateFilteredEmployees = useMemo(() => filterByDate(employees, "joinDate"), [filterByDate]);
  const dateFilteredEmployers = useMemo(() => filterByDate(employers, "joinDate"), [filterByDate]);

  const activeEmployees = dateFilteredEmployees.filter((e) => e.status === "active").length;
  const activeEmployers = dateFilteredEmployers.filter((e) => e.status === "active").length;

  const filteredEmployees = dateFilteredEmployees.filter(
    (e) => e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredEmployers = dateFilteredEmployers.filter(
    (e) => e.company.toLowerCase().includes(searchTerm.toLowerCase()) || e.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Users Management</h1>
            <p className="text-muted-foreground mt-1">Manage all employees and employers on the platform.</p>
          </div>
          <DateFilterBar preset={filter.preset} from={filter.from} to={filter.to} onPresetChange={setPreset} onCustomRangeChange={setCustomRange} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Employees" value={dateFilteredEmployees.length} change="+12%" changeType="positive" icon={Users} iconColor="hsl(200, 80%, 50%)" delay={0} />
          <StatCard title="Total Employers" value={dateFilteredEmployers.length} change="+8%" changeType="positive" icon={Building2} iconColor="hsl(150, 60%, 45%)" delay={0.1} />
          <StatCard title="Active Users" value={activeEmployees + activeEmployers} icon={UserCheck} iconColor="hsl(24, 95%, 53%)" delay={0.2} />
          <StatCard title="Inactive Users" value={dateFilteredEmployees.length + dateFilteredEmployers.length - activeEmployees - activeEmployers} icon={UserX} iconColor="hsl(0, 84%, 60%)" delay={0.3} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-muted/50 border-transparent focus:border-primary/30" />
            </div>
          </div>

          <Tabs defaultValue="employees">
            <TabsList className="bg-muted/50 mb-6">
              <TabsTrigger value="employees" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Employees ({dateFilteredEmployees.length})</TabsTrigger>
              <TabsTrigger value="employers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Employers ({dateFilteredEmployers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="employees">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Name</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden md:table-cell">Role</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden sm:table-cell">Plan</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Status</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden lg:table-cell">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((emp, i) => (
                      <motion.tr key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-accent-foreground">{emp.name.charAt(0)}</div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{emp.name}</p>
                              <p className="text-xs text-muted-foreground md:hidden">{emp.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{emp.role}</td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${emp.plan === "premium" ? "bg-primary/10 text-primary" : emp.plan === "standard" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"}`}>{emp.plan}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${emp.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{emp.status}</span>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground hidden lg:table-cell">{emp.joinDate}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="employers">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Company</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden md:table-cell">Industry</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden sm:table-cell">Plan</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Jobs</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployers.map((emp, i) => (
                      <motion.tr key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">{emp.company.charAt(0)}</div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{emp.company}</p>
                              <p className="text-xs text-muted-foreground">{emp.contactPerson}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{emp.industry}</td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${emp.plan === "premium" ? "bg-primary/10 text-primary" : emp.plan === "standard" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"}`}>{emp.plan}</span>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-foreground">{emp.jobsPosted}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${emp.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{emp.status}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
