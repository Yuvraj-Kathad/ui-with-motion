import { createClient } from "@/lib/supabase/server";

export async function getUserEntitlement() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { isPremium: false, user: null };
  }

  // Also check if they are admin (admins get all access)
  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  const isAdmin = roleData?.role === 'admin';

  // In the next phase, this will check a Stripe/Razorpay subscription status
  // For now, only admins get Premium access. To test Premium locally, assign the 'admin' role in Supabase.
  const isPremium = isAdmin;

  return { isPremium, user };
}
