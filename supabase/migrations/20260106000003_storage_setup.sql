-- Create a bucket for lecture materials
INSERT INTO storage.buckets (id, name, public) 
VALUES ('lecture-materials', 'lecture-materials', false);

-- Set up RLS for the bucket
-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Users can upload lecture materials"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'lecture-materials' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to view their own uploaded files
CREATE POLICY "Users can view own lecture materials"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'lecture-materials' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow admins to view all files
CREATE POLICY "Admins can view all lecture materials"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'lecture-materials' AND
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);
