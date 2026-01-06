-- Add preferences column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;

-- Update the handle_new_user function to initialize preferences if needed
-- (The DEFAULT value already handles it for new users, but we can ensure it here)
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
    staff_number,
    preferences
  )
  VALUES (
    new.id,
    new.email,
    v_role,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'institution',
    new.raw_user_meta_data->>'admission_number',
    new.raw_user_meta_data->>'staff_number',
    '{"contrast": "standard", "textSize": "default", "voiceSpeed": 1.0}'::jsonb
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
