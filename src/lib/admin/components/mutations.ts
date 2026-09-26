"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function createComponent(data: any) {
  await requireAdmin();
  const supabase = await createClient();
  
  const { data: existing, error: checkError } = await supabase
    .from("components")
    .select("id")
    .eq("registry_id", data.registry_id)
    .maybeSingle();

  if (checkError) {
    throw new Error("Failed to validate component registry ID uniqueness.");
  }

  if (existing) {
    throw new Error(`A component with registry ID "${data.registry_id}" already exists.`);
  }
  
  const { data: result, error } = await supabase
    .from("components")
    .insert([{
      registry_id: data.registry_id,
      title: data.title,
      description: data.description,
      status: data.status,
      tags: data.tags || [],
      type: data.type || "component",
      order: data.order || 0,
      source_type: data.source_type || "react",
      snippets: data.snippets || {},
      schema_definition: data.schema_definition || []
    }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (result.status === "published") {
    revalidatePath("/components");
  }
  revalidatePath("/admin/components");
  
  return result;
}

export async function updateComponent(id: string, data: any) {
  await requireAdmin();
  const supabase = await createClient();
  
  const updatePayload: any = {
    title: data.title,
    description: data.description,
    status: data.status,
    tags: data.tags,
    type: data.type,
    order: data.order
  };
  
  if (data.source_type !== undefined) updatePayload.source_type = data.source_type;
  if (data.snippets !== undefined) updatePayload.snippets = data.snippets;
  if (data.schema_definition !== undefined) updatePayload.schema_definition = data.schema_definition;
  if (data.registry_id !== undefined) updatePayload.registry_id = data.registry_id;

  const { data: result, error } = await supabase
    .from("components")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/components");
  revalidatePath("/admin/components");
  revalidatePath(`/admin/components/${id}/edit`);
  
  return result;
}

export async function publishComponent(id: string) {
  return updateComponent(id, { status: "published" });
}

export async function archiveComponent(id: string) {
  return updateComponent(id, { status: "archived" });
}
