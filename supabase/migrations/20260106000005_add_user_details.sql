-- Add full_name and institution to public.users
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS institution TEXT;

-- Update the handle_new_user function to map more metadata
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

  INSERT INTO public.users (id, email, role, full_name, institution)
  VALUES (
    new.id, 
    new.email, 
    initial_role,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'institution'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
