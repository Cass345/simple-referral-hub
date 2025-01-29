import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { StudentBackgroundData } from '@/types/database.types';

interface StudentBackgroundProps {
  onSubmit: (data: StudentBackgroundData) => void;
  onBack: () => void;
  initialData?: StudentBackgroundData;
}

export function StudentBackground({ onSubmit, onBack, initialData }: StudentBackgroundProps) {
  const [formData, setFormData] = useState<StudentBackgroundData>(initialData || {
    previousInterventions: [],
    academicHistory: '',
    behavioralHistory: '',
    attendanceHistory: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Background</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="academicHistory" className="block text-sm font-medium text-gray-700 mb-1">
            Academic History
          </label>
          <textarea
            id="academicHistory"
            value={formData.academicHistory}
            onChange={(e) => setFormData(prev => ({ ...prev, academicHistory: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="behavioralHistory" className="block text-sm font-medium text-gray-700 mb-1">
            Behavioral History
          </label>
          <textarea
            id="behavioralHistory"
            value={formData.behavioralHistory}
            onChange={(e) => setFormData(prev => ({ ...prev, behavioralHistory: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="attendanceHistory" className="block text-sm font-medium text-gray-700 mb-1">
            Attendance History
          </label>
          <textarea
            id="attendanceHistory"
            value={formData.attendanceHistory}
            onChange={(e) => setFormData(prev => ({ ...prev, attendanceHistory: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Previous Interventions
          </label>
          <textarea
            value={formData.previousInterventions.join('\n')}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              previousInterventions: e.target.value.split('\n').filter(Boolean)
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Enter each intervention on a new line"
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