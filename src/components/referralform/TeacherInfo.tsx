import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import type { StudentProfile } from '@/types/database.types';
import { supabase } from '@/lib/supabase';

interface TeacherInfoProps {
  onSubmit: (data: Partial<StudentProfile>) => void;
  initialData?: Partial<StudentProfile>;
}

export function TeacherInfo({ onSubmit, initialData }: TeacherInfoProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    grade: initialData?.grade || '',
    date_of_birth: initialData?.date_of_birth ? new Date(initialData.date_of_birth).toISOString().split('T')[0] : '',
    student_id: initialData?.student_id || '',
    referring_teacher: initialData?.referring_teacher || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // First check if we're authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to submit referrals",
          variant: "destructive",
        });
        return;
      }

      // Format the data
      const formattedData = {
        ...formData,
        date_of_birth: formData.date_of_birth ? new Date(formData.date_of_birth).toISOString() : null,
        created_by: session.user.id,
        updated_at: new Date().toISOString()
      };

      onSubmit(formattedData);
      
      toast({
        title: "Success",
        description: "Student information saved successfully",
      });
    } catch (error) {
      console.error('Error saving student info:', error);
      toast({
        title: "Error",
        description: "Failed to save student information. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              value={formData.first_name}
              onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              value={formData.last_name}
              onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <input
              type="text"
              id="grade"
              value={formData.grade}
              onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              value={formData.date_of_birth}
              onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="student_id" className="block text-sm font-medium text-gray-700 mb-1">
              Student ID
            </label>
            <input
              type="text"
              id="student_id"
              value={formData.student_id}
              onChange={(e) => setFormData(prev => ({ ...prev, student_id: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="referring_teacher" className="block text-sm font-medium text-gray-700 mb-1">
              Referring Teacher
            </label>
            <input
              type="text"
              id="referring_teacher"
              value={formData.referring_teacher}
              onChange={(e) => setFormData(prev => ({ ...prev, referring_teacher: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
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