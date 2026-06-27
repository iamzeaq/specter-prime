"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { updateService } from "@/lib/actions/services";
import type { Service } from "@/types/database";

type ServiceFormProps = {
  service: Service;
};

export default function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState(service.image);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const result = await updateService(service.id, {
      title: form.get("title") as string,
      summary: form.get("summary") as string,
      body: form.get("body") as string,
      image,
    });

    setSaving(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/admin/services");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && <p className="text-sm text-red-700">{error}</p>}

      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Slug</p>
        <p className="text-sm text-stone">{service.slug}</p>
      </div>

      <div>
        <label htmlFor="title" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Title</label>
        <input id="title" name="title" type="text" required defaultValue={service.title}
          className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone" />
      </div>

      <div>
        <label htmlFor="summary" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Summary</label>
        <textarea id="summary" name="summary" rows={3} required defaultValue={service.summary}
          className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone resize-none" />
      </div>

      <div>
        <label htmlFor="body" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">Body</label>
        <textarea id="body" name="body" rows={12} required defaultValue={service.body}
          className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone resize-none" />
      </div>

      <ImageUpload name="image" label="Image" currentUrl={image} onUploaded={setImage} />

      <div className="flex gap-4">
        <button type="submit" disabled={saving}
          className="bg-brass px-8 py-3 text-sm font-medium text-paper rounded-[var(--radius)] hover:opacity-90 transition-opacity disabled:opacity-50">
          {saving ? "Saving…" : "Save changes"}
        </button>
        <button type="button" onClick={() => router.back()}
          className="border border-hair px-8 py-3 text-sm text-ink rounded-[var(--radius)] hover:bg-hair transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
