export interface BehaviorData {
  date: string;
  frequency: number;
  notes?: string;
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
  interventions?: any[];
  behavior_data?: BehaviorData[];
  mtss_tier: number;
  goals?: string[];
}