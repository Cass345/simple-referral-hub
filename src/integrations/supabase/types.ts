export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      baseline_entries: {
        Row: {
          created_at: string | null
          date: string
          id: string
          notes: string | null
          plan_id: string
          time: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          plan_id: string
          time: string
          user_id: string
          value: number
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          plan_id?: string
          time?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "baseline_entries_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "baseline_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      baseline_plans: {
        Row: {
          behavior_id: string
          collection_method: string
          created_at: string | null
          end_date: string
          id: string
          notes: string | null
          schedule: Json
          start_date: string
          status: string
          user_id: string | null
        }
        Insert: {
          behavior_id: string
          collection_method: string
          created_at?: string | null
          end_date: string
          id?: string
          notes?: string | null
          schedule: Json
          start_date: string
          status?: string
          user_id?: string | null
        }
        Update: {
          behavior_id?: string
          collection_method?: string
          created_at?: string | null
          end_date?: string
          id?: string
          notes?: string | null
          schedule?: Json
          start_date?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "baseline_plans_behavior_id_fkey"
            columns: ["behavior_id"]
            isOneToOne: false
            referencedRelation: "behaviors"
            referencedColumns: ["id"]
          },
        ]
      }
      behaviors: {
        Row: {
          context: string
          created_at: string | null
          description: string
          duration: string
          frequency: string
          id: string
          intensity: string
          notes: string | null
          student_id: string
          user_id: string | null
        }
        Insert: {
          context: string
          created_at?: string | null
          description: string
          duration: string
          frequency: string
          id?: string
          intensity: string
          notes?: string | null
          student_id: string
          user_id?: string | null
        }
        Update: {
          context?: string
          created_at?: string | null
          description?: string
          duration?: string
          frequency?: string
          id?: string
          intensity?: string
          notes?: string | null
          student_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "behaviors_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      fba_assessments: {
        Row: {
          antecedents: string[]
          behavior_id: string
          consequences: string[]
          created_at: string | null
          id: string
          notes: string | null
          perceived_function: string
          setting_patterns: Json
          student_id: string
          user_id: string | null
        }
        Insert: {
          antecedents: string[]
          behavior_id: string
          consequences: string[]
          created_at?: string | null
          id?: string
          notes?: string | null
          perceived_function: string
          setting_patterns: Json
          student_id: string
          user_id?: string | null
        }
        Update: {
          antecedents?: string[]
          behavior_id?: string
          consequences?: string[]
          created_at?: string | null
          id?: string
          notes?: string | null
          perceived_function?: string
          setting_patterns?: Json
          student_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fba_assessments_behavior_id_fkey"
            columns: ["behavior_id"]
            isOneToOne: false
            referencedRelation: "behaviors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fba_assessments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role: string
          user_id: string | null
        }
        Insert: {
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: string
          user_id?: string | null
        }
        Update: {
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      progress_entries: {
        Row: {
          behavior_duration: number | null
          behavior_frequency: number
          behavior_intensity: string
          created_at: string | null
          date: string
          fidelity_notes: string | null
          fidelity_rating: number
          id: string
          notes: string | null
          plan_id: string
          strategies_implemented: string[]
          user_id: string | null
        }
        Insert: {
          behavior_duration?: number | null
          behavior_frequency: number
          behavior_intensity: string
          created_at?: string | null
          date: string
          fidelity_notes?: string | null
          fidelity_rating: number
          id?: string
          notes?: string | null
          plan_id: string
          strategies_implemented: string[]
          user_id?: string | null
        }
        Update: {
          behavior_duration?: number | null
          behavior_frequency?: number
          behavior_intensity?: string
          created_at?: string | null
          date?: string
          fidelity_notes?: string | null
          fidelity_rating?: number
          id?: string
          notes?: string | null
          plan_id?: string
          strategies_implemented?: string[]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_entries_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "tier1_intervention_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      reinforcer_assessments: {
        Row: {
          created_at: string | null
          effectiveness_data: Json
          id: string
          notes: string | null
          preferences: Json
          student_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          effectiveness_data: Json
          id?: string
          notes?: string | null
          preferences: Json
          student_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          effectiveness_data?: Json
          id?: string
          notes?: string | null
          preferences?: Json
          student_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reinforcer_assessments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          classroom: string | null
          concerns: string | null
          created_at: string | null
          current_supports: string | null
          date_of_birth: string | null
          first_name: string
          gender: string | null
          grade: string | null
          id: string
          last_name: string
          mtss_tier: string | null
          notes: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          primary_language: string | null
          referring_teacher: string | null
          strengths: string | null
          student_id: number | null
          teacher_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          classroom?: string | null
          concerns?: string | null
          created_at?: string | null
          current_supports?: string | null
          date_of_birth?: string | null
          first_name: string
          gender?: string | null
          grade?: string | null
          id?: string
          last_name: string
          mtss_tier?: string | null
          notes?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          primary_language?: string | null
          referring_teacher?: string | null
          strengths?: string | null
          student_id?: number | null
          teacher_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          classroom?: string | null
          concerns?: string | null
          created_at?: string | null
          current_supports?: string | null
          date_of_birth?: string | null
          first_name?: string
          gender?: string | null
          grade?: string | null
          id?: string
          last_name?: string
          mtss_tier?: string | null
          notes?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          primary_language?: string | null
          referring_teacher?: string | null
          strengths?: string | null
          student_id?: number | null
          teacher_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tier1_checklists: {
        Row: {
          completed_at: string | null
          focus_area: string | null
          id: number
          practices: Json | null
          reflection: string | null
          teacher_id: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          focus_area?: string | null
          id?: number
          practices?: Json | null
          reflection?: string | null
          teacher_id?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          focus_area?: string | null
          id?: number
          practices?: Json | null
          reflection?: string | null
          teacher_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tier1_intervention_plans: {
        Row: {
          behavior_id: string
          created_at: string | null
          id: string
          monitoring_frequency: string
          notes: string | null
          start_date: string
          student_id: string
          user_id: string
        }
        Insert: {
          behavior_id: string
          created_at?: string | null
          id?: string
          monitoring_frequency: string
          notes?: string | null
          start_date: string
          student_id: string
          user_id: string
        }
        Update: {
          behavior_id?: string
          created_at?: string | null
          id?: string
          monitoring_frequency?: string
          notes?: string | null
          start_date?: string
          student_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tier1_intervention_plans_behavior_id_fkey"
            columns: ["behavior_id"]
            isOneToOne: false
            referencedRelation: "behaviors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tier1_intervention_plans_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      tier1_plan_strategies: {
        Row: {
          created_at: string | null
          id: string
          implementation_notes: string | null
          plan_id: string
          status: string
          strategy_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          implementation_notes?: string | null
          plan_id: string
          status?: string
          strategy_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          implementation_notes?: string | null
          plan_id?: string
          status?: string
          strategy_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tier1_plan_strategies_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "tier1_intervention_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tier1_plan_strategies_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "tier1_strategies"
            referencedColumns: ["id"]
          },
        ]
      }
      tier1_strategies: {
        Row: {
          category: string
          created_at: string | null
          description: string
          evidence_level: string
          id: string
          implementation_steps: Json
          resources: Json | null
          title: string
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          evidence_level: string
          id?: string
          implementation_steps: Json
          resources?: Json | null
          title: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          evidence_level?: string
          id?: string
          implementation_steps?: Json
          resources?: Json | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tier1_task_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          focus_area: string | null
          id: string
          improvement_plan: string | null
          notes: string | null
          status: string
          task_id: string
          teacher_id: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          focus_area?: string | null
          id?: string
          improvement_plan?: string | null
          notes?: string | null
          status?: string
          task_id: string
          teacher_id: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          focus_area?: string | null
          id?: string
          improvement_plan?: string | null
          notes?: string | null
          status?: string
          task_id?: string
          teacher_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tier1_task_progress_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tier1_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tier1_tasks: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          order: number
          required: boolean | null
          title: string
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          order: number
          required?: boolean | null
          title: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          order?: number
          required?: boolean | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
