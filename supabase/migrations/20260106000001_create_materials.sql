-- Create Enum for Material Status
CREATE TYPE public.material_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- Create Materials Table
CREATE TABLE public.materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- e.g., 'application/pdf', 'text/plain'
  status public.material_status NOT NULL DEFAULT 'pending',
  uploaded_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- AI Generated Content (can be stored here or in separate tables, keeping here for simplicity for now or JSONB)
  -- For modularity, we might want separate tables for 'summaries', 'audio_files', but for this hackathon scale, 
  -- simple columns or JSONB is efficient. Let's use specific columns for URLs to keep it structured.
  audio_url TEXT,
  summary TEXT,
  simplified_content TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- Index for faster queries by user
CREATE INDEX idx_materials_uploaded_by ON public.materials(uploaded_by);
