-- Create Performance Logs Table
CREATE TABLE IF NOT EXISTS public.performance_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  method TEXT NOT NULL,
  route TEXT NOT NULL,
  status_code INTEGER,
  duration_ms INTEGER NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.performance_logs ENABLE ROW LEVEL SECURITY;

-- Only Admins can view performance logs
CREATE POLICY "Admins can view performance logs"
ON public.performance_logs
FOR SELECT
USING (public.is_admin());

-- Allow anyone to insert (so the backend can log even if the user isn't logged in, 
-- or we can restrict it to the backend service role, but for now, simple insert)
CREATE POLICY "Enable insert for all"
ON public.performance_logs
FOR INSERT
WITH CHECK (true);
