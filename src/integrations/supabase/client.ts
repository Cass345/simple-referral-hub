// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kseosssnklmezbeftzvc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZW9zc3Nua2xtZXpiZWZ0enZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MjgwMjEsImV4cCI6MjA1MzMwNDAyMX0.hX3ODnht-KjsVjLY3mXicyvSlu3DN_6HiZpmSj-4KZM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);