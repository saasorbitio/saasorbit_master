/*
  # Fix waitlist RLS policies for anonymous submissions

  1. Security Updates
    - Drop existing restrictive policies
    - Create new policy allowing anonymous users to insert waitlist entries
    - Maintain read access for authenticated users to their own data
    - Allow service role full access for admin dashboard

  2. Changes
    - Enable anonymous INSERT operations on waitlist table
    - Keep RLS enabled for security
    - Allow public waitlist form submissions
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own waitlist entries" ON waitlist;
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;
DROP POLICY IF EXISTS "Service role can read all entries" ON waitlist;

-- Ensure RLS is enabled
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert waitlist entries (public form submissions)
CREATE POLICY "Allow anonymous waitlist submissions"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read their own entries
CREATE POLICY "Users can read own entries"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Allow service role full access for admin dashboard
CREATE POLICY "Service role full access"
  ON waitlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);