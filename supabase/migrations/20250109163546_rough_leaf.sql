/*
  # Add MTSS Tier Column

  1. New Column
    - mtss_tier (integer) - Student's current MTSS tier level (1-3)
    - Add constraint to ensure valid tier values
*/

ALTER TABLE students 
  ADD COLUMN IF NOT EXISTS mtss_tier integer DEFAULT 1 CHECK (mtss_tier BETWEEN 1 AND 3);