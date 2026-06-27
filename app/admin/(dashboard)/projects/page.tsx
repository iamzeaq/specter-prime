import Link from "next/link";
import { getAllProjects } from "@/lib/actions/projects";
import DeleteProjectButton from "@/app/components/admin/DeleteProjectButton";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-ink">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-brass px-6 py-2 text-sm font-medium text-paper rounded-[var(--radius)] hover:opacity-90 transition-opacity"
        >
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="mt-12 text-sm text-stone">No projects yet.</p>
      ) : (
        <table className="mt-12 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-hair text-[10px] tracking-[0.2em] uppercase text-stone">
              <th className="pb-4 font-medium">Title</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-hair">
                <td className="py-4 text-ink">{project.title}</td>
                <td className="py-4 text-stone">{project.category}</td>
                <td className="py-4 text-stone">
                  {project.published ? "Published" : "Draft"}
                </td>
                <td className="py-4 text-right space-x-4">
                  <Link href={`/admin/projects/${project.id}/edit`} className="text-xs text-stone hover:text-ink">
                    Edit
                  </Link>
                  <DeleteProjectButton id={project.id} label={project.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
