/*
  # Create waitlist table for SaaS Orbit

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `type` (text) - user type: vendor, buyer, freelancer, media
      - `name` (text) - full name
      - `email` (text, unique) - email address
      - `company` (text, optional) - company name
      - `role` (text, optional) - job role/title
      - `linkedin` (text, optional) - LinkedIn profile URL
      - `product_url` (text, optional) - product/service URL (for vendors)
      - `company_size` (text, optional) - company size (for vendors)
      - `use_case` (text, optional) - primary use case (for buyers)
      - `industry` (text, optional) - industry (for buyers)
      - `services` (text, optional) - services offered (for freelancers)
      - `portfolio` (text, optional) - portfolio URL (for freelancers)
      - `publication` (text, optional) - publication/platform (for media)
      - `audience_size` (text, optional) - audience size (for media)
      - `content_focus` (text, optional) - content focus (for media)
      - `status` (text) - entry status
      - `source` (text) - source of signup
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for anonymous users to insert data
    - Add policy for authenticated users to read data
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('vendor', 'buyer', 'freelancer', 'media')),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
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

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert waitlist entries
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow reading waitlist data (for admin dashboard)
CREATE POLICY "Allow reading waitlist entries"
  ON waitlist
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_type ON waitlist (type);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist (created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at
    BEFORE UPDATE ON waitlist
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();