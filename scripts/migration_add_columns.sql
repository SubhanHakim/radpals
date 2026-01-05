-- Copy and paste this into your Supabase Dashboard > SQL Editor to add the missing columns.

ALTER TABLE public.characters 
ADD COLUMN IF NOT EXISTS twitter text,
ADD COLUMN IF NOT EXISTS pump_contract text;
