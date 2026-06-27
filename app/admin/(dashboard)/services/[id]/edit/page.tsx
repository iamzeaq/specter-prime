import { notFound } from "next/navigation";
import ServiceForm from "@/app/components/admin/ServiceForm";
import { getServiceById } from "@/lib/actions/services";

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();

  return (
    <div>
      <h1 className="text-3xl text-ink">Edit service</h1>
      <div className="mt-10">
        <ServiceForm service={service} />
      </div>
    </div>
  );
}
