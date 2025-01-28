import { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { TeacherInfo } from "@/components/referralform/TeacherInfo";
import { StudentBackground } from "@/components/referralform/StudentBackground";
import { ReferralReason } from "@/components/referralform/ReferralReason";
import { BehaviorIdentification } from "@/components/referralform/BehaviorIdentification";
import { BehaviorEvaluation } from "@/components/referralform/BehaviorEvaluation";
import { DataCollection } from "@/components/referralform/DataCollection";
import type { Behavior } from '@/types/referral';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import type { ReferralFormData } from '@/types/referral';

type Section = 'intro' | 'teacherInfo' | 'studentBackground' | 'referralReason' | 'behaviorId' | 'behaviorEval' | 'data' | 'review';

const StartReferral = () => {
  const [currentSection, setCurrentSection] = useState<Section>('intro');
  const [formData, setFormData] = useState<ReferralFormData>({
    teacherInfo: {
      teacherName: '',
      classroomNumber: '',
      studentName: '',
      studentAge: '',
      studentSchedule: ''
    },
    studentBackground: {
      firstName: '',
      lastName: '',
      grade: 0,
      dob: '',
      studentId: '',
      primaryLanguage: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      parentNotificationDate: '',
      strengths: []
    },
    referralReason: {
      reasons: {
        academic: false,
        behavior: false,
        socialEmotional: false
      },
      concerns: [],
      description: ''
    },
    behaviors: [],
    dataCollection: [],
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateFormData = (section: keyof typeof formData, data: unknown) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const navigateToSection = (section: Section) => {
    setCurrentSection(section);
  };

  const handleSubmitReferral = async () => {
    try {
      // Create student profile
      const { data: student, error: studentError } = await supabase
        .from('students')
        .insert({
          first_name: formData.studentBackground.firstName,
          last_name: formData.studentBackground.lastName,
          grade: formData.studentBackground.grade,
          date_of_birth: formData.studentBackground.dob,
          student_id: formData.studentBackground.studentId,
          referring_teacher: formData.teacherInfo.teacherName,
          referral_reasons: formData.referralReason.reasons,
          concerns: formData.referralReason.concerns,
          strengths: formData.studentBackground.strengths,
          behavior_data: [],
          parent_notification_date: formData.studentBackground.parentNotificationDate,
          parent_name: formData.studentBackground.parentName,
          parent_email: formData.studentBackground.parentEmail,
          parent_phone: formData.studentBackground.parentPhone,
          language: formData.studentBackground.primaryLanguage
        })
        .select()
        .single();

      if (studentError) throw studentError;

      // Create initial referral
      const { error: referralError } = await supabase
        .from('referrals')
        .insert({
          student_id: student.id,
          referring_user_id: null, // TODO: Add user authentication
          concern_type: Object.entries(formData.referralReason.reasons)
            .filter(([_, value]) => value)
            .map(([key]) => key)
            .join(', '),
          concern_description: formData.referralReason.description,
          status: 'pending'
        });

      if (referralError) throw referralError;

      toast({
        title: "Success",
        description: "Referral submitted successfully",
      });

      navigate('/student-profiles');
    } catch (error) {
      console.error('Error submitting referral:', error);
      toast({
        title: "Error",
        description: "Failed to submit referral",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Start a New Referral</h1>
      <Card className="p-6">
        {currentSection === 'intro' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to the MTSS Referral Process</h2>
            <p className="text-gray-600 mb-6">
              This form will guide you through the process of referring a student to the MTSS program. 
              You'll identify specific areas of concern, understand behavior patterns, set measurable goals, 
              and establish effective data collection methods.
            </p>
            <button
              onClick={() => navigateToSection('teacherInfo')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center w-full sm:w-auto"
            >
              Begin Referral Process
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

        {currentSection === 'teacherInfo' && (
          <TeacherInfo
            onSubmit={(data) => {
              updateFormData('teacherInfo', data);
              navigateToSection('studentBackground');
            }}
            initialData={formData.teacherInfo}
          />
        )}

        {currentSection === 'studentBackground' && (
          <StudentBackground
            onSubmit={(data) => {
              updateFormData('studentBackground', data);
              navigateToSection('referralReason');
            }}
            onBack={() => navigateToSection('teacherInfo')}
            initialData={formData.studentBackground}
          />
        )}

        {currentSection === 'referralReason' && (
          <ReferralReason
            onSubmit={(data) => {
              updateFormData('referralReason', data);
              navigateToSection('behaviorId');
            }}
            onBack={() => navigateToSection('studentBackground')}
            initialData={formData.referralReason}
          />
        )}

        {currentSection === 'behaviorId' && (
          <BehaviorIdentification
            onSubmit={(data) => {
              updateFormData('behaviors', data);
              navigateToSection('behaviorEval');
            }}
            onBack={() => navigateToSection('referralReason')}
            initialData={formData.behaviors}
          />
        )}

        {currentSection === 'behaviorEval' && (
          <BehaviorEvaluation
            behaviors={formData.behaviors}
            onSubmit={(data) => {
              updateFormData('behaviors', data);
              navigateToSection('data');
            }}
            onBack={() => navigateToSection('behaviorId')}
          />
        )}

        {currentSection === 'data' && (
          <DataCollection
            behaviors={formData.behaviors}
            onSubmit={(data) => {
              updateFormData('dataCollection', data);
              navigateToSection('review');
            }}
            onBack={() => navigateToSection('behaviorEval')}
            initialData={formData.dataCollection} // Use mock data for testing
          />
        )}

        {currentSection === 'review' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Review and Submit</h2>
            <div className="space-y-6">
              {/* Add review summary here */}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigateToSection('data')}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Back
              </button>
              <button
                onClick={handleSubmitReferral}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Referral
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StartReferral;
