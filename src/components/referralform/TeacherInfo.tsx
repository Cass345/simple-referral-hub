import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface TeacherFormData {
  teacherName: string;
  classroomNumber: string;
  studentName: string;
  studentAge: string;
  studentSchedule: string;
}

interface TeacherInfoProps {
  onSubmit: (data: TeacherFormData) => void;
  initialData?: Partial<TeacherFormData>;
}

export function TeacherInfo({ onSubmit, initialData = {} }: TeacherInfoProps) {
  const [formData, setFormData] = useState({
    teacherName: initialData.teacherName || '',
    classroomNumber: initialData.classroomNumber || '',
    studentName: initialData.studentName || '',
    studentAge: initialData.studentAge || '',
    studentSchedule: initialData.studentSchedule || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Teacher Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700 mb-1">
            Teacher Name
          </label>
          <input
            type="text"
            id="teacherName"
            value={formData.teacherName}
            onChange={(e) => setFormData(prev => ({ ...prev, teacherName: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="classroomNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Classroom Number
          </label>
          <input
            type="text"
            id="classroomNumber"
            value={formData.classroomNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, classroomNumber: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
            Student Name
          </label>
          <input
            type="text"
            id="studentName"
            value={formData.studentName}
            onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="studentAge" className="block text-sm font-medium text-gray-700 mb-1">
            Student Age
          </label>
          <input
            type="number"
            id="studentAge"
            value={formData.studentAge}
            onChange={(e) => setFormData(prev => ({ ...prev, studentAge: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="studentSchedule" className="block text-sm font-medium text-gray-700 mb-1">
            Student Schedule
          </label>
          <select
            id="studentSchedule"
            value={formData.studentSchedule}
            onChange={(e) => setFormData(prev => ({ ...prev, studentSchedule: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Schedule</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            Next: Student Background
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}