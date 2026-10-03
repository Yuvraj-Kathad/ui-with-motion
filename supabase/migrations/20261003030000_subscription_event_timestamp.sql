-- Migration: subscription_event_timestamp
-- Description: Add last_provider_event_created_at to user_subscriptions to safely order incoming webhooks

ALTER TABLE public.user_subscriptions 
    ADD COLUMN last_provider_event_created_at TIMESTAMPTZ;
