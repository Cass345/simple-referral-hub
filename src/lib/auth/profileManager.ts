import { User } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import type { Profile } from '../types/auth.types';

export async function getProfile(user: User) {
  try {
    console.log('Fetching profile for user:', user.id);
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.log('Profile fetch error:', error);
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
          console.error('Profile creation error:', createError);
          throw createError;
        }

        return {
          profile: newProfile,
          isAdmin: newProfile?.role === 'admin'
        };
      }
      throw error;
    }

    return {
      profile,
      isAdmin: profile?.role === 'admin'
    };
  } catch (error) {
    console.error('Error in getProfile:', error);
    return {
      profile: null,
      isAdmin: false
    };
  }
}