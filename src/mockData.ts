import { Behavior, BehaviorCategory, BehaviorData, TeacherInfo, StudentBackground, ReferralReason } from '@/types/referral';
import { StudentProfile } from '@/types/database.types';

// Example student profile data
export const mockStudentProfile: StudentProfile = {
  id: "1",
  created_at: "2024-01-29T00:00:00Z",
  first_name: "Michael",
  last_name: "Johnson",
  grade: 4,
  date_of_birth: "2014-05-15",
  student_id: "STU2024001",
  user_id: "user123",
  referring_teacher: "Sarah Johnson",
  referral_reasons: ["academic", "behavior_attendance"],
  concerns: ["Reading comprehension", "Task completion"],
  strengths: ["Creative thinking", "Verbal communication"],
  behavior_data: [
    {
      date: "2024-01-15",
      frequency: 5
    },
    {
      date: "2024-01-22",
      frequency: 3
    }
  ],
  parent_notification_date: "2024-01-10",
  parent_name: "Robert Johnson",
  parent_email: "robert.johnson@email.com",
  parent_phone: "555-0123",
  language: "English",
  teacherInfo: {
    teacherName: "Sarah Johnson",
    grade: 4,
    subject: "All subjects",
    email: "sarah.johnson@school.edu"
  },
  studentBackground: {
    previousInterventions: ["Small group reading", "Behavior chart"],
    academicHistory: "Consistent C average, struggling with reading",
    behavioralHistory: "Occasional task avoidance",
    attendanceHistory: "90% attendance rate"
  },
  referralReason: {
    primaryConcern: "Academic and behavioral support needed",
    specificConcerns: ["Reading comprehension", "Task completion"],
    previousStrategies: ["Small group instruction", "Positive reinforcement"]
  }
};
