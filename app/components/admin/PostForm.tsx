"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { createPost, updatePost } from "@/lib/actions/posts";
import { slugify } from "@/lib/utils";
import type { Post } from "@/types/database";

type PostFormProps = {
  post?: Post;
};

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [coverImage, setCoverImage] = useState(post?.cover_image ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const title = form.get("title") as string;
    const data = {
      title,
      slug: (form.get("slug") as string) || slugify(title),
      content: form.get("content") as string,
      cover_image: coverImage || null,
      published: form.get("published") === "on",
    };

    const result = post
      ? await updatePost(post.id, data)
      : await createPost(data);

    setSaving(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && <p className="text-sm text-red-700">{error}</p>}

      <div>
        <label htmlFor="title" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Title</label>
        <input id="title" name="title" type="text" required defaultValue={post?.title}
          className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone" />
      </div>

      <div>
        <label htmlFor="slug" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Slug</label>
        <input id="slug" name="slug" type="text" defaultValue={post?.slug}
          placeholder="auto-generated from title"
          className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone" />
      </div>

      <div>
        <label htmlFor="content" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Content</label>
        <textarea id="content" name="content" rows={12} required defaultValue={post?.content}
          className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone resize-none" />
      </div>

      <ImageUpload name="cover_image" label="Cover image" currentUrl={coverImage} onUploaded={setCoverImage} />

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" name="published" defaultChecked={post?.published} className="rounded-[var(--radius)]" />
        <span className="text-sm text-ink">Published</span>
      </label>

      <div className="flex gap-4">
        <button type="submit" disabled={saving}
          className="bg-brass px-8 py-3 text-sm font-medium text-paper rounded-[var(--radius)] hover:opacity-90 transition-opacity disabled:opacity-50">
          {saving ? "Saving…" : post ? "Update post" : "Create post"}
        </button>
        <button type="button" onClick={() => router.back()}
          className="border border-hair px-8 py-3 text-sm text-ink rounded-[var(--radius)] hover:bg-hair transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
