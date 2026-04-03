import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

interface RevenueChartProps {
  data: any[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-foreground text-lg">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">Monthly breakdown of revenue streams</p>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-semibold">
          <TrendingUp className="h-3.5 w-3.5" />
          +24.5%
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEmployers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
          <Area type="monotone" dataKey="employees" stackId="1" stroke="hsl(200, 80%, 50%)" fill="url(#colorEmployees)" strokeWidth={2} />
          <Area type="monotone" dataKey="employers" stackId="1" stroke="hsl(24, 95%, 53%)" fill="url(#colorEmployers)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
