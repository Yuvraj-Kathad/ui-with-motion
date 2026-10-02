-- Migration: Secure Components RLS
-- Description: Drop the overly permissive public SELECT policy. The application now uses a secure server-side boundary (Next.js Server Actions with service_role) to retrieve and scrub components, preventing users from bypassing entitlement gating via the Supabase Data API.

-- Drop the policy that allowed anyone to read the components table
DROP POLICY IF EXISTS "Anyone can view published components" ON public.components;

-- The "Admins can manage components" policy remains, allowing admins to manage components.
-- Public catalog fetching will now rely entirely on the secure server-action boundary.
