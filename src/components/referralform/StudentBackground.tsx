import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StudentBackgroundProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

export function StudentBackground({ onSubmit, onBack, initialData = {} }: StudentBackgroundProps) {
  const [formData, setFormData] = useState({
    dob: initialData.dob || '',
    primaryLanguage: initialData.primaryLanguage || '',
    parentName: initialData.parentName || '',
    parentContact: initialData.parentContact || '',
    parentNotificationDate: initialData.parentNotificationDate || ''
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
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="primaryLanguage" className="block text-sm font-medium text-gray-700 mb-1">
            Primary Home Language
          </label>
          <input
            type="text"
            id="primaryLanguage"
            value={formData.primaryLanguage}
            onChange={(e) => setFormData(prev => ({ ...prev, primaryLanguage: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
            Parent/Guardian Name
          </label>
          <input
            type="text"
            id="parentName"
            value={formData.parentName}
            onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="parentContact" className="block text-sm font-medium text-gray-700 mb-1">
            Parent Contact
          </label>
          <input
            type="text"
            id="parentContact"
            value={formData.parentContact}
            onChange={(e) => setFormData(prev => ({ ...prev, parentContact: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="parentNotificationDate" className="block text-sm font-medium text-gray-700 mb-1">
            Parent Notification Date (For Tier 2 or 3)
          </label>
          <input
            type="date"
            id="parentNotificationDate"
            value={formData.parentNotificationDate}
            onChange={(e) => setFormData(prev => ({ ...prev, parentNotificationDate: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            Next: Referral Reason
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}