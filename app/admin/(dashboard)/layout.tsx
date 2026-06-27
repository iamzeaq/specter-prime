import Link from "next/link";
import { signOut } from "@/lib/actions/auth";

const navItems = [
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/posts", label: "Posts" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-hair">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-sm font-medium text-ink">
              Admin
            </Link>
            <nav className="flex gap-6">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-stone hover:text-ink transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-stone hover:text-ink transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
    </div>
  );
}
