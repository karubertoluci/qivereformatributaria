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
      artigos: {
        Row: {
          capitulo_id: number | null
          created_at: string
          id: number
          numero: number
          secao_id: number | null
          subsecao_id: number | null
          texto: string
          texto_simplificado: string | null
        }
        Insert: {
          capitulo_id?: number | null
          created_at?: string
          id?: number
          numero: number
          secao_id?: number | null
          subsecao_id?: number | null
          texto: string
          texto_simplificado?: string | null
        }
        Update: {
          capitulo_id?: number | null
          created_at?: string
          id?: number
          numero?: number
          secao_id?: number | null
          subsecao_id?: number | null
          texto?: string
          texto_simplificado?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artigos_capitulo_id_fkey"
            columns: ["capitulo_id"]
            isOneToOne: false
            referencedRelation: "capitulos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artigos_secao_id_fkey"
            columns: ["secao_id"]
            isOneToOne: false
            referencedRelation: "secoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artigos_subsecao_id_fkey"
            columns: ["subsecao_id"]
            isOneToOne: false
            referencedRelation: "subsecoes"
            referencedColumns: ["id"]
          },
        ]
      }
      capitulos: {
        Row: {
          created_at: string
          descricao: string | null
          id: number
          nome: string
          numero: number | null
          titulo_id: number
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id?: number
          nome: string
          numero?: number | null
          titulo_id: number
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id?: number
          nome?: string
          numero?: number | null
          titulo_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "capitulos_titulo_id_fkey"
            columns: ["titulo_id"]
            isOneToOne: false
            referencedRelation: "titulos"
            referencedColumns: ["id"]
          },
        ]
      }
      impactos: {
        Row: {
          artigo_id: number
          created_at: string
          descricao: string
          id: number
          relevancia: number
          segmento_id: string
          tipo: string
        }
        Insert: {
          artigo_id: number
          created_at?: string
          descricao: string
          id?: number
          relevancia: number
          segmento_id: string
          tipo: string
        }
        Update: {
          artigo_id?: number
          created_at?: string
          descricao?: string
          id?: number
          relevancia?: number
          segmento_id?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "impactos_artigo_id_fkey"
            columns: ["artigo_id"]
            isOneToOne: false
            referencedRelation: "artigos"
            referencedColumns: ["id"]
          },
        ]
      }
      livros: {
        Row: {
          created_at: string
          descricao: string | null
          id: number
          nome: string
          numero: number | null
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id?: number
          nome: string
          numero?: number | null
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id?: number
          nome?: string
          numero?: number | null
        }
        Relationships: []
      }
      secoes: {
        Row: {
          capitulo_id: number
          created_at: string
          descricao: string | null
          id: number
          nome: string
          numero: number | null
        }
        Insert: {
          capitulo_id: number
          created_at?: string
          descricao?: string | null
          id?: number
          nome: string
          numero?: number | null
        }
        Update: {
          capitulo_id?: number
          created_at?: string
          descricao?: string | null
          id?: number
          nome?: string
          numero?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "secoes_capitulo_id_fkey"
            columns: ["capitulo_id"]
            isOneToOne: false
            referencedRelation: "capitulos"
            referencedColumns: ["id"]
          },
        ]
      }
      subsecoes: {
        Row: {
          created_at: string
          descricao: string | null
          id: number
          nome: string
          numero: number | null
          secao_id: number | null
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id?: number
          nome: string
          numero?: number | null
          secao_id?: number | null
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id?: number
          nome?: string
          numero?: number | null
          secao_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "subsecoes_secao_id_fkey"
            columns: ["secao_id"]
            isOneToOne: false
            referencedRelation: "secoes"
            referencedColumns: ["id"]
          },
        ]
      }
      titulos: {
        Row: {
          created_at: string
          descricao: string | null
          id: number
          livro_id: number
          nome: string
          numero: number | null
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id?: number
          livro_id: number
          nome: string
          numero?: number | null
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id?: number
          livro_id?: number
          nome?: string
          numero?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "titulos_livro_id_fkey"
            columns: ["livro_id"]
            isOneToOne: false
            referencedRelation: "livros"
            referencedColumns: ["id"]
          },
        ]
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
