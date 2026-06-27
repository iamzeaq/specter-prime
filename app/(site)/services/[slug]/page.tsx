import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/actions/services";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service — Specter Prime" };
  return {
    title: `${service.title} — Specter Prime`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 lg:px-12 lg:py-32">
      <Link
        href="/"
        className="text-sm text-stone hover:text-ink transition-colors"
      >
        ← Home
      </Link>

      <header className="mt-12">
        <p className="text-[10px] tracking-[0.2em] uppercase text-stone">Service</p>
        <h1 className="mt-4 text-5xl text-ink md:text-6xl">{service.title}</h1>
      </header>

      {service.image && (
        <div className="mt-12 w-full aspect-[16/10] overflow-hidden rounded-[var(--radius)]">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="mt-12 space-y-6 text-base leading-relaxed text-stone whitespace-pre-line">
        {service.body.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <Link
        href="/contact"
        className="mt-16 inline-block border border-brass px-8 py-3 text-sm tracking-wide text-ink rounded-[var(--radius)] hover:bg-hair transition-colors"
      >
        Request a quote
      </Link>
    </article>
  );
}
