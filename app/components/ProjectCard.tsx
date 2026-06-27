import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";
import type { Project } from "@/types/database";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      {project.cover_image ? (
        <img
          src={project.cover_image}
          alt={project.title}
          className="aspect-[16/10] w-full rounded-[var(--radius)] object-cover"
        />
      ) : (
        <ImagePlaceholder aspect="wide" label={project.category || "Project"} />
      )}
      <div className="mt-5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-stone">
          {project.category} · {project.location}
        </p>
        <h3 className="mt-2 text-2xl text-ink group-hover:text-stone transition-colors">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
