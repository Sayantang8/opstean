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
      contacts: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      general_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string
          application_status: string | null
          cover_letter: string | null
          created_at: string
          id: string
          job_title: string | null
          resume_file_data: string | null
          resume_file_name: string | null
          updated_at: string
          years_of_experience: string | null
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string
          application_status?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_title?: string | null
          resume_file_data?: string | null
          resume_file_name?: string | null
          updated_at?: string
          years_of_experience?: string | null
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string
          application_status?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_title?: string | null
          resume_file_data?: string | null
          resume_file_name?: string | null
          updated_at?: string
          years_of_experience?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string
          application_status: string | null
          cover_letter: string | null
          created_at: string
          id: string
          job_id: number
          resume_file_data: string | null
          resume_file_name: string | null
          updated_at: string
          years_of_experience: string | null
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string
          application_status?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_id: number
          resume_file_data?: string | null
          resume_file_name?: string | null
          updated_at?: string
          years_of_experience?: string | null
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string
          application_status?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_id?: number
          resume_file_data?: string | null
          resume_file_name?: string | null
          updated_at?: string
          years_of_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          benefits: string | null
          created_at: string | null
          description: string | null
          experience_level: string | null
          id: number
          is_active: boolean | null
          location: string | null
          requirements: string | null
          salary_max: number | null
          salary_min: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          benefits?: string | null
          created_at?: string | null
          description?: string | null
          experience_level?: string | null
          id?: number
          is_active?: boolean | null
          location?: string | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          title?: string
          updated_at?: string | null
        }
        Update: {
          benefits?: string | null
          created_at?: string | null
          description?: string | null
          experience_level?: string | null
          id?: number
          is_active?: boolean | null
          location?: string | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          composition: string | null
          created_at: string | null
          description: string | null
          dosage: string | null
          featured: boolean | null
          id: number
          image_url: string | null
          is_prescription: boolean | null
          manufacturer: string | null
          name: string
          precautions: string | null
          price: number | null
          sideEffects: string | null
          sku: string | null
          status: string | null
          stock: number | null
          updated_at: string | null
          usage: string | null
        }
        Insert: {
          category?: string | null
          composition?: string | null
          created_at?: string | null
          description?: string | null
          dosage?: string | null
          featured?: boolean | null
          id?: number
          image_url?: string | null
          is_prescription?: boolean | null
          manufacturer?: string | null
          name: string
          precautions?: string | null
          price?: number | null
          sideEffects?: string | null
          sku?: string | null
          status?: string | null
          stock?: number | null
          updated_at?: string | null
          usage?: string | null
        }
        Update: {
          category?: string | null
          composition?: string | null
          created_at?: string | null
          description?: string | null
          dosage?: string | null
          featured?: boolean | null
          id?: number
          image_url?: string | null
          is_prescription?: boolean | null
          manufacturer?: string | null
          name?: string
          precautions?: string | null
          price?: number | null
          sideEffects?: string | null
          sku?: string | null
          status?: string | null
          stock?: number | null
          updated_at?: string | null
          usage?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          is_active: boolean | null
          last_name: string | null
          phone: string | null
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          is_active?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
