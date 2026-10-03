import { createClient } from "@/lib/supabase/server";

export async function getUserEntitlement() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { isPremium: false, user: null };
  }

  // Check if they are admin (admins get all access)
  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  const isAdmin = roleData?.role === 'admin';

  // Check subscription status
  const { data: subData } = await supabase
    .from("user_subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user.id)
    .in("status", ["active", "cancelled", "completed", "paused"])
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  let isPremium = isAdmin;

  if (subData) {
    if (subData.status === "active") {
      isPremium = true;
    } else if (["cancelled", "completed", "paused"].includes(subData.status) && subData.current_period_end) {
      // If cancelled, completed or paused but the paid period hasn't ended yet
      const periodEnd = new Date(subData.current_period_end);
      if (periodEnd > new Date()) {
        isPremium = true;
      }
    }
  }

  return { isPremium, user };
}
