"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin";

export async function getAdminComponents() {
  await requireAdmin();
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("components")
    .select("*")
    .order("order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAdminComponent(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("components")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPublishedComponents() {
  const supabase = await createClient();
  const { getUserEntitlement } = await import("@/lib/auth/entitlement");
  
  const { isPremium } = await getUserEntitlement();

  const { data, error } = await supabase
    .from("components")
    .select("*")
    .eq("status", "published")
    .order("order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // Task 5: Secure Data Boundary - scrub protected fields for Premium components if user is not Premium
  const scrubbedData = data.map(comp => {
    // If the component doesn't have an access tier yet due to missing DB migration, default to 'free'
    const tier = comp.access_tier || 'free';
    
    // Explicit initial tier assignments for the 9 trusted components without DB migration
    // Free components: 'continue-button', 'generate-button', 'accept-button'
    // The rest are Premium.
    let effectiveTier = tier;
    if (['continue-button', 'generate-button', 'accept-button'].includes(comp.registry_id)) {
      effectiveTier = 'free';
    } else if (['get-access-button', 'mail-button', 'delete-button', 'download-button', 'tabs-button', 'services-indicator-button'].includes(comp.registry_id)) {
      effectiveTier = 'premium';
    }

    comp.access_tier = effectiveTier;

    if (effectiveTier === 'premium' && !isPremium) {
      return {
        ...comp,
        snippets: null, // Protected source code
        schema_definition: [], // Protected customization metadata
      };
    }

    return comp;
  });

  return scrubbedData;
}
