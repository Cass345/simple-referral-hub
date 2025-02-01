import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    isAdmin: false
  });

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log('Initial session found for user:', session.user.id);
          await getProfile(session.user);
        } else {
          console.log('No initial session found');
          setState(s => ({ ...s, loading: false }));
        }

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event, session?.user?.id);
          
          if (session?.user) {
            await getProfile(session.user);
          } else {
            setState({ 
              user: null, 
              profile: null, 
              loading: false, 
              isAdmin: false 
            });
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
        setState(s => ({ ...s, loading: false }));
      }
    };

    initializeAuth();
  }, []);

  async function getProfile(user: User) {
    try {
      setState(s => ({ ...s, user, loading: true }));
      
      console.log('Fetching profile for user:', user.id);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('Creating new profile for user:', user.id);
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([{
              id: user.id,
              email: user.email || '',
              role: 'teacher'
            }])
            .select()
            .single();

          if (createError) {
            console.error('Error creating profile:', createError);
            throw createError;
          }

          setState(s => ({
            ...s,
            profile: newProfile,
            loading: false,
            isAdmin: newProfile?.role === 'admin'
          }));
          return;
        }
        
        console.error('Error fetching profile:', error);
        throw error;
      }

      setState(s => ({
        ...s,
        profile,
        loading: false,
        isAdmin: profile?.role === 'admin'
      }));
    } catch (error) {
      console.error('Error in getProfile:', error);
      setState(s => ({ 
        ...s, 
        profile: null, 
        loading: false,
        isAdmin: false 
      }));
    }
  }

  async function signIn(email: string, password: string) {
    try {
      console.log('Attempting sign in for:', email);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Sign in error:', error);
        if (error.message === 'Invalid login credentials') {
          throw new Error('Invalid email or password. Please try again.');
        }
        throw error;
      }
    } catch (error) {
      console.error('Error in signIn:', error);
      throw error;
    }
  }

  async function signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      console.log('Attempting sign up for:', email);
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) {
        console.error('Sign up error:', signUpError);
        throw signUpError;
      }
      
      if (authData.user) {
        console.log('Creating profile for new user:', authData.user.id);
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user.id,
            email,
            first_name: firstName,
            last_name: lastName,
            role: 'teacher'
          }]);
          
        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw profileError;
        }
      }
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    }
  }

  async function signOut() {
    try {
      console.log('Attempting sign out');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  }

  const value = {
    ...state,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}