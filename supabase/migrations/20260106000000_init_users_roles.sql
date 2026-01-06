-- 1. Create Enum for User Roles (with existence check)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        CREATE TYPE public.app_role AS ENUM ('admin', 'student');
    END IF;
END$$;

-- 2. Create Users Table (Public Profile)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  role public.app_role NOT NULL DEFAULT 'student',
  full_name TEXT,
  institution TEXT,
  admission_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. Create function to handle new user signup (OR REPLACE handles existence)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  initial_role public.app_role;
BEGIN
  -- Extract role from metadata, default to 'student'
  initial_role := COALESCE(
    (new.raw_user_meta_data->>'role')::public.app_role,
    'student'::public.app_role
  );

  INSERT INTO public.users (id, email, role, full_name, institution, admission_number)
  VALUES (
    new.id, 
    new.email, 
    initial_role,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'institution',
    new.raw_user_meta_data->>'admission_number'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create trigger (Drop first to avoid "already exists" error)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();