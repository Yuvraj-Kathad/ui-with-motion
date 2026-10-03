-- Migration: user_subscriptions
-- Description: Create subscriptions table and webhook idempotency table for Razorpay integration

CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    provider_customer_id TEXT,
    provider_subscription_id TEXT NOT NULL UNIQUE,
    provider_plan_id TEXT NOT NULL,
    plan_key TEXT NOT NULL,
    status TEXT NOT NULL,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure a user can only have one active/provider subscription relation (or just an index for fast lookup)
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON public.user_subscriptions(status);

-- Enable RLS
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can read their own subscriptions
CREATE POLICY "Users can view their own subscriptions" 
    ON public.user_subscriptions FOR SELECT 
    USING (auth.uid() = user_id);

-- Only service role (webhook/server) can insert/update/delete
-- No policies needed for INSERT/UPDATE/DELETE for public users (default deny)

-- Webhook Idempotency Table
CREATE TABLE IF NOT EXISTS public.webhook_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    provider TEXT NOT NULL,
    provider_event_id TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- No RLS needed for webhook_events since it is only accessed via service-role
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
