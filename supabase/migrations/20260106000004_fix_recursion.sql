-- Fix for infinite recursion in RLS policies
-- This file introduces a security definer function to check roles safely.

-- 1. Helper function to check if user is admin without recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Users Table Policies
-- Users can view their own profile or if they are an admin
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile"
ON public.users
FOR SELECT
USING (auth.uid() = id OR is_admin());

-- Users can update their own profile or if they are an admin
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile"
ON public.users
FOR UPDATE
USING (auth.uid() = id OR is_admin());

-- Remove the old recursive policy if it exists
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.users;

-- 3. Materials Table Policies
-- Students can view their own materials or if they are an admin
DROP POLICY IF EXISTS "Users can view own materials" ON public.materials;
CREATE POLICY "Users can view own materials"
ON public.materials
FOR SELECT
USING (auth.uid() = uploaded_by OR is_admin());

-- Students can insert their own materials
DROP POLICY IF EXISTS "Users can upload materials" ON public.materials;
CREATE POLICY "Users can upload materials"
ON public.materials
FOR INSERT
WITH CHECK (auth.uid() = uploaded_by);

-- Students can update their own materials or if they are an admin
DROP POLICY IF EXISTS "Users can update own materials" ON public.materials;
CREATE POLICY "Users can update own materials"
ON public.materials
FOR UPDATE
USING (auth.uid() = uploaded_by OR is_admin());

-- Students can delete their own materials or if they are an admin
DROP POLICY IF EXISTS "Users can delete own materials" ON public.materials;
CREATE POLICY "Users can delete own materials"
ON public.materials
FOR DELETE
USING (auth.uid() = uploaded_by OR is_admin());

-- Remove old separate admin policy for materials as it's now integrated
DROP POLICY IF EXISTS "Admins can manage all materials" ON public.materials;
