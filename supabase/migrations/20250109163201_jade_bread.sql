/*
  # Add Student Profile Fields

  1. New Columns
    - concerns (text array) - Areas of concern for the student
    - strengths (text array) - Student's strengths and abilities
    - talents (text array) - Student's talents
    - interests (text array) - Student's interests
    - academic_factors (text array) - Academic risk factors
    - speech_factors (text array) - Speech and language factors
    - physical_factors (text array) - Physical and health factors
    - risk_factors (text array) - Other risk factors
    - top_concerns (text array) - Top 2-3 concerns
    - goals (text array) - Student goals
    - behavior_data (jsonb) - Behavior assessment data
    - behavior_definition (jsonb) - Behavior definitions and examples
    - setting_events (jsonb) - Setting events assessment data
    - parent_notification_date (date) - Date parents were notified (for Tier 2/3)
*/

-- Add array columns
ALTER TABLE students 
  ADD COLUMN IF NOT EXISTS concerns text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS strengths text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS talents text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS interests text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS academic_factors text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS speech_factors text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS physical_factors text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS risk_factors text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS top_concerns text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS goals text[] DEFAULT '{}';

-- Add JSON columns for complex data structures
ALTER TABLE students
  ADD COLUMN IF NOT EXISTS behavior_data jsonb,
  ADD COLUMN IF NOT EXISTS behavior_definition jsonb,
  ADD COLUMN IF NOT EXISTS setting_events jsonb;

-- Add date column for parent notification
ALTER TABLE students
  ADD COLUMN IF NOT EXISTS parent_notification_date date;