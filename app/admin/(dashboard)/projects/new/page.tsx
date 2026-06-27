import ProjectForm from "@/app/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-3xl text-ink">New project</h1>
      <div className="mt-10">
        <ProjectForm />
      </div>
    </div>
  );
}
