export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: "free" | "standard" | "premium";
  status: "active" | "inactive";
  joinDate: string;
  planPrice: number;
}

export interface Employer {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  industry: string;
  plan: "free" | "standard" | "premium";
  status: "active" | "inactive";
  joinDate: string;
  planPrice: number;
  jobsPosted: number;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  type: "online" | "offline";
  location: string;
  salary: string;
  status: "active" | "closed" | "draft";
  applicants: number;
  postedDate: string;
  category: string;
}

export const employees: Employee[] = [
  { id: "E001", name: "Aarav Sharma", email: "aarav@email.com", role: "Software Engineer", plan: "premium", status: "active", joinDate: "2024-01-15", planPrice: 29.99 },
  { id: "E002", name: "Priya Patel", email: "priya@email.com", role: "UI/UX Designer", plan: "standard", status: "active", joinDate: "2024-02-20", planPrice: 14.99 },
  { id: "E003", name: "Rahul Gupta", email: "rahul@email.com", role: "Data Analyst", plan: "free", status: "active", joinDate: "2024-03-10", planPrice: 0 },
  { id: "E004", name: "Sneha Reddy", email: "sneha@email.com", role: "Project Manager", plan: "premium", status: "active", joinDate: "2024-01-25", planPrice: 29.99 },
  { id: "E005", name: "Vikram Singh", email: "vikram@email.com", role: "DevOps Engineer", plan: "standard", status: "inactive", joinDate: "2024-04-05", planPrice: 14.99 },
  { id: "E006", name: "Ananya Iyer", email: "ananya@email.com", role: "Marketing Specialist", plan: "free", status: "active", joinDate: "2024-05-12", planPrice: 0 },
  { id: "E007", name: "Karthik Nair", email: "karthik@email.com", role: "Full Stack Developer", plan: "premium", status: "active", joinDate: "2024-02-08", planPrice: 29.99 },
  { id: "E008", name: "Meera Joshi", email: "meera@email.com", role: "Content Writer", plan: "standard", status: "active", joinDate: "2024-06-18", planPrice: 14.99 },
  { id: "E009", name: "Arjun Das", email: "arjun@email.com", role: "QA Engineer", plan: "free", status: "inactive", joinDate: "2024-03-22", planPrice: 0 },
  { id: "E010", name: "Divya Menon", email: "divya@email.com", role: "Business Analyst", plan: "premium", status: "active", joinDate: "2024-07-01", planPrice: 29.99 },
  { id: "E011", name: "Rohan Kapoor", email: "rohan@email.com", role: "Backend Developer", plan: "standard", status: "active", joinDate: "2024-04-15", planPrice: 14.99 },
  { id: "E012", name: "Ishita Verma", email: "ishita@email.com", role: "HR Specialist", plan: "free", status: "active", joinDate: "2024-08-20", planPrice: 0 },
];

export const employers: Employer[] = [
  { id: "ER001", company: "TechVista Solutions", contactPerson: "Rajesh Kumar", email: "rajesh@techvista.com", industry: "Technology", plan: "premium", status: "active", joinDate: "2024-01-10", planPrice: 99.99, jobsPosted: 12 },
  { id: "ER002", company: "GreenLeaf Industries", contactPerson: "Sunita Mehta", email: "sunita@greenleaf.com", industry: "Manufacturing", plan: "standard", status: "active", joinDate: "2024-02-14", planPrice: 49.99, jobsPosted: 5 },
  { id: "ER003", company: "CloudNine Digital", contactPerson: "Amit Chopra", email: "amit@cloudnine.com", industry: "IT Services", plan: "premium", status: "active", joinDate: "2024-01-22", planPrice: 99.99, jobsPosted: 18 },
  { id: "ER004", company: "HealthFirst Pharma", contactPerson: "Dr. Neha Agarwal", email: "neha@healthfirst.com", industry: "Healthcare", plan: "free", status: "active", joinDate: "2024-03-05", planPrice: 0, jobsPosted: 2 },
  { id: "ER005", company: "FinEdge Capital", contactPerson: "Sanjay Malhotra", email: "sanjay@finedge.com", industry: "Finance", plan: "premium", status: "active", joinDate: "2024-04-18", planPrice: 99.99, jobsPosted: 8 },
  { id: "ER006", company: "EduBridge Learning", contactPerson: "Kavita Rao", email: "kavita@edubridge.com", industry: "Education", plan: "standard", status: "inactive", joinDate: "2024-05-25", planPrice: 49.99, jobsPosted: 3 },
  { id: "ER007", company: "BuildRight Construction", contactPerson: "Prakash Shetty", email: "prakash@buildright.com", industry: "Construction", plan: "free", status: "active", joinDate: "2024-06-10", planPrice: 0, jobsPosted: 1 },
  { id: "ER008", company: "MediaPulse Agency", contactPerson: "Ritu Saxena", email: "ritu@mediapulse.com", industry: "Media", plan: "standard", status: "active", joinDate: "2024-07-15", planPrice: 49.99, jobsPosted: 7 },
];

export const jobPostings: JobPosting[] = [
  { id: "J001", title: "Senior React Developer", company: "TechVista Solutions", type: "online", location: "Remote", salary: "$80k-$120k", status: "active", applicants: 45, postedDate: "2024-09-01", category: "Engineering" },
  { id: "J002", title: "Marketing Manager", company: "MediaPulse Agency", type: "offline", location: "Mumbai", salary: "$50k-$70k", status: "active", applicants: 23, postedDate: "2024-09-05", category: "Marketing" },
  { id: "J003", title: "Cloud Architect", company: "CloudNine Digital", type: "online", location: "Remote", salary: "$100k-$150k", status: "active", applicants: 32, postedDate: "2024-09-08", category: "Engineering" },
  { id: "J004", title: "Financial Analyst", company: "FinEdge Capital", type: "offline", location: "Delhi", salary: "$60k-$90k", status: "active", applicants: 18, postedDate: "2024-09-10", category: "Finance" },
  { id: "J005", title: "UI/UX Designer", company: "TechVista Solutions", type: "online", location: "Remote", salary: "$55k-$85k", status: "closed", applicants: 67, postedDate: "2024-08-15", category: "Design" },
  { id: "J006", title: "Plant Supervisor", company: "GreenLeaf Industries", type: "offline", location: "Chennai", salary: "$40k-$55k", status: "active", applicants: 12, postedDate: "2024-09-12", category: "Operations" },
  { id: "J007", title: "Data Scientist", company: "CloudNine Digital", type: "online", location: "Hybrid", salary: "$90k-$130k", status: "active", applicants: 54, postedDate: "2024-09-03", category: "Engineering" },
  { id: "J008", title: "Pharmacist", company: "HealthFirst Pharma", type: "offline", location: "Bangalore", salary: "$45k-$65k", status: "active", applicants: 8, postedDate: "2024-09-14", category: "Healthcare" },
  { id: "J009", title: "DevOps Engineer", company: "TechVista Solutions", type: "online", location: "Remote", salary: "$75k-$110k", status: "draft", applicants: 0, postedDate: "2024-09-16", category: "Engineering" },
  { id: "J010", title: "Content Strategist", company: "MediaPulse Agency", type: "online", location: "Remote", salary: "$45k-$60k", status: "active", applicants: 29, postedDate: "2024-09-06", category: "Marketing" },
  { id: "J011", title: "Civil Engineer", company: "BuildRight Construction", type: "offline", location: "Hyderabad", salary: "$50k-$75k", status: "active", applicants: 15, postedDate: "2024-09-09", category: "Engineering" },
  { id: "J012", title: "Teacher - Mathematics", company: "EduBridge Learning", type: "offline", location: "Pune", salary: "$30k-$45k", status: "closed", applicants: 41, postedDate: "2024-08-20", category: "Education" },
];

export const monthlyRevenue = [
  { month: "Jan", employees: 1200, employers: 4500, total: 5700 },
  { month: "Feb", employees: 1800, employers: 5200, total: 7000 },
  { month: "Mar", employees: 2100, employers: 5800, total: 7900 },
  { month: "Apr", employees: 2400, employers: 6100, total: 8500 },
  { month: "May", employees: 2800, employers: 6500, total: 9300 },
  { month: "Jun", employees: 3200, employers: 7200, total: 10400 },
  { month: "Jul", employees: 3500, employers: 7800, total: 11300 },
  { month: "Aug", employees: 3900, employers: 8200, total: 12100 },
  { month: "Sep", employees: 4200, employers: 8900, total: 13100 },
];

export const planDistribution = [
  { name: "Free", employees: 4, employers: 2, color: "hsl(var(--muted-foreground))" },
  { name: "Standard", employees: 4, employers: 3, color: "hsl(var(--info))" },
  { name: "Premium", employees: 4, employers: 3, color: "hsl(var(--primary))" },
];
