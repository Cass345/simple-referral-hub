/*
  # Update profiles policies

  1. Changes
    - Replace "Users can view their own profile" policy with "Users can view profiles"
    - Add new policy for users to insert their own profile
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;

-- Create new policies
CREATE POLICY "Users can view profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);