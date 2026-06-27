"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/lib/actions/upload";

type ImageUploadProps = {
  name: string;
  label: string;
  currentUrl?: string | null;
  onUploaded?: (url: string) => void;
};

export default function ImageUpload({ name, label, currentUrl, onUploaded }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(currentUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImage(formData);
    setUploading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.url) {
      setUrl(result.url);
      onUploaded?.(result.url);
    }
  }

  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">
        {label}
      </label>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        {url ? (
          <div
            className="h-16 w-24 rounded-[var(--radius)] bg-hair bg-cover bg-center"
            style={{ backgroundImage: `url(${url})` }}
          />
        ) : (
          <div className="h-16 w-24 rounded-[var(--radius)] bg-hair" />
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="border border-hair px-4 py-2 text-sm text-ink rounded-[var(--radius)] hover:bg-hair transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading…" : url ? "Replace" : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
