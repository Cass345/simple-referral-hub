import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

// Mock data - in a real app this would come from your backend
const mockProgressData = {
  currentStep: 4,
  totalSteps: 9,
  stepStatus: [
    { name: "Tier 1 Snapshot", completed: true, path: "/tier1-snapshot" },
    { name: "Tier 1 Checklist", completed: true, path: "/tier1-checklist" },
    { name: "Target Behaviors", completed: true, path: "/target-behaviors" },
    { name: "Evaluate Behavior", completed: true, path: "/evaluate-behavior" },
    { name: "Prioritize & Define", completed: false, path: "/prioritize-behaviors" },
    { name: "Baseline Data", completed: false, path: "/baseline-data" },
    { name: "Interventions", completed: false, path: "/interventions" },
    { name: "New Referral", completed: false, path: "/start-referral" },
    { name: "Data Collection", completed: false, path: "/data-collection" },
  ],
};

const studentData = [
  { name: "Week 1", incidents: 8 },
  { name: "Week 2", incidents: 6 },
  { name: "Week 3", incidents: 7 },
  { name: "Week 4", incidents: 5 },
  { name: "Week 5", incidents: 4 },
];

const ProgressTracking = () => {
  const progress = (mockProgressData.currentStep / mockProgressData.totalSteps) * 100;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Progress Tracking</h1>
        <Button asChild>
          <Link to="/start-referral">Start New Referral</Link>
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">MTSS Process Progress</h2>
        <Progress value={progress} className="mb-4" />
        <p className="text-sm text-muted-foreground mb-6">
          {mockProgressData.currentStep} of {mockProgressData.totalSteps} steps completed
        </p>

        <div className="grid gap-4">
          {mockProgressData.stepStatus.map((step, index) => (
            <div
              key={step.name}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="font-medium">{step.name}</span>
              </div>
              <Button
                variant={step.completed ? "secondary" : "default"}
                asChild
                className="w-24"
              >
                <Link to={step.path}>
                  {step.completed ? "Review" : "Start"}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Student Progress</h2>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              incidents: {
                label: "Behavior Incidents",
                theme: {
                  light: "#0ea5e9",
                  dark: "#38bdf8",
                },
              },
            }}
          >
            <BarChart data={studentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="incidents" name="incidents" />
            </BarChart>
          </ChartContainer>
        </div>
      </Card>
    </div>
  );
};

export default ProgressTracking;