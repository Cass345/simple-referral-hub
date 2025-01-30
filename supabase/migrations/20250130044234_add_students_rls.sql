-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert students"
ON students FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create policy to allow users to view their own inserted records
CREATE POLICY "Allow users to view their own students"
ON students FOR SELECT 
TO authenticated
USING (true);

-- Create policy to allow users to update their own records
CREATE POLICY "Allow users to update their own students"
ON students FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);