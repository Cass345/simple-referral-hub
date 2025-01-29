import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TeacherInfo } from "./TeacherInfo";
import { StudentBackground } from "./StudentBackground";
import { ReferralReason } from "./ReferralReason";
import type { StudentProfile } from "@/types/database.types";
import type { StudentBackground as StudentBackgroundType, ReferralReason as ReferralReasonType } from "@/types/referral";

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
        .single();

      if (error) throw error;
      setExistingProfile(data);
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

  const handleSubmit = async (formData: any) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .upsert({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Student profile saved successfully",
      });
      
      onComplete(data);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save student profile",
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <TeacherInfo 
          initialData={existingProfile?.teacherInfo} 
          onSubmit={() => {}} 
        />
        <StudentBackground 
          initialData={existingProfile?.studentBackground as StudentBackgroundType}
          onSubmit={() => {}}
          onBack={() => {}}
        />
        <ReferralReason 
          initialData={existingProfile?.referralReason as ReferralReasonType}
          onSubmit={() => {}}
          onBack={() => {}}
        />
        <Button type="submit">Save Profile & Continue</Button>
      </form>
    </Card>
  );
}