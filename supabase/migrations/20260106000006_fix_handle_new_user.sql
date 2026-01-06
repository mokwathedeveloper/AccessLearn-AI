-- Consolidated fix for handle_new_user trigger function
-- This script ensures the staff_number column exists and provides robust error handling for role casting.

-- 1. Ensure the staff_number column exists
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS staff_number TEXT;

-- 2. Improved Trigger Function with robust casting and error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  initial_role_text TEXT;
  initial_role public.app_role;
BEGIN
  -- 1. Extract role as text first to handle casting safely
  initial_role_text := COALESCE(new.raw_user_meta_data->>'role', 'student');
  
  -- 2. Safely cast to app_role enum, fallback to 'student' if invalid or missing
  BEGIN
    initial_role := initial_role_text::public.app_role;
  EXCEPTION WHEN OTHERS THEN
    initial_role := 'student'::public.app_role;
  END;

  -- 3. Perform the insert into public.users
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
    initial_role,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'institution',
    new.raw_user_meta_data->>'admission_number',
    new.raw_user_meta_data->>'staff_number'
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
