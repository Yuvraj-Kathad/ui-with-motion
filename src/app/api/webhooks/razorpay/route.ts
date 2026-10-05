import { NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export const dynamic = "force-dynamic";

function validateWebhookSignature(body: string, signature: string, secret: string) {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-razorpay-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const rawBody = await req.text();
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (!secret) {
      console.error("Webhook secret missing");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const isValid = validateWebhookSignature(rawBody, signature, secret);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    const serviceRoleClient = createServiceRoleClient();

    // Idempotency Check
    const eventId = req.headers.get("x-razorpay-event-id");
    if (!eventId) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }
    
    // Insert idempotency record
    const { error: idempotencyError } = await serviceRoleClient
      .from("webhook_events")
      .insert({
        provider: "razorpay",
        provider_event_id: eventId,
        type: event.event,
      });

    if (idempotencyError && idempotencyError.code === "23505") {
      // 23505 is unique violation in Postgres
      console.log(`Webhook already processed: ${eventId}`);
      return NextResponse.json({ received: true, note: "Already processed" });
    }

    // Process event
    if (event.event.startsWith("subscription.")) {
      const subscription = event.payload.subscription.entity;
      const subId = subscription.id;
      const status = subscription.status;
      const currentEnd = subscription.current_end ? new Date(subscription.current_end * 1000).toISOString() : null;
      const currentStart = subscription.current_start ? new Date(subscription.current_start * 1000).toISOString() : null;
      const eventTime = new Date(event.created_at * 1000).toISOString();

      // Only update if the incoming event is newer than or equal to our last recorded state
      // We use last_provider_event_created_at to track the Razorpay event time for the subscription
      const { data: existingSub } = await serviceRoleClient
        .from("user_subscriptions")
        .select("last_provider_event_created_at, cancel_at_period_end")
        .eq("provider_subscription_id", subId)
        .single();
        
      if (existingSub && existingSub.last_provider_event_created_at && new Date(existingSub.last_provider_event_created_at) > new Date(eventTime)) {
        console.log(`Skipping older webhook for subscription ${subId}`);
        return NextResponse.json({ received: true, note: "Older event skipped" });
      }

      // If Razorpay payload has a cancel_at_cycle_end or cancel_at_period_end property, use it.
      // Otherwise, preserve our local state.
      const payloadCancelAtPeriodEnd = subscription.cancel_at_period_end !== undefined ? (subscription.cancel_at_period_end === 1 || subscription.cancel_at_period_end === true) :
                                       subscription.cancel_at_cycle_end !== undefined ? (subscription.cancel_at_cycle_end === 1 || subscription.cancel_at_cycle_end === true) :
                                       existingSub?.cancel_at_period_end || false;

      await serviceRoleClient
        .from("user_subscriptions")
        .update({
          status: status,
          current_period_start: currentStart,
          current_period_end: currentEnd,
          cancel_at_period_end: payloadCancelAtPeriodEnd,
          last_provider_event_created_at: eventTime,
          updated_at: new Date().toISOString()
        })
        .eq("provider_subscription_id", subId);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
