import { createContext } from 'react';
import { User } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  createStudentProfile: (studentData: Omit<Profile, 'id'>) => Promise<void>;
}

// 🔹 Export the context separately
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
