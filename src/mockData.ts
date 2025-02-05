import type { StudentProfile } from '@/types/database.types';

export const mockStudentProfile: StudentProfile = {
  id: "1",
  student_id: 2024001, // Changed to number
  first_name: "Michael",
  last_name: "Johnson",
  grade: "4",
  date_of_birth: "2014-05-15",
  referring_teacher: "Sarah Johnson",
  referral_reasons: ["Academic Support", "Behavior Management"],
  concerns: ["Reading comprehension", "Task completion"],
  behavior_data: [
    {
      date: "2024-01-15",
      frequency: 5,
      notes: "Difficulty staying on task"
    },
    {
      date: "2024-01-22",
      frequency: 3,
      notes: "Showing improvement"
    }
  ],
  parent_name: "Robert Johnson",
  parent_email: "robert.johnson@email.com",
  parent_phone: "555-0123",
  primary_language: "English",
  goals: [
    "Improve reading comprehension",
    "Complete tasks within given timeframe",
    "Follow classroom routines"
  ],
  mtss_tier: 2,
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