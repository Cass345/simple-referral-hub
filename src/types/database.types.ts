export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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
        };
      };
      referrals: {
        Row: {
          id: string;
          created_at: string;
          student_id: string;
          referring_user_id: string;
          concern_type: string;
          concern_description: string;
          previous_interventions: string;
          status: string;
          documents: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          student_id: string;
          referring_user_id: string;
          concern_type: string;
          concern_description: string;
          previous_interventions: string;
          status?: string;
          documents?: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          student_id?: string;
          referring_user_id?: string;
          concern_type?: string;
          concern_description?: string;
          previous_interventions?: string;
          status?: string;
          documents?: string[];
        };
      };
      interventions: {
        Row: {
          id: string;
          created_at: string;
          student_id: string;
          referral_id: string;
          type: string;
          tier_level: number;
          start_date: string;
          end_date: string | null;
          goals: string[];
          progress_notes: string[];
          status: string;
          assigned_staff: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          student_id: string;
          referral_id: string;
          type: string;
          tier_level: number;
          start_date: string;
          end_date?: string | null;
          goals?: string[];
          progress_notes?: string[];
          status?: string;
          assigned_staff?: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          student_id?: string;
          referral_id?: string;
          type?: string;
          tier_level?: number;
          start_date?: string;
          end_date?: string | null;
          goals?: string[];
          progress_notes?: string[];
          status?: string;
          assigned_staff?: string[];
        };
      };
      progress_monitoring: {
        Row: {
          id: string;
          created_at: string;
          intervention_id: string;
          date: string;
          metric_name: string;
          metric_value: number;
          notes: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          intervention_id: string;
          date: string;
          metric_name: string;
          metric_value: number;
          notes?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          intervention_id?: string;
          date?: string;
          metric_name?: string;
          metric_value?: number;
          notes?: string;
        };
      };
      behavior_data: {
        Row: {
          id: string;
          created_at: string;
          student_id: string;
          date: string;
          time: string;
          setting: string;
          antecedent: string | null;
          behavior_description: string | null;
          consequence: string | null;
          frequency: number | null;
          duration: number | null;
          intensity: number | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          student_id: string;
          date: string;
          time: string;
          setting: string;
          antecedent?: string | null;
          behavior_description?: string | null;
          consequence?: string | null;
          frequency?: number | null;
          duration?: number | null;
          intensity?: number | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          student_id?: string;
          date?: string;
          time?: string;
          setting?: string;
          antecedent?: string | null;
          behavior_description?: string | null;
          consequence?: string | null;
          frequency?: number | null;
          duration?: number | null;
          intensity?: number | null;
          notes?: string | null;
        };
      };
    };
  };
}
