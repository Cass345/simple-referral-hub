/*
  # Add Student Profile Fields

  1. New Columns
    - referring_teacher (text) - Name of the referring teacher
    - referral_reasons (text[]) - Academic, Behavior/Attendance, Social-Emotional
    - interventions (jsonb) - Array of intervention objects with skill targeted, data collected, and settings
*/

-- Add new columns for student profile
ALTER TABLE students 
  ADD COLUMN IF NOT EXISTS referring_teacher text,
  ADD COLUMN IF NOT EXISTS referral_reasons text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS interventions jsonb DEFAULT '[]';

-- Create type for referral reasons if it doesn't exist
DO $$ BEGIN
  CREATE TYPE referral_reason AS ENUM ('academic', 'behavior_attendance', 'social_emotional');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;