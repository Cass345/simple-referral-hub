import { supabase } from '../supabase';

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUp(email: string, password: string, firstName: string, lastName: string) {
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (signUpError) throw signUpError;
  
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
      console.error('Profile creation error during signup:', profileError);
      throw profileError;
    }
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}