import { createClient } from "@/lib/supabase/server";

export async function getUserEntitlement() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { isPremium: false, user: null };
  }

  // Temporary premium testing:
  // A test user is considered Premium if their email contains "+premium"
  const isPremiumTestUser = user.email?.includes('+premium');

  // Also check if they are admin (admins get all access)
  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  const isAdmin = roleData?.role === 'admin';

  // In the next phase, this will check a Stripe subscription status
  const isPremium = isPremiumTestUser || isAdmin;

  return { isPremium, user };
}
