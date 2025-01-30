import { useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { AuthContext, AuthContextType } from './authContext';
import type { Database } from '../types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
    isAdmin: false,
    isTeacher: false,
    signIn,
    signUp,
    signOut,
    createStudentProfile
  });

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user && isMounted) {
        await getProfile(session.user);
      } else {
        setState(s => ({ ...s, loading: false }));
      }
    };

    checkSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.id);
      if (session?.user) {
        await getProfile(session.user);
      } else {
        setState({ user: null, profile: null, loading: false, isAdmin: false, isTeacher: false, signIn, signUp, signOut, createStudentProfile });
      }
    });

    return () => {
      isMounted = false;
      subscription.subscription?.unsubscribe();
    };
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

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        throw error;
      }

      let finalProfile = profile;

      if (!profile) {
        console.log('Creating new teacher profile for:', user.id);
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            email: user.email || '',
            role: 'teacher',
          }])
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          throw createError;
        }

        finalProfile = newProfile;
      }

      setState({
        ...state,
        profile: finalProfile,
        loading: false,
        isAdmin: finalProfile?.role === 'admin',
        isTeacher: finalProfile?.role === 'teacher',
      });
    } catch (error) {
      console.error('Error in getProfile:', error);
      setState({ ...state, profile: null, loading: false, isAdmin: false, isTeacher: false });
    }
  }

  async function signIn(email: string, password: string) {
    try {
      console.log('Attempting sign in for:', email);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Sign in error:', error);
        throw new Error(error.message === 'Invalid login credentials' ? 'Invalid email or password. Please try again.' : error.message);
      }
    } catch (error) {
      console.error('Error in signIn:', error);
      throw error;
    }
  }

  async function signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      console.log('Attempting sign up for:', email);
      const { data: authData, error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        throw signUpError;
      }

      if (authData.user) {
        console.log('Creating profile for new teacher:', authData.user.id);
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user.id,
            email,
            first_name: firstName,
            last_name: lastName,
            role: 'teacher',
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

      setState({ ...state, user: null, profile: null, loading: false, isAdmin: false, isTeacher: false });
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  }

  async function createStudentProfile(studentData: Omit<Profile, 'id'>) {
    try {
      console.log('Creating student profile:', studentData);
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ ...studentData, role: 'student' }]);

      if (error) {
        console.error('Error creating student profile:', error);
        throw error;
      }

      console.log('Student profile created successfully:', data);
    } catch (error) {
      console.error('Error in createStudentProfile:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut, createStudentProfile }}>
      {state.loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}


// 🔹 Loading Screen Component
function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-200 border-l-black rounded-full animate-spin"></div>
    </div>
  );
}
