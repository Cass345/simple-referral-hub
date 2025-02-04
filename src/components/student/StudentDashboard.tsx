import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { User, Activity, Shield, Flag } from "lucide-react";
import type { StudentProfile } from "@/types/database.types";

export function StudentDashboard({ student }: StudentDashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dataType, setDataType] = useState("baseline");
  const [dataValue, setDataValue] = useState("");
  const { toast } = useToast();

  // Calculate MTSS progress with null check
  const mtssProgress = student?.mtss_tier ? (Number(student.mtss_tier) - 1) * 33.33 : 0;

  const handleDataSubmit = () => {
    toast({
      title: "Data Saved",
      description: "New data point has been recorded",
    });
    setDataValue("");
  };

  // If student is undefined, show loading or error state
  if (!student) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <p className="text-muted-foreground">Loading student data...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {student.first_name} {student.last_name}
        </h1>
        <div className="text-sm text-muted-foreground">
          ID: {student.student_id} | Grade: {student.grade}
          {student.mtss_tier && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              Tier {student.mtss_tier}
            </span>
          )}
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="information" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Information
          </TabsTrigger>
          <TabsTrigger value="interventions" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Interventions
          </TabsTrigger>
          <TabsTrigger value="referral" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Referral
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">MTSS Process Progress</h3>
              <Progress value={mtssProgress} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Current Tier: {student.mtss_tier || 'Not Set'}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Data Entry</h3>
              <div className="space-y-4">
                <Select value={dataType} onValueChange={setDataType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baseline">Baseline Data</SelectItem>
                    <SelectItem value="tier1">Tier 1 Data</SelectItem>
                    <SelectItem value="tier2">Tier 2 Data</SelectItem>
                    <SelectItem value="tier3">Tier 3 Data</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Enter value"
                    value={dataValue}
                    onChange={(e) => setDataValue(e.target.value)}
                  />
                  <Button onClick={handleDataSubmit}>Save</Button>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Progress Chart</h3>
            <div className="h-[200px]">
              <BarChart data={student.behavior_data || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="frequency" fill="#8884d8" />
              </BarChart>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="information">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <Button variant="outline">Edit Information</Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">First Name</p>
                <p className="font-medium">{student.first_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Last Name</p>
                <p className="font-medium">{student.last_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Student ID</p>
                <p className="font-medium">{student.student_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                <p className="font-medium">{student.date_of_birth}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Grade</p>
                <p className="font-medium">{student.grade}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Primary Language</p>
                <p className="font-medium">{student.language || 'Not specified'}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="interventions">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Current Interventions</h3>
            {student.interventions && student.interventions.length > 0 ? (
              <div className="space-y-4">
                {student.interventions.map((intervention, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium">{intervention.title}</h4>
                    <p className="text-sm text-muted-foreground">{intervention.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No active interventions</p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="referral">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Referral Information</h3>
            {student.referralReason ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Primary Concern</p>
                  <p className="font-medium">{student.referralReason.primaryConcern}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Specific Concerns</p>
                  <ul className="list-disc list-inside">
                    {student.referralReason.specificConcerns.map((concern, index) => (
                      <li key={index} className="text-sm">{concern}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No referral information available</p>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
