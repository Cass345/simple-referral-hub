import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, FileText, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "New Referral",
    description: "Start a new student referral process",
    icon: PlusCircle,
    path: "/start-referral",
    color: "bg-primary",
  },
  {
    title: "Find Student",
    description: "Search existing student profiles",
    icon: Search,
    path: "/student-profiles",
    color: "bg-secondary",
  },
  {
    title: "View Resources",
    description: "Access intervention guides and materials",
    icon: FileText,
    path: "/resources",
    color: "bg-accent",
  },
  {
    title: "Notifications",
    description: "Check your latest updates",
    icon: Bell,
    path: "/settings",
    color: "bg-muted",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Card key={action.title} className="p-6 hover:shadow-lg transition-shadow">
          <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
            <action.icon className="h-6 w-6 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
          <p className="text-muted-foreground mb-4">{action.description}</p>
          <Button asChild className="w-full">
            <Link to={action.path}>Get Started</Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}