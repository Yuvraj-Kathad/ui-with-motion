-- Migration: user_component_customizations
-- Description: Create a table for signed-in users to persist their component customizations (CSS variable overrides).

CREATE TABLE IF NOT EXISTS public.user_component_customizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    component_id UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
    overrides JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure a user can only have one customization record per component
ALTER TABLE public.user_component_customizations 
    ADD CONSTRAINT user_component_customizations_user_id_component_id_key 
    UNIQUE (user_id, component_id);

-- Enable RLS
ALTER TABLE public.user_component_customizations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own customizations" 
    ON public.user_component_customizations FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own customizations" 
    ON public.user_component_customizations FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customizations" 
    ON public.user_component_customizations FOR UPDATE 
    USING (auth.uid() = user_id) 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customizations" 
    ON public.user_component_customizations FOR DELETE 
    USING (auth.uid() = user_id);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_user_component_customizations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_component_customizations_updated_at
    BEFORE UPDATE ON public.user_component_customizations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_user_component_customizations_updated_at();
