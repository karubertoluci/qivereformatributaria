// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://devwdehydhhdczkxtvjt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRldndkZWh5ZGhoZGN6a3h0dmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNDI2NjEsImV4cCI6MjA1OTcxODY2MX0.Qazwn0jWbvsao-P7wzcN8Jx4QsLgGOJfjkx7ZQg-fws";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);