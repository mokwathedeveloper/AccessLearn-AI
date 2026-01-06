-- FINAL AUTH SYNCHRONIZATION SCRIPT
-- This script resets and re-aligns the Auth Trigger and Users table.

-- 1. Ensure the Enum is correct
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        CREATE TYPE public.app_role AS ENUM ('admin', 'student');
    END IF;
END$$;

-- 2. Ensure the Table is fully equipped
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  role public.app_role NOT NULL DEFAULT 'student',
  full_name TEXT,
  institution TEXT,
  admission_number TEXT,
  staff_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Ensure all columns exist (in case table was created by an older version)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS institution TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS admission_number TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS staff_number TEXT;

-- 4. Re-create the is_admin helper for RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 5. The Core Trigger Function (Highly Defensive)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_role public.app_role;
BEGIN
  -- Safely parse the role from metadata
  BEGIN
    v_role := (new.raw_user_meta_data->>'role')::public.app_role;
  EXCEPTION WHEN OTHERS THEN
    v_role := 'student'::public.app_role;
  END;

  -- Fallback if null
  IF v_role IS NULL THEN
    v_role := 'student'::public.app_role;
  END IF;

  -- Insert with Upsert logic
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
    v_role,
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 6. Re-attach Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
