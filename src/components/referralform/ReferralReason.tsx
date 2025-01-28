import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReferralFormData {
  reasons: {
    academic: boolean;
    behavior: boolean;
    socialEmotional: boolean;
  };
  strengths: string[];
}

interface ReferralReasonProps {
  onSubmit: (data: ReferralFormData) => void;
  onBack: () => void;
  initialData?: Partial<ReferralFormData>;
}

export function ReferralReason({ onSubmit, onBack, initialData = {} }: ReferralReasonProps) {
  const [formData, setFormData] = useState({
    reasons: initialData.reasons || {
      academic: false,
      behavior: false,
      socialEmotional: false
    },
    strengths: initialData.strengths || ['', '', '']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateStrength = (index: number, value: string) => {
    const newStrengths = [...formData.strengths];
    newStrengths[index] = value;
    setFormData(prev => ({ ...prev, strengths: newStrengths }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reason for Referral</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Areas of Concern</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.reasons.academic}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  reasons: { ...prev.reasons, academic: e.target.checked }
                }))}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Academic</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.reasons.behavior}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  reasons: { ...prev.reasons, behavior: e.target.checked }
                }))}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Behavior/Attendance</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.reasons.socialEmotional}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  reasons: { ...prev.reasons, socialEmotional: e.target.checked }
                }))}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Social-Emotional</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Student Strengths, Talents, and Interests</h3>
          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <label htmlFor={`strength${index + 1}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Strength {index + 1}
                </label>
                <input
                  type="text"
                  id={`strength${index + 1}`}
                  value={formData.strengths[index]}
                  onChange={(e) => updateStrength(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            Next: Identify Behaviors
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}