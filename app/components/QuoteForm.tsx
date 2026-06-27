"use client";

import { useActionState } from "react";
import { submitLead } from "@/lib/actions/leads";

const projectTypes = ["Roofing", "Renovation", "Waterproofing", "Other"];

type FormState = { error?: string; success?: boolean } | null;

async function handleSubmit(_prev: FormState, formData: FormData): Promise<FormState> {
  const result = await submitLead({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    project_type: formData.get("project_type") as string,
    message: formData.get("message") as string,
  });

  if (result.error) return { error: result.error };
  return { success: true };
}

export default function QuoteForm() {
  const [state, action, pending] = useActionState(handleSubmit, null);

  if (state?.success) {
    return (
      <div className="border border-hair p-10 rounded-[var(--radius)]">
        <h3 className="text-2xl text-ink">Thank you</h3>
        <p className="mt-4 text-sm text-stone">
          We received your request and will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-8">
      {state?.error && (
        <p className="text-sm text-red-700">{state.error}</p>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone"
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone"
          />
        </div>
        <div>
          <label htmlFor="project_type" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">
            Project type
          </label>
          <select
            id="project_type"
            name="project_type"
            required
            className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone"
          >
            <option value="">Select…</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-brass px-8 py-4 text-sm font-medium tracking-wide text-paper rounded-[var(--radius)] hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? "Sending…" : "Submit request"}
      </button>
    </form>
  );
}
