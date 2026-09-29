-- Migration: Reset Legacy Builder Schemas
-- Description: Discards the old string-replacement schema_definition configurations for the four recovered components, preparing them for the V1 CSS-variable architecture.

UPDATE public.components
SET schema_definition = '[]'::jsonb
WHERE registry_id IN (
    'accept-button',
    'continue-button',
    'generate-button',
    'delete-button'
);
