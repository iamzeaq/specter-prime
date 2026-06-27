import Link from "next/link";
import { notFound } from "next/navigation";
import ImagePlaceholder from "@/app/components/ImagePlaceholder";
import { getProjectBySlug } from "@/lib/actions/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project — Specter Prime" };
  return {
    title: `${project.title} — Specter Prime`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const gallery = project.gallery ?? [];

  return (
    <article>
      {/* Cover */}
      {project.cover_image ? (
        <img
          src={project.cover_image}
          alt={project.title}
          className="aspect-[21/9] w-full object-cover"
        />
      ) : (
        <ImagePlaceholder aspect="hero" label="Cover" className="w-full rounded-none" />
      )}

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <Link
          href="/projects"
          className="text-sm text-stone hover:text-ink transition-colors"
        >
          ← All projects
        </Link>

        <div className="mt-12 max-w-3xl">
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone">
            {project.category} · {project.location}
          </p>
          <h1 className="mt-4 text-5xl text-ink md:text-6xl">{project.title}</h1>
          <p className="mt-8 text-base leading-relaxed text-stone whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Gallery */}
        {gallery.length > 0 ? (
          <div className="mt-24 grid gap-6 md:grid-cols-2">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${project.title} — ${i + 1}`}
                className="aspect-[16/10] w-full rounded-[var(--radius)] object-cover"
              />
            ))}
          </div>
        ) : (
          <div className="mt-24 grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <ImagePlaceholder key={i} aspect="wide" label={`Gallery ${i}`} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
