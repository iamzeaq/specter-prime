import QuoteForm from "@/app/components/QuoteForm";

export const metadata = {
  title: "Contact — Specter Prime",
  description: "Request a quote for roofing and construction in Lagos.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
      <div className="grid gap-20 lg:grid-cols-2">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone">Contact</p>
          <h1 className="mt-4 text-5xl text-ink md:text-6xl">Request a quote</h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-stone">
            Describe your project and we will follow up with a detailed estimate.
            All inquiries are handled directly by our team in Lagos.
          </p>
          <div className="mt-12 space-y-4">
            <p className="text-sm text-ink">Head Office, KM 40 Lekki-Epe Expressway, Lagos</p>
            <p className="text-sm text-stone">
              <a href="mailto:specterprimeconstructiongroup@gmail.com" className="hover:text-brass transition">
                specterprimeconstructiongroup@gmail.com
              </a>
            </p>
            <p className="text-sm text-stone">
              <a href="tel:+2348030796001" className="hover:text-brass transition">
                0803 079 6001
              </a>
            </p>
            <p className="text-sm text-stone">
              <a href="https://wa.me/2348030796001" target="_blank" rel="noopener noreferrer" className="hover:text-brass transition">
                WhatsApp · 0803 079 6001
              </a>
            </p>
          </div>
        </div>
        <QuoteForm />
      </div>
    </div>
  );
}