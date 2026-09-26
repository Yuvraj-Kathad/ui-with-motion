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
  
  const { data, error } = await supabase
    .from("components")
    .select("*")
    .eq("status", "published")
    .order("order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
