-- Users Table Policies

-- Users can view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- Users can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile"
ON public.users
FOR UPDATE
USING (auth.uid() = id);

-- Admins can view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.users;
CREATE POLICY "Admins can view all profiles"
ON public.users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users AS u
    WHERE u.id = auth.uid() AND u.role = 'admin'
  )
);

-- Materials Table Policies

-- Students can view their own materials
DROP POLICY IF EXISTS "Users can view own materials" ON public.materials;
CREATE POLICY "Users can view own materials"
ON public.materials
FOR SELECT
USING (auth.uid() = uploaded_by);

-- Students can insert their own materials
DROP POLICY IF EXISTS "Users can upload materials" ON public.materials;
CREATE POLICY "Users can upload materials"
ON public.materials
FOR INSERT
WITH CHECK (auth.uid() = uploaded_by);

-- Students can update their own materials
DROP POLICY IF EXISTS "Users can update own materials" ON public.materials;
CREATE POLICY "Users can update own materials"
ON public.materials
FOR UPDATE
USING (auth.uid() = uploaded_by);

-- Students can delete their own materials
DROP POLICY IF EXISTS "Users can delete own materials" ON public.materials;
CREATE POLICY "Users can delete own materials"
ON public.materials
FOR DELETE
USING (auth.uid() = uploaded_by);

-- Admins can do everything on materials
DROP POLICY IF EXISTS "Admins can manage all materials" ON public.materials;
CREATE POLICY "Admins can manage all materials"
ON public.materials
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.users AS u
    WHERE u.id = auth.uid() AND u.role = 'admin'
  )
);