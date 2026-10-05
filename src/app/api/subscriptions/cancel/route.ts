import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: existingSub, error: fetchError } = await supabase
      .from("user_subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !existingSub) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 404 });
    }

    if (existingSub.cancel_at_period_end) {
      return NextResponse.json({ error: "Subscription is already scheduled to cancel" }, { status: 400 });
    }

    // Call Razorpay to cancel at cycle end
    const rzpResponse = await razorpay.subscriptions.cancel(
      existingSub.provider_subscription_id, 
      true
    );

    // If Razorpay succeeds, it returns the subscription object
    // We update the local state securely from the server
    const serviceRoleClient = createServiceRoleClient();
    await serviceRoleClient
      .from("user_subscriptions")
      .update({
        cancel_at_period_end: true,
        updated_at: new Date().toISOString()
      })
      .eq("provider_subscription_id", existingSub.provider_subscription_id);

    return NextResponse.json({ success: true, message: "Cancellation scheduled" });
  } catch (error: any) {
    console.error("Subscription cancellation error:", error);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}
