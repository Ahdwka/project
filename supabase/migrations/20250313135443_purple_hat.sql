/*
  # Create admin user and set role

  1. Changes
    - Create admin user with specified email
    - Set user role to 'admin'

  2. Security
    - Maintain existing RLS policies
*/

-- Set the role for the admin user
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'razioxstore@gmail.com';
