import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { StudentProfile } from "@/types/database.types";

interface StudentDashboardProps {
  student: StudentProfile;
}

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

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Important Dates</h3>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </Card>
    </div>
  );
}