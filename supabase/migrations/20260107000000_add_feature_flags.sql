-- Add feature flags to materials table
ALTER TABLE public.materials 
ADD COLUMN IF NOT EXISTS enable_summary BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS enable_logic BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS enable_encryption BOOLEAN DEFAULT TRUE;
