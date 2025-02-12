import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { TeacherInfo } from "./TeacherInfo";
import { StudentBackground } from "./StudentBackground";
import { ReferralReason } from "./ReferralReason";
import type { StudentProfile } from "@/types/database.types";

interface StudentProfileSectionProps {
  onComplete: (profileData: StudentProfile) => void;
  studentId?: string;
}

export function StudentProfileSection({ onComplete, studentId }: StudentProfileSectionProps) {
  const [existingProfile, setExistingProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (studentId) {
      fetchExistingProfile();
    } else {
      setLoading(false);
    }
  }, [studentId]);

  const fetchExistingProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('student_id', studentId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setExistingProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to fetch student profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherInfoSubmit = async (teacherInfo: Partial<StudentProfile>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .upsert({
          first_name: teacherInfo.first_name,
          last_name: teacherInfo.last_name,
          grade: teacherInfo.grade,
          date_of_birth: teacherInfo.date_of_birth,
          student_id: teacherInfo.student_id || Math.random().toString(36).substring(7),
          referring_teacher: teacherInfo.referring_teacher,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Student information saved successfully",
      });
      
      if (data) {
        setExistingProfile(data);
      }
    } catch (error) {
      console.error('Error saving student info:', error);
      toast({
        title: "Error",
        description: "Failed to save student information",
        variant: "destructive",
      });
    }
  };

  const handleStudentBackgroundSubmit = async (backgroundData: StudentProfile['studentBackground']) => {
    if (!existingProfile?.id) {
      toast({
        title: "Error",
        description: "Please complete student information first",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('students')
        .update({
          studentBackground: backgroundData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingProfile.id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Student background saved successfully",
      });
      
      if (data) {
        setExistingProfile(data);
      }
    } catch (error) {
      console.error('Error saving background:', error);
      toast({
        title: "Error",
        description: "Failed to save student background",
        variant: "destructive",
      });
    }
  };

  const handleReferralReasonSubmit = async (referralData: StudentProfile['referralReason']) => {
    if (!existingProfile?.id) {
      toast({
        title: "Error",
        description: "Please complete previous sections first",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('students')
        .update({
          referralReason: referralData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingProfile.id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Referral information saved successfully",
      });
      
      if (data) {
        onComplete(data);
      }
    } catch (error) {
      console.error('Error saving referral:', error);
      toast({
        title: "Error",
        description: "Failed to save referral information",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Student Information & Profile</h2>
      <div className="space-y-6">
        <TeacherInfo 
          initialData={existingProfile} 
          onSubmit={handleTeacherInfoSubmit} 
        />
        {existingProfile && (
          <>
            <StudentBackground 
              initialData={existingProfile?.studentBackground}
              onSubmit={handleStudentBackgroundSubmit}
              onBack={() => {}}
            />
            <ReferralReason 
              initialData={existingProfile?.referralReason}
              onSubmit={handleReferralReasonSubmit}
              onBack={() => {}}
            />
          </>
        )}
      </div>
    </Card>
  );
}