"use server";

import { createClient } from "@/lib/supabase/server";
import type { LeadInsert } from "@/types/database";

export async function submitLead(lead: LeadInsert) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert(lead);

  if (error) return { error: error.message };
  return { success: true };
}
