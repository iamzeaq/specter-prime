"use client";

import { useActionState } from "react";
import { signIn } from "@/lib/actions/auth";

type FormState = { error?: string } | null;

async function handleLogin(_prev: FormState, formData: FormData): Promise<FormState> {
  const result = await signIn(formData);
  if (result?.error) return { error: result.error };
  return null;
}

export default function LoginPage() {
  const [state, action, pending] = useActionState(handleLogin, null);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl text-ink">Admin</h1>
        <p className="mt-2 text-sm text-stone">Sign in to manage content</p>

        <form action={action} className="mt-10 space-y-6">
          {state?.error && (
            <p className="text-sm text-red-700">{state.error}</p>
          )}

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

          <div>
            <label htmlFor="password" className="block text-[10px] tracking-[0.2em] uppercase text-stone mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full border border-hair bg-paper px-4 py-3 text-sm text-ink rounded-[var(--radius)] focus:outline-none focus:border-stone"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-brass px-8 py-3 text-sm font-medium text-paper rounded-[var(--radius)] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
