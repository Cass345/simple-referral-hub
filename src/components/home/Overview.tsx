import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const stats = [
  {
    title: "Active Referrals",
    value: "12",
    icon: Clock,
    description: "Currently in progress",
    color: "text-blue-500",
  },
  {
    title: "Total Students",
    value: "156",
    icon: Users,
    description: "In the system",
    color: "text-green-500",
  },
  {
    title: "Completed",
    value: "45",
    icon: CheckCircle,
    description: "This semester",
    color: "text-purple-500",
  },
  {
    title: "Pending Review",
    value: "8",
    icon: AlertTriangle,
    description: "Needs attention",
    color: "text-yellow-500",
  },
];

export function Overview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}