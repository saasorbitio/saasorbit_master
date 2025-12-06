/*
  # Create waitlist table with proper RLS policies

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `type` (text) - user type: vendor, buyer, freelancer, media
      - `name` (text) - full name
      - `email` (text) - email address
      - `company` (text, optional) - company name
      - `role` (text, optional) - job role/title
      - `linkedin` (text, optional) - LinkedIn profile URL
      - `product_url` (text, optional) - product/service URL (vendors)
      - `company_size` (text, optional) - company size (vendors)
      - `use_case` (text, optional) - primary use case (buyers)
      - `industry` (text, optional) - industry (buyers)
      - `services` (text, optional) - services offered (freelancers)
      - `portfolio` (text, optional) - portfolio URL (freelancers)
      - `publication` (text, optional) - publication/platform (media)
      - `audience_size` (text, optional) - audience size (media)
      - `content_focus` (text, optional) - content focus (media)
      - `status` (text) - waitlist status
      - `source` (text) - signup source
      - `created_at` (timestamp) - creation timestamp
      - `updated_at` (timestamp) - last update timestamp

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for anonymous users to insert waitlist entries
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('vendor', 'buyer', 'freelancer', 'media')),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  role text,
  linkedin text,
  product_url text,
  company_size text,
  use_case text,
  industry text,
  services text,
  portfolio text,
  publication text,
  audience_size text,
  content_focus text,
  status text DEFAULT 'pending',
  source text DEFAULT 'landing-page',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_type ON waitlist (type);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist (created_at DESC);

-- RLS Policies

-- Allow anonymous users to insert waitlist entries (for form submissions)
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read their own waitlist entries
CREATE POLICY "Users can read own waitlist entries"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Allow service role to read all entries (for admin dashboard)
CREATE POLICY "Service role can read all entries"
  ON waitlist
  FOR SELECT
  TO service_role
  USING (true);