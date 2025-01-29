import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReferralFormData } from '@/types/database.types';

interface ReferralReasonProps {
  onSubmit: (data: ReferralFormData) => void;
  onBack: () => void;
  initialData?: ReferralFormData;
}

export function ReferralReason({ onSubmit, onBack, initialData }: ReferralReasonProps) {
  const [formData, setFormData] = useState<ReferralFormData>(initialData || {
    primaryConcern: '',
    specificConcerns: [],
    previousStrategies: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleConcernChange = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      primaryConcern: concern
    }));
  };

  const handleSpecificConcernChange = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      specificConcerns: [...prev.specificConcerns, concern]
    }));
  };

  const handleStrategyChange = (strategy: string) => {
    setFormData(prev => ({
      ...prev,
      previousStrategies: [...prev.previousStrategies, strategy]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reason for Referral</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Primary Concern</h3>
          <textarea
            value={formData.primaryConcern}
            onChange={(e) => handleConcernChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Specific Concerns</h3>
          <textarea
            value={formData.specificConcerns.join('\n')}
            onChange={(e) => handleSpecificConcernChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Enter specific concerns..."
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Previous Strategies</h3>
          <textarea
            value={formData.previousStrategies.join('\n')}
            onChange={(e) => handleStrategyChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Enter previous strategies..."
          />
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
            Next
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}