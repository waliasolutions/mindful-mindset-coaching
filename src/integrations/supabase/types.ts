export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          buffer_time_mins: number | null
          category: string
          created_at: string
          description: string | null
          end_time: string | null
          id: string
          is_time_sensitive: boolean
          location: string | null
          repeat_custom: string | null
          repeat_days: number[] | null
          repeat_pattern: string | null
          scheduled_time: string
          status: string
          streak: number
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          buffer_time_mins?: number | null
          category: string
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          is_time_sensitive?: boolean
          location?: string | null
          repeat_custom?: string | null
          repeat_days?: number[] | null
          repeat_pattern?: string | null
          scheduled_time: string
          status: string
          streak?: number
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          buffer_time_mins?: number | null
          category?: string
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          is_time_sensitive?: boolean
          location?: string | null
          repeat_custom?: string | null
          repeat_days?: number[] | null
          repeat_pattern?: string | null
          scheduled_time?: string
          status?: string
          streak?: number
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      admin_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          ip_address: unknown | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          ip_address?: unknown | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          failed_login_attempts: number | null
          id: string
          is_active: boolean
          last_login_at: string | null
          locked_until: string | null
          password_hash: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          failed_login_attempts?: number | null
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          locked_until?: string | null
          password_hash: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          failed_login_attempts?: number | null
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          locked_until?: string | null
          password_hash?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      agents: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      assessments: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          is_completed: boolean | null
          is_public: boolean | null
          mission_statement: string | null
          overall_score: number
          participant_email: string | null
          participant_name: string | null
          partner_name: string | null
          responses: Json
          results: Json
          selected_bible_verse: string | null
          session_id: string | null
          share_token: string
          updated_at: string
          user_id: string | null
          vision_mapping_data: Json | null
          vision_statement: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          is_public?: boolean | null
          mission_statement?: string | null
          overall_score: number
          participant_email?: string | null
          participant_name?: string | null
          partner_name?: string | null
          responses: Json
          results: Json
          selected_bible_verse?: string | null
          session_id?: string | null
          share_token?: string
          updated_at?: string
          user_id?: string | null
          vision_mapping_data?: Json | null
          vision_statement?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          is_public?: boolean | null
          mission_statement?: string | null
          overall_score?: number
          participant_email?: string | null
          participant_name?: string | null
          partner_name?: string | null
          responses?: Json
          results?: Json
          selected_bible_verse?: string | null
          session_id?: string | null
          share_token?: string
          updated_at?: string
          user_id?: string | null
          vision_mapping_data?: Json | null
          vision_statement?: string | null
        }
        Relationships: []
      }
      assignment_history: {
        Row: {
          assigned_at: string
          assignment_iso_week: number
          assignment_year: number
          chore_color: string | null
          chore_icon: string | null
          chore_id: string
          chore_name: string
          created_at: string
          id: string
          participant_id: string
          participant_name: string
        }
        Insert: {
          assigned_at?: string
          assignment_iso_week: number
          assignment_year: number
          chore_color?: string | null
          chore_icon?: string | null
          chore_id: string
          chore_name: string
          created_at?: string
          id?: string
          participant_id: string
          participant_name: string
        }
        Update: {
          assigned_at?: string
          assignment_iso_week?: number
          assignment_year?: number
          chore_color?: string | null
          chore_icon?: string | null
          chore_id?: string
          chore_name?: string
          created_at?: string
          id?: string
          participant_id?: string
          participant_name?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          comment: string | null
          created_at: string
          date: string
          deleted_at: string | null
          email: string
          email_attempts: number | null
          email_error: string | null
          email_status: string | null
          id: string
          last_email_attempt: string | null
          name: string
          profile_id: string | null
          rejection_message: string | null
          status: string
          time: string
          updated_at: string
          user_id: string | null
          verification_token: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          date: string
          deleted_at?: string | null
          email: string
          email_attempts?: number | null
          email_error?: string | null
          email_status?: string | null
          id?: string
          last_email_attempt?: string | null
          name: string
          profile_id?: string | null
          rejection_message?: string | null
          status?: string
          time: string
          updated_at?: string
          user_id?: string | null
          verification_token?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          date?: string
          deleted_at?: string | null
          email?: string
          email_attempts?: number | null
          email_error?: string | null
          email_status?: string | null
          id?: string
          last_email_attempt?: string | null
          name?: string
          profile_id?: string | null
          rejection_message?: string | null
          status?: string
          time?: string
          updated_at?: string
          user_id?: string | null
          verification_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_with_email"
            referencedColumns: ["id"]
          },
        ]
      }
      client_activities: {
        Row: {
          activity_type: string
          billable: boolean
          category: string | null
          client_id: string
          created_at: string | null
          duration: number
          employee_id: string
          id: string
          notes: string
          tags: string[] | null
          timestamp: string
          updated_at: string | null
        }
        Insert: {
          activity_type: string
          billable?: boolean
          category?: string | null
          client_id: string
          created_at?: string | null
          duration: number
          employee_id: string
          id?: string
          notes: string
          tags?: string[] | null
          timestamp: string
          updated_at?: string | null
        }
        Update: {
          activity_type?: string
          billable?: boolean
          category?: string | null
          client_id?: string
          created_at?: string | null
          duration?: number
          employee_id?: string
          id?: string
          notes?: string
          tags?: string[] | null
          timestamp?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_activities_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_activities_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_activities_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string
          city: string | null
          company_name: string | null
          company_type: string | null
          contact_person: string
          contingent_hours: number
          country: string | null
          created_at: string | null
          email: string
          firstname: string | null
          iban: string | null
          id: string
          lastname: string | null
          name: string
          notes: string | null
          phone: string
          postal_code: string | null
          remaining_hours: number
          start_date: string
          status: string
          street_address: string | null
          tax_canton: string | null
          uid: string | null
          updated_at: string | null
          vat_number: string | null
        }
        Insert: {
          address: string
          city?: string | null
          company_name?: string | null
          company_type?: string | null
          contact_person: string
          contingent_hours?: number
          country?: string | null
          created_at?: string | null
          email: string
          firstname?: string | null
          iban?: string | null
          id?: string
          lastname?: string | null
          name: string
          notes?: string | null
          phone: string
          postal_code?: string | null
          remaining_hours?: number
          start_date: string
          status?: string
          street_address?: string | null
          tax_canton?: string | null
          uid?: string | null
          updated_at?: string | null
          vat_number?: string | null
        }
        Update: {
          address?: string
          city?: string | null
          company_name?: string | null
          company_type?: string | null
          contact_person?: string
          contingent_hours?: number
          country?: string | null
          created_at?: string | null
          email?: string
          firstname?: string | null
          iban?: string | null
          id?: string
          lastname?: string | null
          name?: string
          notes?: string | null
          phone?: string
          postal_code?: string | null
          remaining_hours?: number
          start_date?: string
          status?: string
          street_address?: string | null
          tax_canton?: string | null
          uid?: string | null
          updated_at?: string | null
          vat_number?: string | null
        }
        Relationships: []
      }
      collages: {
        Row: {
          created_at: string
          id: string
          image_url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      contact_form_submissions: {
        Row: {
          budget: string
          company_name: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          notification_sent: boolean | null
          phone: string
          project_type: string
          type: string
          website: string | null
        }
        Insert: {
          budget: string
          company_name?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          notification_sent?: boolean | null
          phone: string
          project_type: string
          type: string
          website?: string | null
        }
        Update: {
          budget?: string
          company_name?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          notification_sent?: boolean | null
          phone?: string
          project_type?: string
          type?: string
          website?: string | null
        }
        Relationships: []
      }
      content_versions: {
        Row: {
          content_id: string | null
          content_value: Json
          created_at: string | null
          created_by: string | null
          id: string
          version_number: number
        }
        Insert: {
          content_id?: string | null
          content_value: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          version_number: number
        }
        Update: {
          content_id?: string | null
          content_value?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "content_versions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "page_content"
            referencedColumns: ["id"]
          },
        ]
      }
      contingent_history: {
        Row: {
          action: string
          change: number
          client_id: string
          created_at: string
          id: string
          new_contingent: number
          old_contingent: number
          processed_by: string | null
          reason: string | null
        }
        Insert: {
          action: string
          change: number
          client_id: string
          created_at?: string
          id?: string
          new_contingent: number
          old_contingent: number
          processed_by?: string | null
          reason?: string | null
        }
        Update: {
          action?: string
          change?: number
          client_id?: string
          created_at?: string
          id?: string
          new_contingent?: number
          old_contingent?: number
          processed_by?: string | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contingent_history_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contingent_history_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contingent_history_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      contingent_requests: {
        Row: {
          client_id: string
          created_at: string
          id: string
          processed_at: string | null
          processed_by: string | null
          reason: string | null
          requested_hours: number
          status: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          requested_hours: number
          status?: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          requested_hours?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contingent_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contingent_requests_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contingent_requests_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          created_at: string | null
          file_path: string
          id: string
          original_name: string
          signature: string | null
          signed_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          file_path: string
          id?: string
          original_name: string
          signature?: string | null
          signed_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          file_path?: string
          id?: string
          original_name?: string
          signature?: string | null
          signed_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      dns_records: {
        Row: {
          created_at: string | null
          host: string
          id: string
          priority: number | null
          record_type: string
          ttl: number | null
          updated_at: string | null
          value: string
          website_id: string | null
        }
        Insert: {
          created_at?: string | null
          host: string
          id?: string
          priority?: number | null
          record_type: string
          ttl?: number | null
          updated_at?: string | null
          value: string
          website_id?: string | null
        }
        Update: {
          created_at?: string | null
          host?: string
          id?: string
          priority?: number | null
          record_type?: string
          ttl?: number | null
          updated_at?: string | null
          value?: string
          website_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dns_records_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      downloads: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_settings: {
        Row: {
          created_at: string
          id: string
          last_sent_at: string | null
          report_email: string
          schedule_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          last_sent_at?: string | null
          report_email: string
          schedule_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          last_sent_at?: string | null
          report_email?: string
          schedule_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      employee_client_assignments: {
        Row: {
          assigned_at: string | null
          client_id: string
          employee_id: string
          id: string
        }
        Insert: {
          assigned_at?: string | null
          client_id: string
          employee_id: string
          id?: string
        }
        Update: {
          assigned_at?: string | null
          client_id?: string
          employee_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_client_assignments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_client_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_client_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_default_availability: {
        Row: {
          created_at: string | null
          day_of_week: number
          employee_id: string
          end_hour: number
          id: string
          is_available: boolean
          start_hour: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          employee_id: string
          end_hour: number
          id?: string
          is_available?: boolean
          start_hour: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          employee_id?: string
          end_hour?: number
          id?: string
          is_available?: boolean
          start_hour?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_default_availability_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_default_availability_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_status: {
        Row: {
          created_at: string | null
          employee_id: string
          id: string
          last_activity: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          employee_id: string
          id?: string
          last_activity?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          employee_id?: string
          id?: string
          last_activity?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_status_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: true
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_status_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: true
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          accident_insurance_number: string | null
          address: string | null
          ahv_number: string | null
          avatar_url: string | null
          bank_clearing_number: string | null
          bank_name: string | null
          birth_date: string | null
          city: string | null
          contract_type: string | null
          country: string | null
          created_at: string | null
          department: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relation: string | null
          employment_end_date: string | null
          employment_start_date: string | null
          firstname: string | null
          gender: string | null
          has_children: boolean | null
          health_insurance_provider: string | null
          hourly_rate: number | null
          iban: string | null
          id: string
          kinderzulagen_eligible: boolean | null
          last_active: string | null
          last_seen: string | null
          lastname: string | null
          marital_status: string | null
          monthly_salary: number | null
          name: string
          nationality: string | null
          pension_fund_number: string | null
          phone: string | null
          position: string | null
          postal_code: string | null
          responsibilities: string | null
          role: string
          salary_type: string | null
          skills: string[] | null
          status: string
          street_address: string | null
          tax_canton: string | null
          tax_municipality: string | null
          updated_at: string | null
          vacation_days_per_year: number | null
          work_permit_expires: string | null
          work_permit_type: string | null
          work_type: string
          working_hours_per_week: number | null
        }
        Insert: {
          accident_insurance_number?: string | null
          address?: string | null
          ahv_number?: string | null
          avatar_url?: string | null
          bank_clearing_number?: string | null
          bank_name?: string | null
          birth_date?: string | null
          city?: string | null
          contract_type?: string | null
          country?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          employment_end_date?: string | null
          employment_start_date?: string | null
          firstname?: string | null
          gender?: string | null
          has_children?: boolean | null
          health_insurance_provider?: string | null
          hourly_rate?: number | null
          iban?: string | null
          id?: string
          kinderzulagen_eligible?: boolean | null
          last_active?: string | null
          last_seen?: string | null
          lastname?: string | null
          marital_status?: string | null
          monthly_salary?: number | null
          name: string
          nationality?: string | null
          pension_fund_number?: string | null
          phone?: string | null
          position?: string | null
          postal_code?: string | null
          responsibilities?: string | null
          role: string
          salary_type?: string | null
          skills?: string[] | null
          status?: string
          street_address?: string | null
          tax_canton?: string | null
          tax_municipality?: string | null
          updated_at?: string | null
          vacation_days_per_year?: number | null
          work_permit_expires?: string | null
          work_permit_type?: string | null
          work_type?: string
          working_hours_per_week?: number | null
        }
        Update: {
          accident_insurance_number?: string | null
          address?: string | null
          ahv_number?: string | null
          avatar_url?: string | null
          bank_clearing_number?: string | null
          bank_name?: string | null
          birth_date?: string | null
          city?: string | null
          contract_type?: string | null
          country?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          employment_end_date?: string | null
          employment_start_date?: string | null
          firstname?: string | null
          gender?: string | null
          has_children?: boolean | null
          health_insurance_provider?: string | null
          hourly_rate?: number | null
          iban?: string | null
          id?: string
          kinderzulagen_eligible?: boolean | null
          last_active?: string | null
          last_seen?: string | null
          lastname?: string | null
          marital_status?: string | null
          monthly_salary?: number | null
          name?: string
          nationality?: string | null
          pension_fund_number?: string | null
          phone?: string | null
          position?: string | null
          postal_code?: string | null
          responsibilities?: string | null
          role?: string
          salary_type?: string | null
          skills?: string[] | null
          status?: string
          street_address?: string | null
          tax_canton?: string | null
          tax_municipality?: string | null
          updated_at?: string | null
          vacation_days_per_year?: number | null
          work_permit_expires?: string | null
          work_permit_type?: string | null
          work_type?: string
          working_hours_per_week?: number | null
        }
        Relationships: []
      }
      excel_files: {
        Row: {
          booking_count: number | null
          error_count: number | null
          error_details: Json | null
          file_name: string
          file_path: string
          file_type: string
          id: string
          processed_at: string | null
          status: string | null
          success_count: number | null
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_count?: number | null
          error_count?: number | null
          error_details?: Json | null
          file_name: string
          file_path: string
          file_type: string
          id?: string
          processed_at?: string | null
          status?: string | null
          success_count?: number | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_count?: number | null
          error_count?: number | null
          error_details?: Json | null
          file_name?: string
          file_path?: string
          file_type?: string
          id?: string
          processed_at?: string | null
          status?: string | null
          success_count?: number | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          budget: string | null
          company: string | null
          consent: boolean
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          status: string | null
          timeline: string | null
        }
        Insert: {
          budget?: string | null
          company?: string | null
          consent?: boolean
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          status?: string | null
          timeline?: string | null
        }
        Update: {
          budget?: string | null
          company?: string | null
          consent?: boolean
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          status?: string | null
          timeline?: string | null
        }
        Relationships: []
      }
      global_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      guestbook_entries: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          image_url: string | null
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          message: string
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          message?: string
          name?: string
        }
        Relationships: []
      }
      guestbook_reactions: {
        Row: {
          created_at: string
          created_by: string | null
          entry_id: string
          id: string
          reaction: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          entry_id: string
          id?: string
          reaction: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          entry_id?: string
          id?: string
          reaction?: string
        }
        Relationships: [
          {
            foreignKeyName: "guestbook_reactions_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "guestbook_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      image_usage: {
        Row: {
          created_at: string | null
          id: string
          image_id: string
          section_id: string
          section_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_id: string
          section_id: string
          section_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_id?: string
          section_id?: string
          section_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "image_usage_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "media_library"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_activities: {
        Row: {
          activity_type: string
          completed_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          lead_id: string
          metadata: Json | null
          scheduled_at: string | null
          title: string
        }
        Insert: {
          activity_type: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          lead_id: string
          metadata?: Json | null
          scheduled_at?: string | null
          title: string
        }
        Update: {
          activity_type?: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          lead_id?: string
          metadata?: Json | null
          scheduled_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "unified_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_comments: {
        Row: {
          comment: string
          created_at: string | null
          created_by: string | null
          id: string
          lead_id: string | null
        }
        Insert: {
          comment: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          lead_id?: string | null
        }
        Update: {
          comment?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          lead_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_comments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_magnet_downloads: {
        Row: {
          created_at: string
          email: string
          form_data: Json | null
          id: string
          magnet_type: Database["public"]["Enums"]["lead_magnet_type_enum"]
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          form_data?: Json | null
          id?: string
          magnet_type: Database["public"]["Enums"]["lead_magnet_type_enum"]
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          form_data?: Json | null
          id?: string
          magnet_type?: Database["public"]["Enums"]["lead_magnet_type_enum"]
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_magnet_downloads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_magnet_downloads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles_with_email"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_status_history: {
        Row: {
          call_scheduled_at: string | null
          changed_at: string | null
          changed_by: string | null
          event_type: string | null
          id: string
          lead_id: string | null
          new_status: string
          old_status: string | null
        }
        Insert: {
          call_scheduled_at?: string | null
          changed_at?: string | null
          changed_by?: string | null
          event_type?: string | null
          id?: string
          lead_id?: string | null
          new_status: string
          old_status?: string | null
        }
        Update: {
          call_scheduled_at?: string | null
          changed_at?: string | null
          changed_by?: string | null
          event_type?: string | null
          id?: string
          lead_id?: string | null
          new_status?: string
          old_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_status_history_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          agent_id: string | null
          appointment_at: string | null
          appointment_confirmed: boolean | null
          appointment_notes: string | null
          call_scheduled_at: string | null
          city: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          first_name: string | null
          id: string
          interests: string[] | null
          last_name: string | null
          message: string | null
          phone: string
          status: string
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          agent_id?: string | null
          appointment_at?: string | null
          appointment_confirmed?: boolean | null
          appointment_notes?: string | null
          call_scheduled_at?: string | null
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          first_name?: string | null
          id?: string
          interests?: string[] | null
          last_name?: string | null
          message?: string | null
          phone: string
          status?: string
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          agent_id?: string | null
          appointment_at?: string | null
          appointment_confirmed?: boolean | null
          appointment_notes?: string | null
          call_scheduled_at?: string | null
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string | null
          id?: string
          interests?: string[] | null
          last_name?: string | null
          message?: string | null
          phone?: string
          status?: string
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string | null
          dimensions: Json | null
          file_name: string | null
          file_size: number | null
          file_type: string | null
          id: string
          image_url: string
          optimized_url: string | null
          updated_at: string | null
          usage_context: string[] | null
          user_id: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          dimensions?: Json | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          image_url: string
          optimized_url?: string | null
          updated_at?: string | null
          usage_context?: string[] | null
          user_id?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          dimensions?: Json | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          image_url?: string
          optimized_url?: string | null
          updated_at?: string | null
          usage_context?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          priority: string | null
          read: boolean | null
          subject: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          priority?: string | null
          read?: boolean | null
          subject: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          priority?: string | null
          read?: boolean | null
          subject?: string
        }
        Relationships: []
      }
      moodboard_items: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          image_url: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          image_url: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          image_url?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notification_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          subject: string
          type: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          subject: string
          type: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          subject?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean
          related_id: string | null
          related_type: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean
          related_id?: string | null
          related_type?: string | null
          title: string
          type?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean
          related_id?: string | null
          related_type?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      offer_requests: {
        Row: {
          budget_range: string | null
          company_name: string
          company_size: string | null
          contact_person_function: string
          contact_person_name: string
          created_at: string
          current_crm: string | null
          email: string
          id: string
          implementation_timeline: string | null
          industry: string | null
          notification_sent: boolean | null
          pain_points: string | null
          phone: string
          roi_calculator_inputs: Json | null
          roi_calculator_results: Json | null
          source: string | null
          status: string | null
        }
        Insert: {
          budget_range?: string | null
          company_name: string
          company_size?: string | null
          contact_person_function: string
          contact_person_name: string
          created_at?: string
          current_crm?: string | null
          email: string
          id?: string
          implementation_timeline?: string | null
          industry?: string | null
          notification_sent?: boolean | null
          pain_points?: string | null
          phone: string
          roi_calculator_inputs?: Json | null
          roi_calculator_results?: Json | null
          source?: string | null
          status?: string | null
        }
        Update: {
          budget_range?: string | null
          company_name?: string
          company_size?: string | null
          contact_person_function?: string
          contact_person_name?: string
          created_at?: string
          current_crm?: string | null
          email?: string
          id?: string
          implementation_timeline?: string | null
          industry?: string | null
          notification_sent?: boolean | null
          pain_points?: string | null
          phone?: string
          roi_calculator_inputs?: Json | null
          roi_calculator_results?: Json | null
          source?: string | null
          status?: string | null
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content_key: string
          content_type: string
          content_value: Json
          created_at: string | null
          id: string
          page_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          content_key: string
          content_type: string
          content_value: Json
          created_at?: string | null
          id?: string
          page_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          content_key?: string
          content_type?: string
          content_value?: Json
          created_at?: string | null
          id?: string
          page_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          created_at: string | null
          id: string
          last_checked: string | null
          meta_description: string | null
          suggested_description: string | null
          suggested_title: string | null
          title: string | null
          url: string
          website_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_checked?: string | null
          meta_description?: string | null
          suggested_description?: string | null
          suggested_title?: string | null
          title?: string | null
          url: string
          website_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_checked?: string | null
          meta_description?: string | null
          suggested_description?: string | null
          suggested_title?: string | null
          title?: string | null
          url?: string
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pages_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean
          logo_url: string
          name: string
          updated_at: string
          website_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean
          logo_url: string
          name: string
          updated_at?: string
          website_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean
          logo_url?: string
          name?: string
          updated_at?: string
          website_url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          hourly_rate: number | null
          id: string
          notification_preferences: Json | null
          role: string | null
          specialty: string | null
          years_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          hourly_rate?: number | null
          id: string
          notification_preferences?: Json | null
          role?: string | null
          specialty?: string | null
          years_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          hourly_rate?: number | null
          id?: string
          notification_preferences?: Json | null
          role?: string | null
          specialty?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      project_documents: {
        Row: {
          created_at: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          project_id: string | null
          title: string
        }
        Insert: {
          created_at?: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          project_id?: string | null
          title: string
        }
        Update: {
          created_at?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          project_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      reminders: {
        Row: {
          activity_id: string | null
          created_at: string
          id: string
          is_read: boolean
          response: string | null
          response_time: string | null
          time: string
        }
        Insert: {
          activity_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          response?: string | null
          response_time?: string | null
          time: string
        }
        Update: {
          activity_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          response?: string | null
          response_time?: string | null
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminders_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      rsvp_entries: {
        Row: {
          adults: number
          created_at: string
          created_by: string | null
          id: string
          kids: number
          name: string
          snacks_description: string | null
          will_bring_snacks: boolean
        }
        Insert: {
          adults?: number
          created_at?: string
          created_by?: string | null
          id?: string
          kids?: number
          name: string
          snacks_description?: string | null
          will_bring_snacks?: boolean
        }
        Update: {
          adults?: number
          created_at?: string
          created_by?: string | null
          id?: string
          kids?: number
          name?: string
          snacks_description?: string | null
          will_bring_snacks?: boolean
        }
        Relationships: []
      }
      schedule_change_requests: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          employee_id: string
          id: string
          reason: string | null
          requested_changes: Json
          reviewed_at: string | null
          reviewed_by: string | null
          schedule_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          employee_id: string
          id?: string
          reason?: string | null
          requested_changes: Json
          reviewed_at?: string | null
          reviewed_by?: string | null
          schedule_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          employee_id?: string
          id?: string
          reason?: string | null
          requested_changes?: Json
          reviewed_at?: string | null
          reviewed_by?: string | null
          schedule_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedule_change_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_change_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_change_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_change_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_change_requests_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "weekly_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_comments: {
        Row: {
          comment: string
          created_at: string | null
          employee_id: string
          id: string
          is_admin_comment: boolean
          schedule_id: string
          updated_at: string | null
        }
        Insert: {
          comment: string
          created_at?: string | null
          employee_id: string
          id?: string
          is_admin_comment?: boolean
          schedule_id: string
          updated_at?: string | null
        }
        Update: {
          comment?: string
          created_at?: string | null
          employee_id?: string
          id?: string
          is_admin_comment?: boolean
          schedule_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedule_comments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_comments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_comments_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "weekly_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_settings: {
        Row: {
          created_at: string | null
          description: string
          enable_ga: boolean | null
          ga_tracking_id: string | null
          id: string
          keywords: string | null
          og_image: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          enable_ga?: boolean | null
          ga_tracking_id?: string | null
          id?: string
          keywords?: string | null
          og_image?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          enable_ga?: boolean | null
          ga_tracking_id?: string | null
          id?: string
          keywords?: string | null
          og_image?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          favicon_url: string | null
          id: string
          logo_url: string | null
          settings: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          settings?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          settings?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      smtp_configs: {
        Row: {
          api_key: string
          created_at: string
          id: string
          is_active: boolean | null
          sender_email: string
          updated_at: string
        }
        Insert: {
          api_key: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          sender_email?: string
          updated_at?: string
        }
        Update: {
          api_key?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          sender_email?: string
          updated_at?: string
        }
        Relationships: []
      }
      swiss_cantons: {
        Row: {
          code: string
          name_de: string
          name_en: string | null
          name_fr: string | null
          name_it: string | null
        }
        Insert: {
          code: string
          name_de: string
          name_en?: string | null
          name_fr?: string | null
          name_it?: string | null
        }
        Update: {
          code?: string
          name_de?: string
          name_en?: string | null
          name_fr?: string | null
          name_it?: string | null
        }
        Relationships: []
      }
      time_entries: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          duration: number | null
          end_time: string | null
          id: string
          project_id: string | null
          start_time: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          duration?: number | null
          end_time?: string | null
          id?: string
          project_id?: string | null
          start_time: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          duration?: number | null
          end_time?: string | null
          id?: string
          project_id?: string | null
          start_time?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      unified_leads: {
        Row: {
          assigned_to: string | null
          budget_range: string | null
          company_name: string | null
          created_at: string
          email: string
          form_data: Json | null
          id: string
          last_contact_at: string | null
          magnet_type: string | null
          message: string | null
          name: string
          original_submission_id: string | null
          original_table: string | null
          phone: string | null
          project_type: string | null
          score: number | null
          source: Database["public"]["Enums"]["lead_source"]
          status: Database["public"]["Enums"]["lead_status"]
          timeline: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          budget_range?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          form_data?: Json | null
          id?: string
          last_contact_at?: string | null
          magnet_type?: string | null
          message?: string | null
          name: string
          original_submission_id?: string | null
          original_table?: string | null
          phone?: string | null
          project_type?: string | null
          score?: number | null
          source: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["lead_status"]
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          budget_range?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          form_data?: Json | null
          id?: string
          last_contact_at?: string | null
          magnet_type?: string | null
          message?: string | null
          name?: string
          original_submission_id?: string | null
          original_table?: string | null
          phone?: string | null
          project_type?: string | null
          score?: number | null
          source?: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["lead_status"]
          timeline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_messages: {
        Row: {
          created_at: string
          from_user_id: string | null
          id: string
          message: string
          read_at: string | null
          to_user_id: string | null
        }
        Insert: {
          created_at?: string
          from_user_id?: string | null
          id?: string
          message: string
          read_at?: string | null
          to_user_id?: string | null
        }
        Update: {
          created_at?: string
          from_user_id?: string | null
          id?: string
          message?: string
          read_at?: string | null
          to_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_messages_from_profile_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_messages_from_profile_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "profiles_with_email"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_messages_to_profile_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_messages_to_profile_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "profiles_with_email"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          assignment_notifications: boolean
          comment_notifications: boolean
          created_at: string | null
          email_notifications: boolean
          employee_id: string
          id: string
          schedule_change_notifications: boolean
          updated_at: string | null
        }
        Insert: {
          assignment_notifications?: boolean
          comment_notifications?: boolean
          created_at?: string | null
          email_notifications?: boolean
          employee_id: string
          id?: string
          schedule_change_notifications?: boolean
          updated_at?: string | null
        }
        Update: {
          assignment_notifications?: boolean
          comment_notifications?: boolean
          created_at?: string | null
          email_notifications?: boolean
          employee_id?: string
          id?: string
          schedule_change_notifications?: boolean
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: true
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_preferences_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: true
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      website_backups: {
        Row: {
          backup_data: Json
          created_at: string
          created_by: string | null
          description: string | null
          file_size: number | null
          id: string
          name: string
          version: string | null
        }
        Insert: {
          backup_data: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_size?: number | null
          id?: string
          name: string
          version?: string | null
        }
        Update: {
          backup_data?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_size?: number | null
          id?: string
          name?: string
          version?: string | null
        }
        Relationships: []
      }
      websites: {
        Row: {
          body_script: string | null
          created_at: string | null
          dns_status: string | null
          domain: string | null
          head_script: string | null
          id: string
          is_template: boolean | null
          last_crawled: string | null
          settings: Json | null
          template_id: string | null
          url: string
          user_id: string
        }
        Insert: {
          body_script?: string | null
          created_at?: string | null
          dns_status?: string | null
          domain?: string | null
          head_script?: string | null
          id?: string
          is_template?: boolean | null
          last_crawled?: string | null
          settings?: Json | null
          template_id?: string | null
          url: string
          user_id: string
        }
        Update: {
          body_script?: string | null
          created_at?: string | null
          dns_status?: string | null
          domain?: string | null
          head_script?: string | null
          id?: string
          is_template?: boolean | null
          last_crawled?: string | null
          settings?: Json | null
          template_id?: string | null
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "websites_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_schedules: {
        Row: {
          client_id: string
          created_at: string | null
          day_of_week: number
          employee_id: string
          end_hour: number
          id: string
          is_auto_assigned: boolean | null
          notes: string | null
          start_hour: number
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          day_of_week: number
          employee_id: string
          end_hour: number
          id?: string
          is_auto_assigned?: boolean | null
          notes?: string | null
          start_hour: number
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          day_of_week?: number
          employee_id?: string
          end_hour?: number
          id?: string
          is_auto_assigned?: boolean | null
          notes?: string | null
          start_hour?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "weekly_schedules_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weekly_schedules_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_roles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weekly_schedules_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      work_shifts: {
        Row: {
          buffer_time_mins: number
          created_at: string
          end_time: string
          id: string
          is_recurring: boolean | null
          is_recurring_instance: boolean | null
          location: string | null
          notes: string | null
          recurrence_days: number[] | null
          recurrence_end_date: string | null
          recurrence_pattern: string | null
          start_time: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          buffer_time_mins?: number
          created_at?: string
          end_time: string
          id?: string
          is_recurring?: boolean | null
          is_recurring_instance?: boolean | null
          location?: string | null
          notes?: string | null
          recurrence_days?: number[] | null
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          start_time: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          buffer_time_mins?: number
          created_at?: string
          end_time?: string
          id?: string
          is_recurring?: boolean | null
          is_recurring_instance?: boolean | null
          location?: string | null
          notes?: string | null
          recurrence_days?: number[] | null
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          start_time?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      employee_roles_view: {
        Row: {
          email: string | null
          id: string | null
          role: string | null
        }
        Insert: {
          email?: string | null
          id?: string | null
          role?: string | null
        }
        Update: {
          email?: string | null
          id?: string | null
          role?: string | null
        }
        Relationships: []
      }
      profiles_with_email: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          hourly_rate: number | null
          id: string | null
          role: string | null
          specialty: string | null
          years_experience: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      admin_login: {
        Args: {
          email_input: string
          password_input: string
          ip_address_input?: unknown
          user_agent_input?: string
        }
        Returns: {
          success: boolean
          message: string
          user_data: Json
          session_token: string
        }[]
      }
      admin_logout: {
        Args: { session_token_input: string }
        Returns: boolean
      }
      calculate_lead_score: {
        Args: {
          p_source: Database["public"]["Enums"]["lead_source"]
          p_budget_range: string
          p_company_name: string
          p_project_type: string
          p_timeline: string
        }
        Returns: number
      }
      check_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      cleanup_duplicate_available_sessions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      create_admin_user: {
        Args: {
          email_input: string
          password_input: string
          role_input?: string
        }
        Returns: {
          success: boolean
          message: string
          user_data: Json
        }[]
      }
      duplicate_website: {
        Args: {
          source_website_id: string
          new_domain: string
          new_user_id: string
        }
        Returns: string
      }
      get_available_roles: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"][]
      }
      get_current_employee: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_time_entries: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          start_time: string
          end_time: string
          duration: number
          description: string
          created_at: string
          user_full_name: string
          hourly_rate: number
        }[]
      }
      get_users_for_admin: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          email: string
          created_at: string
          full_name: string
          role: string
        }[]
      }
      get_users_with_roles: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          email: string
          created_at: string
          role: Database["public"]["Enums"]["user_role"]
        }[]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_admin_or_supervisor: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_or_supervisor_secure: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_current_user_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_user_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      update_admin_user: {
        Args: {
          user_id_input: string
          email_input?: string
          password_input?: string
          role_input?: string
          is_active_input?: boolean
        }
        Returns: {
          success: boolean
          message: string
          user_data: Json
        }[]
      }
      update_employee_status: {
        Args: { emp_id: string; new_status: string }
        Returns: undefined
      }
      update_user_role: {
        Args: {
          target_user_id: string
          new_role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      validate_admin_session: {
        Args: { session_token_input: string }
        Returns: {
          valid: boolean
          user_data: Json
        }[]
      }
      validate_ahv_number: {
        Args: { ahv_number: string }
        Returns: boolean
      }
      validate_swiss_postal_code: {
        Args: { postal_code: string }
        Returns: boolean
      }
    }
    Enums: {
      gender_type: "male" | "female" | "other" | "prefer_not_to_say"
      lead_magnet_type_enum:
        | "roi_report"
        | "crm_readiness_guide"
        | "crm_vs_excel_comparison"
      lead_source:
        | "website_contact_form"
        | "crm_contact_form"
        | "navbar_contact_form"
        | "roi_guide_download"
        | "checklist_download"
        | "exit_intent_popup"
        | "offer_request"
        | "direct_inquiry"
        | "geo_readiness_checker"
        | "roi_calculator_access"
      lead_status:
        | "new"
        | "call_scheduled"
        | "appointment_scheduled"
        | "contacted"
        | "not-reached"
        | "archived"
      marital_status_type:
        | "single"
        | "married"
        | "divorced"
        | "widowed"
        | "registered_partnership"
      user_role: "admin" | "user"
      work_permit_type: "B" | "C" | "G" | "L" | "not_required"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      gender_type: ["male", "female", "other", "prefer_not_to_say"],
      lead_magnet_type_enum: [
        "roi_report",
        "crm_readiness_guide",
        "crm_vs_excel_comparison",
      ],
      lead_source: [
        "website_contact_form",
        "crm_contact_form",
        "navbar_contact_form",
        "roi_guide_download",
        "checklist_download",
        "exit_intent_popup",
        "offer_request",
        "direct_inquiry",
        "geo_readiness_checker",
        "roi_calculator_access",
      ],
      lead_status: [
        "new",
        "call_scheduled",
        "appointment_scheduled",
        "contacted",
        "not-reached",
        "archived",
      ],
      marital_status_type: [
        "single",
        "married",
        "divorced",
        "widowed",
        "registered_partnership",
      ],
      user_role: ["admin", "user"],
      work_permit_type: ["B", "C", "G", "L", "not_required"],
    },
  },
} as const
