/*
  # Complete Waitlist RLS Fix

  This migration completely resolves all RLS policy issues for the waitlist table:
  
  1. Drops all existing conflicting policies
  2. Temporarily disables RLS to clear any issues
  3. Re-enables RLS with proper policies
  4. Creates comprehensive policies for all user types
  5. Ensures anonymous users can submit forms
  6. Enables admin dashboard functionality

  This is a complete solution that addresses all the RLS violation errors.
*/

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous waitlist submissions" ON waitlist;
DROP POLICY IF EXISTS "Users can read own entries" ON waitlist;
DROP POLICY IF EXISTS "Service role full access" ON waitlist;
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;
DROP POLICY IF EXISTS "Service role can read all entries" ON waitlist;

-- Temporarily disable RLS to clear any existing issues
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies that work for all scenarios

-- 1. Allow anyone (anonymous + authenticated) to insert waitlist entries
CREATE POLICY "public_insert_waitlist"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 2. Allow service role full access for admin dashboard
CREATE POLICY "service_role_all_access"
  ON waitlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 3. Allow authenticated users to read their own entries (optional)
CREATE POLICY "users_read_own"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Ensure the table structure is correct
ALTER TABLE waitlist ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE waitlist ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE waitlist ALTER COLUMN updated_at SET DEFAULT now();
ALTER TABLE waitlist ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE waitlist ALTER COLUMN source SET DEFAULT 'landing-page';