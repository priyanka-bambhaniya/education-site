export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          role: "student" | "teacher" | "admin" | "parent";
          name: string | null;
          email: string;
          school_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: "student" | "teacher" | "admin" | "parent";
          name?: string | null;
          email: string;
          school_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
      schools: {
        Row: {
          id: string;
          name: string;
          district_name: string;
          timezone: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          district_name: string;
          timezone?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["schools"]["Insert"]>;
      };
      classes: {
        Row: {
          id: string;
          school_id: string;
          teacher_id: string;
          name: string;
          subject: string;
          grade_band: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          teacher_id: string;
          name: string;
          subject: string;
          grade_band: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["classes"]["Insert"]>;
      };
      assessments: {
        Row: {
          id: string;
          class_id: string;
          title: string;
          status: "draft" | "published" | "archived";
          scheduled_for: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          class_id: string;
          title: string;
          status?: "draft" | "published" | "archived";
          scheduled_for?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["assessments"]["Insert"]>;
      };
      question_bank: {
        Row: {
          id: string;
          assessment_id: string | null;
          standard_code: string;
          difficulty: "emerging" | "proficient" | "advanced";
          prompt: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          assessment_id?: string | null;
          standard_code: string;
          difficulty: "emerging" | "proficient" | "advanced";
          prompt: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["question_bank"]["Insert"]>;
      };
      student_responses: {
        Row: {
          id: string;
          assessment_id: string;
          student_id: string;
          score: number;
          submitted_at: string;
          metadata: Json;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          student_id: string;
          score: number;
          submitted_at?: string;
          metadata?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["student_responses"]["Insert"]>;
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: "student" | "teacher" | "admin" | "parent";
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: "student" | "teacher" | "admin" | "parent";
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
    };
  };
};
