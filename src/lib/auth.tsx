import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { getProfile } from './auth/profileManager';
import { signIn, signUp, signOut } from './auth/authOperations';
import type { AuthContextType, AuthState } from './types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    isAdmin: false
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log('Initial session found for user:', session.user.id);
          const { profile, isAdmin } = await getProfile(session.user);
          setState({
            user: session.user,
            profile,
            loading: false,
            isAdmin
          });
        } else {
          setState(s => ({ ...s, loading: false }));
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event, session?.user?.id);
          
          if (session?.user) {
            const { profile, isAdmin } = await getProfile(session.user);
            setState({
              user: session.user,
              profile,
              loading: false,
              isAdmin
            });
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