import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentProfileSection } from "@/components/referralform/StudentProfileSection";
import { BaselineDataSection } from "@/components/referralform/BaselineDataSection";
import { Tier1InterventionSection } from "@/components/referralform/Tier1InterventionSection";
import { StudentTypeSelection } from "@/components/referralform/StudentTypeSelection";
import { useAuth } from "@/lib/auth";
import type { StudentProfile } from "@/types/database.types";

type ReferralStep = 'type-selection' | 'profile' | 'baseline' | 'interventions';

const StartReferral = () => {
  const [currentStep, setCurrentStep] = useState<ReferralStep>('type-selection');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleStudentTypeSelect = (type: 'IP' | 'ECAP') => {
    setCurrentStep('profile');
  };

  const handleProfileComplete = (profile: StudentProfile) => {
    setStudentProfile(profile);
    setCurrentStep('baseline');
  };

  const handleBaselineComplete = () => {
    setCurrentStep('interventions');
  };

  const handleReferralComplete = () => {
    navigate('/student-profiles');
  };

  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Start a New Referral</h1>
      
      <div className="container mx-auto max-w-md">
        {currentStep === 'type-selection' && (
          <StudentTypeSelection onSelect={handleStudentTypeSelect} />
        )}
        
        {currentStep === 'profile' && (
          <StudentProfileSection 
            onComplete={handleProfileComplete}
            studentId={studentProfile?.student_id}
          />
        )}

        {currentStep === 'baseline' && studentProfile && (
          <BaselineDataSection
            studentId={studentProfile.student_id}
            concerns={studentProfile.concerns || []}
            onComplete={handleBaselineComplete}
          />
        )}

        {currentStep === 'interventions' && studentProfile && (
          <Tier1InterventionSection
            studentId={studentProfile.student_id}
            onComplete={handleReferralComplete}
          />
        )}
      </div>

      {/* Progress indicator */}
      <div className="flex justify-between mt-6">
        <div className={`h-2 flex-1 ${currentStep === 'profile' ? 'bg-blue-500' : 'bg-gray-200'}`} />
        <div className={`h-2 flex-1 ${currentStep === 'baseline' ? 'bg-blue-500' : 'bg-gray-200'}`} />
        <div className={`h-2 flex-1 ${currentStep === 'interventions' ? 'bg-blue-500' : 'bg-gray-200'}`} />
      </div>
    </div>
  );
};

export default StartReferral;