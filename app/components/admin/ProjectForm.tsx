"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { createProject, updateProject } from "@/lib/actions/projects";
import { slugify } from "@/lib/utils";
import type { Project } from "@/types/database";

type ProjectFormProps = {
  project?: Project;
};

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [gallery, setGallery] = useState<string[]>(project?.gallery ?? []);
  const [coverImage, setCoverImage] = useState(project?.cover_image ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const title = form.get("title") as string;
    const data = {
      title,
      slug: (form.get("slug") as string) || slugify(title),
      category: form.get("category") as string,
      location: form.get("location") as string,
      description: form.get("description") as string,
      cover_image: coverImage || null,
      gallery,
      published: form.get("published") === "on",
    };

    const result = project
      ? await updateProject(project.id, data)
      : await createProject(data);

    setSaving(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  }

  function addGalleryUrl(url: string) {
    setGallery((prev) => [...prev, url]);
  }

  function removeGalleryItem(index: number) {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && <p className="text-sm text-red-700">{error}</p>}

      <div>
        <label htmlFor="title" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Title</label>
        <input id="title" name="title" type="text" required defaultValue={project?.title}
          className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone" />
      </div>

      <div>
        <label htmlFor="slug" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Slug</label>
        <input id="slug" name="slug" type="text" defaultValue={project?.slug}
          placeholder="auto-generated from title"
          className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="category" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Category</label>
          <input id="category" name="category" type="text" required defaultValue={project?.category}
            className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone" />
        </div>
        <div>
          <label htmlFor="location" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Location</label>
          <input id="location" name="location" type="text" required defaultValue={project?.location}
            className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone" />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Description</label>
        <textarea id="description" name="description" rows={6} required defaultValue={project?.description}
          className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone resize-none" />
      </div>

      <ImageUpload name="cover_image" label="Cover image" currentUrl={coverImage} onUploaded={setCoverImage} />

      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Gallery</p>
        <div className="space-y-3">
          {gallery.map((url, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-10 w-14 rounded-[var(--radius)] bg-hair bg-cover bg-center" style={{ backgroundImage: `url(${url})` }} />
              <span className="flex-1 truncate text-xs text-stone">{url}</span>
              <button type="button" onClick={() => removeGalleryItem(i)} className="text-xs text-stone hover:text-ink">Remove</button>
            </div>
          ))}
        </div>
        <GalleryUploader onUploaded={addGalleryUrl} />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" name="published" defaultChecked={project?.published} className="rounded-[var(--radius)]" />
        <span className="text-sm text-ink">Published</span>
      </label>

      <div className="flex gap-4">
        <button type="submit" disabled={saving}
          className="bg-brass px-8 py-3 text-sm font-medium text-paper rounded-[var(--radius)] hover:opacity-90 transition-opacity disabled:opacity-50">
          {saving ? "Saving…" : project ? "Update project" : "Create project"}
        </button>
        <button type="button" onClick={() => router.back()}
          className="border border-hair px-8 py-3 text-sm text-ink rounded-[var(--radius)] hover:bg-hair transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

function GalleryUploader({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const { uploadImage } = await import("@/lib/actions/upload");
    const result = await uploadImage(formData);
    setUploading(false);
    if (result.url) onUploaded(result.url);
    e.target.value = "";
  }

  return (
    <label className="mt-3 inline-block cursor-pointer border border-hair px-4 py-2 text-sm text-ink rounded-[var(--radius)] hover:bg-hair transition-colors">
      {uploading ? "Uploading…" : "+ Add gallery image"}
      <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
    </label>
  );
}
