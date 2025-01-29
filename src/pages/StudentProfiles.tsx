import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { mockStudentProfile } from "@/mockData";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import type { StudentProfile } from "@/types/database.types";

const StudentProfiles = () => {
  const [students, setStudents] = useState<StudentProfile[]>([mockStudentProfile]);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*');

      if (error) throw error;
      setStudents([mockStudentProfile, ...(data || [])]);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Error",
        description: "Failed to load student profiles"
      });
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-3xl font-bold mb-6">Student Profiles</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Student List</h2>
          <div className="space-y-2">
            {students.map((student) => (
              <Button
                key={student.id}
                variant={selectedStudent?.id === student.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedStudent(student)}
              >
                {student.first_name} {student.last_name}
              </Button>
            ))}
          </div>
        </Card>

        {selectedStudent && (
          <Card className="md:col-span-2 p-6">
            <Tabs defaultValue="dashboard">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="info">Student Information</TabsTrigger>
                <TabsTrigger value="goals">Focus Areas & Goals</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <StudentDashboard student={selectedStudent} />
              </TabsContent>

              <TabsContent value="info" className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p>{selectedStudent.first_name} {selectedStudent.last_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p>{selectedStudent.student_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Grade</p>
                    <p>{selectedStudent.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p>{new Date(selectedStudent.date_of_birth).toLocaleDateString()}</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Parent/Guardian</p>
                    <p>{selectedStudent.parent_name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{selectedStudent.parent_phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{selectedStudent.parent_email || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Primary Language</p>
                    <p>{selectedStudent.language || 'Not provided'}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="goals" className="space-y-4">
                <h3 className="text-lg font-semibold">Referral Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Referring Teacher</p>
                    <p>{selectedStudent.referring_teacher || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Referral Reasons</p>
                    <ul className="list-disc list-inside">
                      {selectedStudent.referral_reasons?.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      )) || <p>No referral reasons provided</p>}
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6">Goals & Objectives</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Goal</TableHead>
                      <TableHead>Baseline</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedStudent.goals?.map((goal, index) => (
                      <TableRow key={index}>
                        <TableCell>{goal}</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell>In Progress</TableCell>
                      </TableRow>
                    )) || (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">No goals set yet</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentProfiles;
