/*
  # Add Language and Parent Contact Fields

  1. New Columns
    - language (text) - Student's primary language
    - parent_name (text) - Parent/guardian name
    - parent_email (text) - Parent/guardian email
    - parent_phone (text) - Parent/guardian phone number
*/

ALTER TABLE students 
  ADD COLUMN IF NOT EXISTS language text,
  ADD COLUMN IF NOT EXISTS parent_name text,
  ADD COLUMN IF NOT EXISTS parent_email text,
  ADD COLUMN IF NOT EXISTS parent_phone text;