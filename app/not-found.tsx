import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-32 text-center lg:px-12">
      <h1 className="text-5xl text-ink">404</h1>
      <p className="mt-4 text-sm text-stone">Page not found.</p>
      <Link href="/" className="mt-8 inline-block text-sm text-stone hover:text-ink transition-colors">
        ← Back home
      </Link>
    </div>
  );
}
