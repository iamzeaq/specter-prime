import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-hair mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <Logo />
          <div className="flex flex-col gap-8 md:flex-row md:gap-16">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone mb-3">Navigate</p>
              <ul className="space-y-2">
                <li><Link href="/projects" className="text-sm text-ink hover:text-stone transition-colors">Projects</Link></li>
                <li><Link href="/contact" className="text-sm text-ink hover:text-stone transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-stone mb-3">Contact</p>
              <p className="text-sm text-ink">Lagos, Nigeria</p>
              <p className="text-sm text-stone mt-1">info@specterprime.ng</p>
            </div>
          </div>
        </div>
        <p className="mt-16 text-[10px] tracking-[0.15em] uppercase text-stone">
          © {new Date().getFullYear()} Specter Prime Construction
        </p>
      </div>
    </footer>
  );
}
