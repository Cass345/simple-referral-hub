/*
  # Add Tier 1 Checklists Table

  1. New Tables
    - `tier1_checklists`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
      - `items` (jsonb array)

  2. Security
    - Enable RLS on `tier1_checklists` table
    - Add policies for authenticated users to manage their own checklists
*/

-- Create tier1_checklists table
CREATE TABLE IF NOT EXISTS tier1_checklists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  items jsonb NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE tier1_checklists ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own checklists"
  ON tier1_checklists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own checklists"
  ON tier1_checklists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own checklists"
  ON tier1_checklists FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own checklists"
  ON tier1_checklists FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_tier1_checklists_user_id ON tier1_checklists(user_id);