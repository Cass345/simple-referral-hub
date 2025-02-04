import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { useToast } from "@/components/ui/use-toast";
import type { StudentProfile } from "@/types/database.types";

export const StudentDashboardWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student:', error);
        toast({
          title: "Error",
          description: "Failed to load student data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  return <StudentDashboard student={student} />;
};
