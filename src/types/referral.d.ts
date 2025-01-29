export interface TeacherInfo {
  teacherName: string;
  classroomNumber: string;
  studentName: string;
  studentAge: string;
  studentSchedule: string;
}

export interface StudentBackground {
  previousInterventions: string[];
  academicHistory: string;
  behavioralHistory: string;
  attendanceHistory: string;
}

export interface ReferralReason {
  primaryConcern: string;
  specificConcerns: string[];
  previousStrategies: string[];
}

export interface BehaviorEvaluation {
  frequency: string;
  duration: string;
  intensity: string;
  impact: string;
  setting: string[];
  triggers: string[];
  consequences: string;
}

export interface DataCollectionMethod {
  type: string;
  method: string;
  frequency: string;
  tools: string[];
  notes: string;
}

export interface ReferralFormData {
  teacherInfo: TeacherInfo;
  studentBackground: StudentBackground;
  referralReason: ReferralReason;
  behaviors: Behavior[];
  dataCollection: DataCollectionMethod[];
}

export type BehaviorCategory =
  | 'social-emotional'
  | 'attention-focus'
  | 'communication-language'
  | 'motor-skills'
  | 'adaptive-behaviors'
  | 'challenging-behaviors';

export interface Behavior {
  id?: number;
  name: string;
  category: BehaviorCategory;
  description: string;
  evaluation?: BehaviorEvaluation;
}

export interface BehaviorData {
  date: string;
  frequency: number;
  duration?: string;
  intensity?: string;
  setting?: string[];
  notes?: string;
}

export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  grade: number;
  dob: string;
  studentId: string;
  concerns: string[];
  strengths: string[];
  behaviorData: BehaviorData[];
}