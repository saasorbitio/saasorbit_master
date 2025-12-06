/*
  # Completely disable RLS for waitlist table
  
  This migration completely disables Row Level Security for the waitlist table
  to allow anonymous users to submit waitlist forms without any restrictions.
  
  1. Drop all existing policies
  2. Disable RLS entirely
  3. This allows public access for waitlist submissions
*/

-- Drop all existing policies on waitlist table
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;
DROP POLICY IF EXISTS "Users can read own data" ON waitlist;
DROP POLICY IF EXISTS "Service role can read all entries" ON waitlist;
DROP POLICY IF EXISTS "allow_anonymous_insert" ON waitlist;
DROP POLICY IF EXISTS "allow_authenticated_insert" ON waitlist;
DROP POLICY IF EXISTS "allow_service_role_all" ON waitlist;

-- Completely disable RLS on waitlist table
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;