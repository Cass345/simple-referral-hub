export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          created_at: string;
          first_name: string;
          last_name: string;
          grade: number;
          date_of_birth: string;
          student_id: string;
          user_id: string;
          referring_teacher: string | null;
          referral_reasons: string[] | null;
          concerns: string[] | null;
          strengths: string[] | null;
          behavior_data: Json[] | null;
          parent_notification_date: string | null;
          parent_name: string | null;
          parent_email: string | null;
          parent_phone: string | null;
          language: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          first_name: string;
          last_name: string;
          grade: number;
          date_of_birth: string;
          student_id: string;
          user_id: string;
          referring_teacher?: string | null;
          referral_reasons?: string[] | null;
          concerns?: string[] | null;
          strengths?: string[] | null;
          behavior_data?: Json[] | null;
          parent_notification_date?: string | null;
          parent_name?: string | null;
          parent_email?: string | null;
          parent_phone?: string | null;
          language?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          first_name?: string;
          last_name?: string;
          grade?: number;
          date_of_birth?: string;
          student_id?: string;
          user_id?: string;
          referring_teacher?: string | null;
          referral_reasons?: string[] | null;
          concerns?: string[] | null;
          strengths?: string[] | null;
          behavior_data?: Json[] | null;
          parent_notification_date?: string | null;
          parent_name?: string | null;
          parent_email?: string | null;
          parent_phone?: string | null;
          language?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          role: string;
        };
        Insert: {
          id: string;
          created_at?: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          role?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          role?: string;
        };
      };
      referrals: {
        Row: {
          id: string;
          created_at: string;
          student_id: string;
          referring_user_id: string | null;
          concern_type: string;
          concern_description: string;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          student_id: string;
          referring_user_id?: string | null;
          concern_type: string;
          concern_description: string;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          student_id?: string;
          referring_user_id?: string | null;
          concern_type?: string;
          concern_description?: string;
          status?: string;
        };
      };
    };
  };
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface StudentProfile {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  grade: number;
  date_of_birth: string;
  student_id: string;
  user_id: string;
  referring_teacher: string | null;
  referral_reasons: string[] | null;
  concerns: string[] | null;
  strengths: string[] | null;
  behavior_data: Json[] | null;
  parent_notification_date: string | null;
  parent_name: string | null;
  parent_email: string | null;
  parent_phone: string | null;
  language: string | null;
  teacherInfo?: any;
  studentBackground?: any;
  referralReason?: any;
}
