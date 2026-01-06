-- Users Table Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.users
FOR UPDATE
USING (auth.uid() = id);

-- Admins can view all profiles
-- Note: Check if the user is an admin by querying the public.users table (or via custom claims if implemented)
-- Here we assume 'role' column in public.users is the source of truth.
-- To avoid recursion, we might need a simpler check or trust the token if we used custom claims.
-- For now, we will use a subquery but be mindful of performance.
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
CREATE POLICY "Users can view own materials"
ON public.materials
FOR SELECT
USING (auth.uid() = uploaded_by);

-- Students can insert their own materials
CREATE POLICY "Users can upload materials"
ON public.materials
FOR INSERT
WITH CHECK (auth.uid() = uploaded_by);

-- Students can update their own materials
CREATE POLICY "Users can update own materials"
ON public.materials
FOR UPDATE
USING (auth.uid() = uploaded_by);

-- Students can delete their own materials
CREATE POLICY "Users can delete own materials"
ON public.materials
FOR DELETE
USING (auth.uid() = uploaded_by);

-- Admins can do everything on materials
CREATE POLICY "Admins can manage all materials"
ON public.materials
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.users AS u
    WHERE u.id = auth.uid() AND u.role = 'admin'
  )
);
