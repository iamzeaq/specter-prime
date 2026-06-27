import ProjectCard from "@/app/components/ProjectCard";
import ImagePlaceholder from "@/app/components/ImagePlaceholder";
import { getPublishedProjects } from "@/lib/actions/projects";

export const metadata = {
  title: "Projects — Specter Prime",
  description: "Roofing and construction projects across Lagos.",
};

export default async function ProjectsPage() {
  let projects: Awaited<ReturnType<typeof getPublishedProjects>> = [];
  try {
    projects = await getPublishedProjects();
  } catch {
    // Supabase not configured
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
      <p className="text-[10px] tracking-[0.2em] uppercase text-stone">Portfolio</p>
      <h1 className="mt-4 text-5xl text-ink md:text-6xl">Projects</h1>
      <p className="mt-6 max-w-lg text-sm text-stone">
        A selection of roofing, renovation, and waterproofing work completed across Lagos.
      </p>

      {projects.length > 0 ? (
        <div className="mt-20 grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="mt-20 grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <ImagePlaceholder aspect="wide" label={`Project ${i}`} />
              <div className="mt-5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-stone">
                  Category · Location
                </p>
                <h3 className="mt-2 text-2xl text-ink">Project title</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
