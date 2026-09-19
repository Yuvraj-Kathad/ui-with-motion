import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const variant = user ? "logged-in" : "logged-out";
  
  // Extract user identity for the authenticated Navbar dropdown
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || "User";
  const userEmail = user?.email || "";

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar variant={variant} userName={userName} userEmail={userEmail} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
