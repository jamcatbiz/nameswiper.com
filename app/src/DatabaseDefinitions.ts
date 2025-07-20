export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_requests: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          message_body: string | null
          phone: string | null
          updated_at: Date | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          message_body?: string | null
          phone?: string | null
          updated_at?: Date | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          message_body?: string | null
          phone?: string | null
          updated_at?: Date | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          unsubscribed: boolean
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: Date | null
          unsubscribed: boolean
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          unsubscribed: boolean
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_customers: {
        Row: {
          stripe_customer_id: string
          updated_at: Date | null
          user_id: string
        }
        Insert: {
          stripe_customer_id: string
          updated_at?: Date | null
          user_id: string
        }
        Update: {
          stripe_customer_id?: string
          updated_at?: Date | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_customers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      name_preferences: {
        Row: {
          id: string
          updated_at: Date
          user_id: string
          name: string
          gender: string
          preference: string
          unique: string
        }
        Insert: {
          id?: string
          updated_at?: Date
          user_id?: string
          name?: string
          gender?: string
          preference?: string
          unique?: string
        }
        Update: {
          id?: string
          updated_at?: Date
          user_id?: string
          name?: string
          gender?: string
          preference?: string
          unique?: string
        }
        Relationships: [
          {
            foreignKeyName: "name_preferences_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "name_preferences_name_fkey"
            columns: ["name"]
            referencedRelation: "names"
            referencedColumns: ["name"]
          },
        ]
      }
      names: {
        Row: {
          name: string
          updated_at: Date
          gender: string
          description: string
          usages: Array<string>
        }
        Insert: {
          name?: string
          updated_at?: Date
          gender?: string
          description?: string
          usages?: Array<string>
        }
        Update: {
          name?: string
          updated_at?: Date
          gender?: string
          description?: string
          usages?: Array<string>
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
