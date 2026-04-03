import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  role: string;
  plan: string;
}

interface RecentEmployeesProps {
  employees: Employee[];
}

export function RecentEmployees({ employees }: RecentEmployeesProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground text-lg">Recent Employees</h3>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {employees.map((emp) => (
          <div key={emp.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-accent-foreground">
                {emp.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{emp.name}</p>
                <p className="text-xs text-muted-foreground">{emp.role}</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${emp.plan === "premium" ? "bg-primary/10 text-primary" : emp.plan === "standard" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"}`}>
              {emp.plan}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
