"use server";

import 'server-only';
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function sendAdminPasswordReset(email: string) {
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Server configuration error: missing secret key.");
  }

  // Create an admin client to securely check auth.users without exposing to browser
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secretKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  // First find the user by email using the Admin API
  const { data: { users }, error: userError } = await supabaseAdmin.auth.admin.listUsers();
  
  if (userError) {
    throw new Error("Failed to verify user eligibility.");
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    // Return success to avoid email enumeration attacks
    return { success: true };
  }

  // Now check if this user has the admin role
  const { data: roleData, error: roleError } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (roleError || !roleData || roleData.role !== "admin") {
    // Not an admin. Return success to avoid enumeration.
    return { success: true };
  }

  // Is an admin. Generate and send the recovery email.
  const supabase = await createServerClient();
  const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/admin/update-password`,
  });

  if (resetError) {
    throw new Error("Failed to send reset email.");
  }

  return { success: true };
}
