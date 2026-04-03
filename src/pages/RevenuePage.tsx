import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { DateFilterBar } from "@/components/DateFilterBar";
import { useDateFilter } from "@/hooks/useDateFilter";
import { employees, employers, monthlyRevenue } from "@/lib/mock-data";
import { DollarSign, TrendingUp, Users, Building2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RevenuePage() {
  const { filter, setPreset, setCustomRange, filterByDate } = useDateFilter();

  const filteredEmployees = useMemo(() => filterByDate(employees, "joinDate"), [filterByDate]);
  const filteredEmployers = useMemo(() => filterByDate(employers, "joinDate"), [filterByDate]);

  const employeeRevenue = filteredEmployees.filter((e) => e.planPrice > 0).reduce((sum, e) => sum + e.planPrice, 0);
  const employerRevenue = filteredEmployers.filter((e) => e.planPrice > 0).reduce((sum, e) => sum + e.planPrice, 0);
  const totalRevenue = employeeRevenue + employerRevenue;
  const paidUsers = [...filteredEmployees, ...filteredEmployers].filter((u) => u.planPrice > 0).length;

  const paidEmployees = filteredEmployees.filter((e) => e.planPrice > 0);
  const paidEmployers = filteredEmployers.filter((e) => e.planPrice > 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Revenue Overview</h1>
            <p className="text-muted-foreground mt-1">Track all revenue from employee and employer premium plans.</p>
          </div>
          <DateFilterBar preset={filter.preset} from={filter.from} to={filter.to} onPresetChange={setPreset} onCustomRangeChange={setCustomRange} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} change="+24%" changeType="positive" icon={DollarSign} iconColor="hsl(24, 95%, 53%)" delay={0} />
          <StatCard title="Employee Revenue" value={`$${employeeRevenue.toFixed(2)}`} change="+18%" changeType="positive" icon={Users} iconColor="hsl(200, 80%, 50%)" delay={0.1} />
          <StatCard title="Employer Revenue" value={`$${employerRevenue.toFixed(2)}`} change="+32%" changeType="positive" icon={Building2} iconColor="hsl(150, 60%, 45%)" delay={0.2} />
          <StatCard title="Paid Users" value={paidUsers} icon={TrendingUp} iconColor="hsl(280, 65%, 55%)" delay={0.3} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground text-lg mb-1">Revenue Trend</h3>
          <p className="text-sm text-muted-foreground mb-6">Monthly revenue breakdown</p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="total" stroke="hsl(24, 95%, 53%)" fill="url(#revTotal)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-6">
          <Tabs defaultValue="employees">
            <TabsList className="bg-muted/50 mb-6">
              <TabsTrigger value="employees" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Employees</TabsTrigger>
              <TabsTrigger value="employers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Employers</TabsTrigger>
            </TabsList>

            <TabsContent value="employees">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Name</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 hidden md:table-cell">Role</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Plan</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paidEmployees.map((emp, i) => (
                      <motion.tr key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-accent-foreground">{emp.name.charAt(0)}</div>
                            <p className="text-sm font-medium text-foreground">{emp.name}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{emp.role}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${emp.plan === "premium" ? "bg-primary/10 text-primary" : "bg-info/10 text-info"}`}>{emp.plan}</span>
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-foreground">${emp.planPrice.toFixed(2)}/mo</td>
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
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Plan</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paidEmployers.map((emp, i) => (
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
                        <td className="py-3 px-4">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${emp.plan === "premium" ? "bg-primary/10 text-primary" : "bg-info/10 text-info"}`}>{emp.plan}</span>
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-foreground">${emp.planPrice.toFixed(2)}/mo</td>
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
