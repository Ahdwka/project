/*
  # Add detailed specifications for laptops

  1. Changes
    - Update laptops table specs JSONB structure to include detailed specifications
    - Add validation for required specs fields

  2. Security
    - Maintain existing RLS policies
*/

DO $$ 
BEGIN
  -- Add validation check for required specs fields
  ALTER TABLE laptops
  ADD CONSTRAINT specs_required_fields
  CHECK (
    specs ? 'processor' AND 
    specs ? 'ram' AND 
    specs ? 'storage' AND 
    specs ? 'display' AND 
    specs ? 'gpu' AND
    specs ? 'battery' AND
    specs ? 'weight' AND
    specs ? 'ports' AND
    specs ? 'os' AND
    specs ? 'color'
  );

  -- Update existing rows to include all required fields
  UPDATE laptops
  SET specs = specs || '{
    "battery": "",
    "weight": "",
    "ports": [],
    "os": "",
    "color": ""
  }'::jsonb
  WHERE NOT (
    specs ? 'battery' AND 
    specs ? 'weight' AND 
    specs ? 'ports' AND 
    specs ? 'os' AND 
    specs ? 'color'
  );
END $$;