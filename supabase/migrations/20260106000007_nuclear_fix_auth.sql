-- NUCLEAR FIX FOR "Database error saving new user"
-- This script reset the trigger, ensures the staff_number column exists, 
-- and uses an extremely robust INSERT-OR-UPDATE pattern to prevent any failures.

-- 1. Ensure the staff_number column exists in public.users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS staff_number TEXT;

-- 2. Drop existing trigger and function to ensure a clean state
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 3. Create the robust trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  final_role public.app_role;
BEGIN
  -- Safe role parsing: Try to cast metadata role to the enum
  BEGIN
    final_role := (new.raw_user_meta_data->>'role')::public.app_role;
  EXCEPTION WHEN OTHERS THEN
    -- Fallback to student if casting fails (e.g., invalid role string)
    final_role := 'student'::public.app_role;
  END;
  
  -- Double-check it's not null (enum cast of NULL is NULL)
  IF final_role IS NULL THEN
    final_role := 'student'::public.app_role;
  END IF;

  -- Use ON CONFLICT (id) DO UPDATE to prevent errors if the user profile already exists
  INSERT INTO public.users (
    id, 
    email, 
    role, 
    full_name, 
    institution, 
    admission_number,
    staff_number
  )
  VALUES (
    new.id, 
    new.email, 
    final_role,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'institution',
    new.raw_user_meta_data->>'admission_number',
    new.raw_user_meta_data->>'staff_number'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    role = EXCLUDED.role,
    full_name = EXCLUDED.full_name,
    institution = EXCLUDED.institution,
    admission_number = EXCLUDED.admission_number,
    staff_number = EXCLUDED.staff_number,
    updated_at = NOW();
    
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Re-attach the trigger to the auth.users table
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
