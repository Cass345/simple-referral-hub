import { User } from '@supabase/supabase-js';
import type { Database } from '../../types/database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
}