/*
  # Create waitlist table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `type` (text) - user type: vendor, buyer, freelancer, media
      - `name` (text, required)
      - `email` (text, required)
      - `company` (text, optional)
      - `role` (text, optional)
      - `linkedin` (text, optional)
      - `product_url` (text, optional) - for vendors
      - `company_size` (text, optional) - for vendors
      - `use_case` (text, optional) - for buyers
      - `industry` (text, optional) - for buyers
      - `services` (text, optional) - for freelancers
      - `portfolio` (text, optional) - for freelancers
      - `publication` (text, optional) - for media
      - `audience_size` (text, optional) - for media
      - `content_focus` (text, optional) - for media
      - `status` (text, default 'pending')
      - `source` (text, default 'landing-page')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for anyone to insert (join waitlist)
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

-- Allow anyone to join the waitlist (insert)
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read their own waitlist entries
CREATE POLICY "Users can read own waitlist entries"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_type ON waitlist(type);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);