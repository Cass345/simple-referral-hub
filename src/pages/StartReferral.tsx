import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { StudentProfileSection } from "@/components/referralform/StudentProfileSection";
import { BaselineDataSection } from "@/components/referralform/BaselineDataSection";
import { Tier1InterventionSection } from "@/components/referralform/Tier1InterventionSection";
import type { StudentProfile } from "@/types/database.types";

type ReferralStep = 'profile' | 'baseline' | 'interventions';

const StartReferral = () => {
  const [currentStep, setCurrentStep] = useState<ReferralStep>('profile');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const navigate = useNavigate();

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

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Start a New Referral</h1>
      
      {currentStep === 'profile' && (
        <StudentProfileSection 
          onComplete={handleProfileComplete}
          studentId={studentProfile?.id}
        />
      )}

      {currentStep === 'baseline' && studentProfile && (
        <BaselineDataSection
          studentId={studentProfile.id}
          concerns={studentProfile.concerns || []}
          onComplete={handleBaselineComplete}
        />
      )}

      {currentStep === 'interventions' && studentProfile && (
        <Tier1InterventionSection
          studentId={studentProfile.id}
          onComplete={handleReferralComplete}
        />
      )}

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