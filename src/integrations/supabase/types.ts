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
          file_name: string | null
          file_size: number | null
          file_type: string | null
          id: string
          image_url: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          image_url: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          image_url?: string
          updated_at?: string | null
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
      check_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      duplicate_website: {
        Args: {
          source_website_id: string
          new_domain: string
          new_user_id: string
        }
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
    }
    Enums: {
      lead_magnet_type_enum:
        | "roi_report"
        | "crm_readiness_guide"
        | "crm_vs_excel_comparison"
      lead_status:
        | "new"
        | "call_scheduled"
        | "appointment_scheduled"
        | "contacted"
        | "not-reached"
        | "archived"
      user_role: "admin" | "user"
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
    Enums: {
      lead_magnet_type_enum: [
        "roi_report",
        "crm_readiness_guide",
        "crm_vs_excel_comparison",
      ],
      lead_status: [
        "new",
        "call_scheduled",
        "appointment_scheduled",
        "contacted",
        "not-reached",
        "archived",
      ],
      user_role: ["admin", "user"],
    },
  },
} as const
