import { notFound } from "next/navigation";
import ProjectForm from "@/app/components/admin/ProjectForm";
import { getProjectById } from "@/lib/actions/projects";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div>
      <h1 className="text-3xl text-ink">Edit project</h1>
      <div className="mt-10">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
