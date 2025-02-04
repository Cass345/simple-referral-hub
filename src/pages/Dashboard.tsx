import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Users, Activity, FileText, CheckSquare } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const stats = [
    {
      title: "Total Students",
      value: "1",
      icon: Users,
      description: "Currently enrolled"
    },
    {
      title: "Active Interventions",
      value: "0",
      icon: Activity,
      description: "In progress"
    },
    {
      title: "Pending Referrals",
      value: "0",
      icon: FileText,
      description: "Awaiting review"
    },
    {
      title: "Completed Interventions",
      value: "0",
      icon: CheckSquare,
      description: "Successfully finished"
    }
  ];

  const tierData = [
    { name: 'Tier 1', value: 0 },
    { name: 'Tier 2', value: 0 },
    { name: 'Tier 3', value: 0 },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {profile?.first_name}</h1>
          <p className="text-muted-foreground">Here's an overview of your MTSS program</p>
        </div>
        <Button onClick={() => navigate('/start-referral')}>Add Student</Button>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Focus Area Documentation Calendar</h2>
        <Calendar
          mode="single"
          selected={new Date()}
          className="rounded-md border"
        />
        <div className="mt-4 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Snapshot documentation period</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Intervention documentation period</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Active Interventions by Tier</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tierData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;