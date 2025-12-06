/*
  # Allow anonymous users to join waitlist

  1. Security Changes
    - Drop existing restrictive policies
    - Create policy allowing anonymous users to insert waitlist entries
    - Maintain read restrictions for privacy
    - Allow service role full access for admin dashboard

  2. Policy Details
    - Anonymous users can INSERT new waitlist entries
    - Authenticated users can read their own entries
    - Service role has full access for administration
*/

-- Drop existing policies that might be blocking inserts
DROP POLICY IF EXISTS "public_insert_waitlist" ON waitlist;
DROP POLICY IF EXISTS "users_read_own" ON waitlist;
DROP POLICY IF EXISTS "service_role_all_access" ON waitlist;
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;
DROP POLICY IF EXISTS "Service role can read all entries" ON waitlist;
DROP POLICY IF EXISTS "Users can read own data" ON waitlist;

-- Ensure RLS is enabled
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert waitlist entries
CREATE POLICY "allow_anonymous_insert"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to insert waitlist entries
CREATE POLICY "allow_authenticated_insert"
  ON waitlist
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow service role full access for admin dashboard
CREATE POLICY "service_role_full_access"
  ON waitlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow users to read their own entries (optional, for future features)
CREATE POLICY "users_read_own_entries"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);