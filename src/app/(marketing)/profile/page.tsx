import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Profile | UX With Motion",
  description: "User profile.",
};

import { ProfileClient } from "./ProfileClient";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .in("status", ["active", "trialing"])
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const isPremium = !!subscription;

  return <ProfileClient user={user} isPremium={isPremium} subscription={subscription} />;
}

