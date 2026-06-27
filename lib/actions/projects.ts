"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Project, ProjectInsert, ProjectUpdate } from "@/types/database";

function normalizeGallery(gallery: unknown): string[] {
  if (Array.isArray(gallery)) {
    return gallery.filter((item): item is string => typeof item === "string");
  }
  if (typeof gallery === "string") {
    try {
      const parsed = JSON.parse(gallery);
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === "string")
        : [];
    } catch {
      return [];
    }
  }
  return [];
}

function normalizeProject(project: Project): Project {
  return { ...project, gallery: normalizeGallery(project.gallery) };
}

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return ((data ?? []) as Project[]).map(normalizeProject);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return ((data ?? []) as Project[]).map(normalizeProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return null;
  return normalizeProject(data as Project);
}

export async function getAllProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return ((data ?? []) as Project[]).map(normalizeProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return normalizeProject(data as Project);
}

export async function createProject(project: ProjectInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  revalidatePath("/admin/projects");
  return { data };
}

export async function updateProject(id: string, project: ProjectUpdate) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id)
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  revalidatePath("/admin/projects");
  return { data };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true };
}
