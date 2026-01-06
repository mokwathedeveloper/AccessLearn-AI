-- 1. Create Enum for Material Status (with existence check)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'material_status') THEN
        CREATE TYPE public.material_status AS ENUM ('pending', 'processing', 'completed', 'failed');
    END IF;
END$$;

-- 2. Create Materials Table
CREATE TABLE IF NOT EXISTS public.materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- e.g., 'application/pdf', 'text/plain'
  status public.material_status NOT NULL DEFAULT 'pending',
  uploaded_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- AI Generated Content
  audio_url TEXT,
  summary TEXT,
  simplified_content TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- 4. Create Index for faster queries by user
CREATE INDEX IF NOT EXISTS idx_materials_uploaded_by ON public.materials(uploaded_by);