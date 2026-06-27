import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="border-b border-hair">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-12">
        <Link href="/" aria-label="Specter Prime home">
          <Logo />
        </Link>
        <ul className="flex items-center gap-10">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-stone hover:text-ink transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
