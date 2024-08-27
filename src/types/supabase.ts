export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      feedback: {
        Row: {
          created_at: string;
          created_by: string | null;
          feedback: string | null;
          id: string;
          path: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          feedback?: string | null;
          id?: string;
          path?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          feedback?: string | null;
          id?: string;
          path?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "feedback_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      munch_email_updates: {
        Row: {
          auth_id: string | null;
          created_at: string;
          id: string;
          receive_updates: boolean | null;
        };
        Insert: {
          auth_id?: string | null;
          created_at?: string;
          id?: string;
          receive_updates?: boolean | null;
        };
        Update: {
          auth_id?: string | null;
          created_at?: string;
          id?: string;
          receive_updates?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "munch_email_updates_auth_id_fkey";
            columns: ["auth_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      pantry_inventory_items: {
        Row: {
          created_at: string;
          created_by: string | null;
          household_id: string | null;
          id: string;
          is_active: boolean | null;
          item_name: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          household_id?: string | null;
          id?: string;
          is_active?: boolean | null;
          item_name?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          household_id?: string | null;
          id?: string;
          is_active?: boolean | null;
          item_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "pantry_inventory_items_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pantry_inventory_items_household_id_fkey";
            columns: ["household_id"];
            isOneToOne: false;
            referencedRelation: "qwrk_households";
            referencedColumns: ["id"];
          }
        ];
      };
      pantry_inventory_planning: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string | null;
          id: string;
          inventory_item_id: string | null;
          is_active: boolean;
          planned_date: string | null;
          transaction_amount: number;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          inventory_item_id?: string | null;
          is_active?: boolean;
          planned_date?: string | null;
          transaction_amount?: number;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          inventory_item_id?: string | null;
          is_active?: boolean;
          planned_date?: string | null;
          transaction_amount?: number;
        };
        Relationships: [
          {
            foreignKeyName: "pantry_inventory_planning_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pantry_inventory_planning_inventory_item_id_fkey";
            columns: ["inventory_item_id"];
            isOneToOne: false;
            referencedRelation: "pantry_inventory_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pantry_inventory_planning_inventory_item_id_fkey";
            columns: ["inventory_item_id"];
            isOneToOne: false;
            referencedRelation: "pantry_inventory_planning_full_view";
            referencedColumns: ["item_id"];
          }
        ];
      };
      pantry_inventory_stock: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          inventory_item_id: string | null;
          transaction_amount: number;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          inventory_item_id?: string | null;
          transaction_amount?: number;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          inventory_item_id?: string | null;
          transaction_amount?: number;
        };
        Relationships: [
          {
            foreignKeyName: "pantry_inventory_stock_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pantry_inventory_stock_inventory_item_id_fkey";
            columns: ["inventory_item_id"];
            isOneToOne: false;
            referencedRelation: "pantry_inventory_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pantry_inventory_stock_inventory_item_id_fkey";
            columns: ["inventory_item_id"];
            isOneToOne: false;
            referencedRelation: "pantry_inventory_planning_full_view";
            referencedColumns: ["item_id"];
          }
        ];
      };
      pb_babies: {
        Row: {
          baby_description: string | null;
          baby_name: string | null;
          baby_type: string | null;
          created_at: string;
          created_by: string;
          id: string;
          is_active: boolean;
        };
        Insert: {
          baby_description?: string | null;
          baby_name?: string | null;
          baby_type?: string | null;
          created_at?: string;
          created_by?: string;
          id?: string;
          is_active?: boolean;
        };
        Update: {
          baby_description?: string | null;
          baby_name?: string | null;
          baby_type?: string | null;
          created_at?: string;
          created_by?: string;
          id?: string;
          is_active?: boolean;
        };
        Relationships: [];
      };
      pb_tasks: {
        Row: {
          created_at: string;
          created_by: string;
          id: string;
          interval: number;
          is_active: boolean;
          task_instruction: string | null;
          task_name: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string;
          id?: string;
          interval?: number;
          is_active?: boolean;
          task_instruction?: string | null;
          task_name?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: string;
          interval?: number;
          is_active?: boolean;
          task_instruction?: string | null;
          task_name?: string | null;
        };
        Relationships: [];
      };
      pb_tasks_duplicate: {
        Row: {
          completed_at: string | null;
          created_at: string;
          created_by: string;
          due_date: string;
          id: string;
          interval: number;
          is_active: boolean;
          is_completed: boolean;
          task_instruction: string | null;
          task_name: string | null;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          created_by?: string;
          due_date?: string;
          id?: string;
          interval?: number;
          is_active?: boolean;
          is_completed?: boolean;
          task_instruction?: string | null;
          task_name?: string | null;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          created_by?: string;
          due_date?: string;
          id?: string;
          interval?: number;
          is_active?: boolean;
          is_completed?: boolean;
          task_instruction?: string | null;
          task_name?: string | null;
        };
        Relationships: [];
      };
      pb_tasks_to_do: {
        Row: {
          completed_at: string | null;
          created_at: string;
          due_date: string;
          id: string;
          is_completed: boolean;
          pb_tasks_id: string;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          due_date?: string;
          id?: string;
          is_completed?: boolean;
          pb_tasks_id: string;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          due_date?: string;
          id?: string;
          is_completed?: boolean;
          pb_tasks_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_pb_tasks_to_do_pb_tasks_id_fkey";
            columns: ["pb_tasks_id"];
            isOneToOne: false;
            referencedRelation: "pb_tasks";
            referencedColumns: ["id"];
          }
        ];
      };
      pb_tasks_to_do_duplicate: {
        Row: {
          completed_at: string | null;
          created_at: string;
          due_date: string;
          id: number;
          is_completed: boolean;
          pb_tasks_id: string;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          due_date?: string;
          id?: number;
          is_completed?: boolean;
          pb_tasks_id: string;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          due_date?: string;
          id?: number;
          is_completed?: boolean;
          pb_tasks_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_pb_tasks_to_do_duplicate_pb_tasks_id_fkey";
            columns: ["pb_tasks_id"];
            isOneToOne: false;
            referencedRelation: "pb_tasks";
            referencedColumns: ["id"];
          }
        ];
      };
      qwrk_credits: {
        Row: {
          created_at: string;
          household_id: string | null;
          id: string;
          is_free: boolean;
          transaction: number;
          user: string | null;
        };
        Insert: {
          created_at?: string;
          household_id?: string | null;
          id?: string;
          is_free?: boolean;
          transaction?: number;
          user?: string | null;
        };
        Update: {
          created_at?: string;
          household_id?: string | null;
          id?: string;
          is_free?: boolean;
          transaction?: number;
          user?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "qwrk_credits_household_id_fkey";
            columns: ["household_id"];
            isOneToOne: false;
            referencedRelation: "qwrk_households";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "qwrk_credits_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      qwrk_households: {
        Row: {
          created_at: string;
          created_by: string | null;
          household: string | null;
          id: string;
          is_active: boolean | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          household?: string | null;
          id?: string;
          is_active?: boolean | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          household?: string | null;
          id?: string;
          is_active?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "qwrk_households_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      pantry_inventory_planning_full_view: {
        Row: {
          household_id: string | null;
          item_id: string | null;
          item_name: string | null;
          planned_date: string | null;
          planning_description: string | null;
          planning_id: string | null;
          planning_portions: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "pantry_inventory_items_household_id_fkey";
            columns: ["household_id"];
            isOneToOne: false;
            referencedRelation: "qwrk_households";
            referencedColumns: ["id"];
          }
        ];
      };
      qwrk_monthly_free_credits: {
        Row: {
          created_at: string | null;
          household_id: string | null;
          id: string | null;
          is_free: boolean | null;
          transaction: number | null;
          user: string | null;
        };
        Insert: {
          created_at?: string | null;
          household_id?: string | null;
          id?: string | null;
          is_free?: boolean | null;
          transaction?: number | null;
          user?: string | null;
        };
        Update: {
          created_at?: string | null;
          household_id?: string | null;
          id?: string | null;
          is_free?: boolean | null;
          transaction?: number | null;
          user?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "qwrk_credits_household_id_fkey";
            columns: ["household_id"];
            isOneToOne: false;
            referencedRelation: "qwrk_households";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "qwrk_credits_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      qwrk_paid_credits: {
        Row: {
          created_at: string | null;
          household_id: string | null;
          id: string | null;
          is_free: boolean | null;
          transaction: number | null;
          user: string | null;
        };
        Insert: {
          created_at?: string | null;
          household_id?: string | null;
          id?: string | null;
          is_free?: boolean | null;
          transaction?: number | null;
          user?: string | null;
        };
        Update: {
          created_at?: string | null;
          household_id?: string | null;
          id?: string | null;
          is_free?: boolean | null;
          transaction?: number | null;
          user?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "qwrk_credits_household_id_fkey";
            columns: ["household_id"];
            isOneToOne: false;
            referencedRelation: "qwrk_households";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "qwrk_credits_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: {
      create_pantry_inventory_item: {
        Args: {
          item: string;
          household: string;
          quantity: number;
        };
        Returns: string;
      };
      planning_transaction: {
        Args: {
          inventory_item_id: string;
          description: string;
          portions: number;
        };
        Returns: boolean;
      };
      planning_transaction_v2: {
        Args: {
          inventory_item_id: string;
          description: string;
          portions: number;
          date: string;
        };
        Returns: boolean;
      };
      planning_transaction_v3: {
        Args: {
          inventory_item_id: string;
          description: string;
          portions: number;
          date?: string;
        };
        Returns: boolean;
      };
      planning_transaction_v4: {
        Args: {
          inventory_item_id: string;
          description: string;
          portions: number;
          date?: string;
        };
        Returns: boolean;
      };
      planning_transaction_v5: {
        Args: {
          inventory_item_id: string;
          description: string;
          portions: number;
          date?: string;
        };
        Returns: boolean;
      };
      planning_transaction_v6: {
        Args: {
          inventory_item_id: string;
          description: string;
          portions: number;
          date: string | null;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          user_metadata: Json | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          user_metadata?: Json | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          user_metadata?: Json | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          }
        ];
      };
      s3_multipart_uploads: {
        Row: {
          bucket_id: string;
          created_at: string;
          id: string;
          in_progress_size: number;
          key: string;
          owner_id: string | null;
          upload_signature: string;
          user_metadata: Json | null;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          id: string;
          in_progress_size?: number;
          key: string;
          owner_id?: string | null;
          upload_signature: string;
          user_metadata?: Json | null;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          id?: string;
          in_progress_size?: number;
          key?: string;
          owner_id?: string | null;
          upload_signature?: string;
          user_metadata?: Json | null;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          }
        ];
      };
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string;
          created_at: string;
          etag: string;
          id: string;
          key: string;
          owner_id: string | null;
          part_number: number;
          size: number;
          upload_id: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          etag: string;
          id?: string;
          key: string;
          owner_id?: string | null;
          part_number: number;
          size?: number;
          upload_id: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          etag?: string;
          id?: string;
          key?: string;
          owner_id?: string | null;
          part_number?: number;
          size?: number;
          upload_id?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey";
            columns: ["upload_id"];
            isOneToOne: false;
            referencedRelation: "s3_multipart_uploads";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          next_key_token?: string;
          next_upload_token?: string;
        };
        Returns: {
          key: string;
          id: string;
          created_at: string;
        }[];
      };
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          start_after?: string;
          next_token?: string;
        };
        Returns: {
          name: string;
          id: string;
          metadata: Json;
          updated_at: string;
        }[];
      };
      operation: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
