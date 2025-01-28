/*
  # Initial Schema Setup for MTSS Management System

  1. Tables Created:
    - profiles (user profiles with roles)
    - students (student information)
    - referrals (student referrals)
    - interventions (intervention tracking)
    - progress_monitoring (intervention progress)

  2. Security:
    - RLS enabled on all tables
    - Policies for role-based access control
    - Proper constraints and foreign keys
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'specialist');
CREATE TYPE referral_status AS ENUM ('pending', 'in_review', 'approved', 'declined');
CREATE TYPE intervention_status AS ENUM ('planned', 'in_progress', 'completed', 'discontinued');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  role user_role DEFAULT 'teacher',
  school_id text,
  is_active boolean DEFAULT true
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  grade integer NOT NULL,
  date_of_birth date NOT NULL,
  student_id text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id)
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  student_id uuid REFERENCES students(id),
  referring_user_id uuid REFERENCES auth.users(id),
  concern_type text NOT NULL,
  concern_description text NOT NULL,
  previous_interventions text,
  status referral_status DEFAULT 'pending',
  documents text[] DEFAULT '{}',
  CONSTRAINT fk_student
    FOREIGN KEY(student_id) 
    REFERENCES students(id)
    ON DELETE CASCADE
);

-- Create interventions table
CREATE TABLE IF NOT EXISTS interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  student_id uuid REFERENCES students(id),
  referral_id uuid REFERENCES referrals(id),
  type text NOT NULL,
  tier_level integer CHECK (tier_level BETWEEN 1 AND 3),
  start_date date NOT NULL,
  end_date date,
  goals text[] DEFAULT '{}',
  progress_notes text[] DEFAULT '{}',
  status intervention_status DEFAULT 'planned',
  assigned_staff uuid[] DEFAULT '{}',
  CONSTRAINT fk_student
    FOREIGN KEY(student_id) 
    REFERENCES students(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_referral
    FOREIGN KEY(referral_id) 
    REFERENCES referrals(id)
    ON DELETE CASCADE
);

-- Create progress_monitoring table
CREATE TABLE IF NOT EXISTS progress_monitoring (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  intervention_id uuid REFERENCES interventions(id),
  date date NOT NULL,
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  notes text,
  CONSTRAINT fk_intervention
    FOREIGN KEY(intervention_id) 
    REFERENCES interventions(id)
    ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_monitoring ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Students policies
CREATE POLICY "All authenticated users can view students"
  ON students FOR SELECT
  USING (true);

CREATE POLICY "Teachers and admins can create students"
  ON students FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('teacher', 'admin')
    )
  );

-- Referrals policies
CREATE POLICY "Users can view referrals they created or are assigned to"
  ON referrals FOR SELECT
  USING (
    referring_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('specialist', 'admin')
    )
  );

CREATE POLICY "Teachers can create referrals"
  ON referrals FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('teacher', 'admin')
    )
  );

-- Interventions policies
CREATE POLICY "Users can view interventions they are assigned to"
  ON interventions FOR SELECT
  USING (
    auth.uid() = ANY(assigned_staff) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('specialist', 'admin')
    )
  );

CREATE POLICY "Specialists and admins can manage interventions"
  ON interventions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('specialist', 'admin')
    )
  );

CREATE POLICY "Specialists and admins can update interventions"
  ON interventions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('specialist', 'admin')
    )
  );

CREATE POLICY "Specialists and admins can delete interventions"
  ON interventions FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('specialist', 'admin')
    )
  );

-- Progress monitoring policies
CREATE POLICY "Users can view progress monitoring for their interventions"
  ON progress_monitoring FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM interventions
      WHERE id = progress_monitoring.intervention_id
      AND (
        auth.uid() = ANY(assigned_staff) OR
        EXISTS (
          SELECT 1 FROM profiles
          WHERE id = auth.uid()
          AND role IN ('specialist', 'admin')
        )
      )
    )
  );

CREATE POLICY "Specialists and admins can insert progress monitoring"
  ON progress_monitoring FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('specialist', 'admin')
    )
  );

CREATE POLICY "Specialists and admins can update progress monitoring"
  ON progress_monitoring FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('specialist', 'admin')
    )
  );

CREATE POLICY "Specialists and admins can delete progress monitoring"
  ON progress_monitoring FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('specialist', 'admin')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_student_id ON referrals(student_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_interventions_student_id ON interventions(student_id);
CREATE INDEX IF NOT EXISTS idx_interventions_status ON interventions(status);
CREATE INDEX IF NOT EXISTS idx_progress_monitoring_intervention_id ON progress_monitoring(intervention_id);