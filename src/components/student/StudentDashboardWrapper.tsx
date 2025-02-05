import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { useToast } from "@/components/ui/use-toast";
import type { StudentProfile } from "@/types/database.types";

export const StudentDashboardWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('student_id', id)
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          toast({
            title: "Student not found",
            description: "The requested student could not be found",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }

        // Format the data to match StudentProfile interface
        const formattedData: StudentProfile = {
          ...data,
          student_id: data.student_id.toString(),
          mtss_tier: data.mtss_tier?.toString(),
          concerns: Array.isArray(data.concerns) ? data.concerns : data.concerns ? [data.concerns] : []
        };

        setStudent(formattedData);
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
  }, [id, toast, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  return <StudentDashboard student={student} />;
};