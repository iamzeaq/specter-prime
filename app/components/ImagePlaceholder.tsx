type ImagePlaceholderProps = {
  label?: string;
  className?: string;
  aspect?: "hero" | "wide" | "square" | "portrait";
};

const aspectClasses = {
  hero: "aspect-[21/9]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
};

export default function ImagePlaceholder({
  label = "Image",
  className = "",
  aspect = "wide",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`bg-hair rounded-[var(--radius)] flex items-end p-6 ${aspectClasses[aspect]} ${className}`}
      aria-hidden
    >
      <span className="text-[10px] tracking-[0.2em] uppercase text-stone">{label}</span>
    </div>
  );
}
