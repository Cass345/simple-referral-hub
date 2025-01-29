export interface BehaviorData {
  date: string;
  frequency: number;
  duration?: string;
  intensity?: string;
  setting?: string[];
  notes?: string;
}

export interface Database {
  public: {
    Tables: {
      students: {
        Row: StudentProfile;
        Insert: Partial<StudentProfile>;
        Update: Partial<StudentProfile>;
      };
    };
  };
}

export interface StudentProfile {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  grade: number;
  date_of_birth: string;
  parent_name?: string;
  parent_email?: string;
  parent_phone?: string;
  language?: string;
  referring_teacher?: string;
  referral_reasons?: string[];
  concerns?: string[];
  interventions?: any[];
  behavior_data?: BehaviorData[];
  mtss_tier?: number;
  goals?: string[];
  teacherInfo?: {
    teacherName: string;
    grade: number;
    subject: string;
    email: string;
  };
  studentBackground?: {
    previousInterventions: string[];
    academicHistory: string;
    behavioralHistory: string;
    attendanceHistory: string;
  };
  referralReason?: {
    primaryConcern: string;
    specificConcerns: string[];
    previousStrategies: string[];
  };
}