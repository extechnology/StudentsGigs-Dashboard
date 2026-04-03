import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="stat-card group cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="h-11 w-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ backgroundColor: iconColor ? `${iconColor}15` : "hsl(var(--accent))" }}
        >
          <Icon className="h-5 w-5" style={{ color: iconColor || "hsl(var(--primary))" }} />
        </div>
        {change && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              changeType === "positive"
                ? "bg-success/10 text-success"
                : changeType === "negative"
                ? "bg-destructive/10 text-destructive"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-display font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
    </motion.div>
  );
}
