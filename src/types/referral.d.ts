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
  reasons: {
    academic: boolean;
    behavior: boolean;
    socialEmotional: boolean;
  };
  concerns: string[];
  description: string;
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
  method: string; // e.g., 'Observation', 'Survey', 'Checklist'
  frequency: string; // e.g., 'Daily', 'Weekly'
  tools: string[]; // e.g., ['ABC Chart', 'Frequency Count']
  notes: string; // Additional notes
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
  name?: string;
  category: BehaviorCategory; // Required property
  description?: string;
  frequency?: string;
  duration?: string;
  intensity?: string;
  impact?: string;
}

