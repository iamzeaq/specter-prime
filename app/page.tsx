import Link from "next/link";
import Logo from "./components/Logo";
import { getServices } from "@/lib/actions/services";
import type { Service } from "@/types/database";

const fallbackServices: Pick<Service, "slug" | "title" | "summary" | "image">[] = [
  { slug: "roofing", title: "Roofing", image: "/service-roofing.jpg", summary: "Standing-seam, clay tile, and stone-coated systems built to outlast the weather." },
  { slug: "construction", title: "Construction", image: "/service-construction.jpg", summary: "Ground-up builds and structural work delivered to specification." },
  { slug: "renovation", title: "Renovation", image: "/service-renovation.jpg", summary: "Restoring and elevating existing structures with precision." },
];

export default async function Home() {
  let services = fallbackServices;
  try {
    const data = await getServices();
    if (data.length > 0) services = data;
  } catch {
    // Supabase not configured — use fallback
  }

  return (
    <main className="min-h-screen bg-white text-ink">
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6">
        <Logo />
        <div className="hidden md:flex gap-8 text-sm text-white">
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>

      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center">
        <img src="/hero.jpg" alt="Specter Prime roofing" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 px-8 max-w-4xl">
          <p className="text-xs tracking-[0.35em] text-white/80 mb-6">ROOFING &amp; CONSTRUCTION · LAGOS</p>
          <h1 className="text-6xl md:text-7xl leading-[1.05] mb-8 text-white">
            Built to outlast<span className="text-brass">.</span>
          </h1>
          <p className="text-white/85 max-w-xl mx-auto mb-10 text-lg">
            Specter Prime delivers roofing and construction with the precision and permanence Lagos deserves.
          </p>
          <Link href="/contact" className="inline-block border border-white text-white px-8 py-3 text-sm tracking-wide hover:bg-white hover:text-ink transition">
            Request a quote
          </Link>
        </div>
      </section>

      <section className="px-8 py-24 max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.35em] text-brass mb-3 text-center">WHAT WE DO</p>
        <h2 className="text-4xl mb-16 text-center">Our services</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="block">
              <div className="w-full aspect-[4/3] overflow-hidden mb-5">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl mb-2">{s.title}</h3>
              <p className="text-stone text-sm leading-relaxed">{s.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-8 py-24 border-t border-hair text-center">
        <h2 className="text-4xl mb-6">Let&apos;s build something permanent.</h2>
        <Link href="/contact" className="inline-block border border-ink px-8 py-3 text-sm tracking-wide hover:bg-ink hover:text-white transition">
          Get in touch
        </Link>
      </section>

      <footer className="px-8 py-12 border-t border-hair flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <p className="text-xs text-stone">© {new Date().getFullYear()} Specter Prime Construction Group Ltd · Lagos</p>
      </footer>
    </main>
  );
}
