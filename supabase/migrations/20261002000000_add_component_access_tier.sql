-- Migration: Add Component Access Tier
-- Description: Introduces the Free/Premium access tier field for the public catalog entitlement model.

ALTER TABLE public.components 
ADD COLUMN IF NOT EXISTS access_tier text NOT NULL DEFAULT 'free' CHECK (access_tier IN ('free', 'premium'));

-- Set initial assignments based on current product direction:
-- 'continue-button', 'generate-button', 'accept-button' remain 'free'
-- The rest become 'premium' to demonstrate the entitlement gating
UPDATE public.components
SET access_tier = 'premium'
WHERE registry_id NOT IN ('continue-button', 'generate-button', 'accept-button');
