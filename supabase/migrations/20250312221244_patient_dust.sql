/*
  # Initial Schema Setup for Razio Laptop Catalog

  1. New Tables
    - users (managed by Supabase Auth)
    - brands
      - id (uuid, primary key)
      - name (text)
      - logo_url (text)
      - created_at (timestamp)
    - laptops
      - id (uuid, primary key)
      - brand_id (uuid, foreign key)
      - model (text)
      - price (numeric)
      - specs (jsonb)
      - images (text[])
      - created_at (timestamp)
    - favorites
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - laptop_id (uuid, foreign key)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admins
*/

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  created_at timestamptz DEFAULT now()
);

-- Create laptops table
CREATE TABLE IF NOT EXISTS laptops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE,
  model text NOT NULL,
  price numeric NOT NULL,
  specs jsonb NOT NULL DEFAULT '{}',
  images text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  laptop_id uuid REFERENCES laptops(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, laptop_id)
);

-- Enable RLS
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE laptops ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Brands policies
CREATE POLICY "Anyone can view brands"
  ON brands FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can modify brands"
  ON brands
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Laptops policies
CREATE POLICY "Anyone can view laptops"
  ON laptops FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can modify laptops"
  ON laptops
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Favorites policies
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites"
  ON favorites
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);