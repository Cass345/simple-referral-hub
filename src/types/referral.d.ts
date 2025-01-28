export interface TeacherInfo {
  teacherName: string;
  classroomNumber: string;
  studentName: string;
  studentAge: string;
  studentSchedule: string;
}

export interface StudentBackground {
  firstName: string;
  lastName: string;
  grade: number;
  dob: string;
  studentId: string;
  primaryLanguage: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentNotificationDate: string;
  strengths: string[];
}

export interface ReferralReason {
  reasons: string[];
  concerns: string[];
  description: string;
}

export interface ReferralFormData {
  teacherInfo: TeacherInfo;
  studentBackground: StudentBackground;
  referralReason: ReferralReason;
  behaviors: any[];
  goals: string[];
  dataCollection: Record<string, any>;
}