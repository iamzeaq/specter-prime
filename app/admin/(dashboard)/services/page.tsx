import Link from "next/link";
import { getAllServices } from "@/lib/actions/services";

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <div>
      <h1 className="text-3xl text-ink">Services</h1>
      <p className="mt-2 text-sm text-stone">Edit the three core services shown on the homepage.</p>

      {services.length === 0 ? (
        <p className="mt-12 text-sm text-stone">
          No services found. Run <code className="text-ink">supabase/services.sql</code> to seed the table.
        </p>
      ) : (
        <table className="mt-12 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-hair text-[10px] tracking-[0.2em] uppercase text-stone">
              <th className="pb-4 font-medium">Title</th>
              <th className="pb-4 font-medium">Slug</th>
              <th className="pb-4 font-medium">Order</th>
              <th className="pb-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-hair">
                <td className="py-4 text-ink">{service.title}</td>
                <td className="py-4 text-stone">{service.slug}</td>
                <td className="py-4 text-stone">{service.sort_order}</td>
                <td className="py-4 text-right">
                  <Link href={`/admin/services/${service.id}/edit`} className="text-xs text-stone hover:text-ink">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
