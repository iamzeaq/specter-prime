"use client";

import { useRouter } from "next/navigation";
import { deleteProject } from "@/lib/actions/projects";

type DeleteButtonProps = {
  id: string;
  label: string;
};

export default function DeleteButton({ id, label }: DeleteButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    await deleteProject(id);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-xs text-stone hover:text-red-700 transition-colors"
    >
      Delete
    </button>
  );
}
