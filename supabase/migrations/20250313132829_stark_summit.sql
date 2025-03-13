/*
  # Update Laptop Specifications Schema

  1. Changes
    - Remove JSONB specs column
    - Add individual columns for each specification
    - Migrate existing data to new structure

  2. Security
    - Maintain existing RLS policies
*/

-- First, create new columns
ALTER TABLE laptops
ADD COLUMN processor text,
ADD COLUMN ram text,
ADD COLUMN storage text,
ADD COLUMN display text,
ADD COLUMN gpu text,
ADD COLUMN battery text,
ADD COLUMN weight text,
ADD COLUMN ports text[],
ADD COLUMN os text,
ADD COLUMN color text;

-- Migrate existing data from JSONB to individual columns
UPDATE laptops
SET
  processor = specs->>'processor',
  ram = specs->>'ram',
  storage = specs->>'storage',
  display = specs->>'display',
  gpu = specs->>'gpu',
  battery = specs->>'battery',
  weight = specs->>'weight',
  ports = ARRAY(SELECT jsonb_array_elements_text(specs->'ports')),
  os = specs->>'os',
  color = specs->>'color';

-- Make required columns NOT NULL
ALTER TABLE laptops
ALTER COLUMN processor SET NOT NULL,
ALTER COLUMN ram SET NOT NULL,
ALTER COLUMN storage SET NOT NULL,
ALTER COLUMN display SET NOT NULL,
ALTER COLUMN gpu SET NOT NULL,
ALTER COLUMN os SET NOT NULL,
ALTER COLUMN color SET NOT NULL;

-- Drop the old specs column
ALTER TABLE laptops DROP COLUMN specs;