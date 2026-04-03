import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  type: string;
  applicants: number;
  status: string;
}

interface RecentJobsProps {
  jobs: Job[];
}

export function RecentJobs({ jobs }: RecentJobsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground text-lg">Recent Job Postings</h3>
        <Briefcase className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <div>
              <p className="text-sm font-medium text-foreground">{job.title}</p>
              <p className="text-xs text-muted-foreground">{job.company} · {job.type}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-foreground">{job.applicants} applicants</p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${job.status === "active" ? "bg-success/10 text-success" : job.status === "closed" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                {job.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
