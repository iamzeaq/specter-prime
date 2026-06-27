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
            <p className="text-sm text-ink">Lagos, Nigeria</p>
            <p className="text-sm text-stone">info@specterprime.ng</p>
            <p className="text-sm text-stone">+234 800 000 0000</p>
          </div>
        </div>
        <QuoteForm />
      </div>
    </div>
  );
}
