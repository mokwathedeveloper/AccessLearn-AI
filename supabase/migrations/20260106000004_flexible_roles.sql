-- Update the handle_new_user function to respect the role passed in metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  initial_role public.app_role;
BEGIN
  -- Extract role from metadata, default to 'student' if not found or invalid
  initial_role := COALESCE(
    (new.raw_user_meta_data->>'role')::public.app_role,
    'student'::public.app_role
  );

  INSERT INTO public.users (id, email, role)
  VALUES (new.id, new.email, initial_role);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
