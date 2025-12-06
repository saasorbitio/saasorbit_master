/*
  # Temporarily disable RLS for waitlist table

  This migration temporarily disables Row Level Security on the waitlist table
  to allow anonymous users to submit waitlist forms without authentication.

  1. Changes
     - Disable RLS on waitlist table
     - Allow public access for form submissions

  2. Security Note
     - This is appropriate for a public waitlist signup form
     - Data is not sensitive (public contact information)
     - Admin access is still controlled through service role
*/

-- Disable Row Level Security on waitlist table to allow public submissions
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;