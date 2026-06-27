export default function Logo() {
    return (
      <div className="leading-none">
        <span className="font-[family-name:var(--font-display)] text-2xl text-ink">Specter</span>
        <span className="text-brass text-2xl">.</span>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-5 h-px bg-brass" />
          <span className="text-[10px] tracking-[0.35em] text-stone font-medium">PRIME</span>
          <span className="w-5 h-px bg-brass" />
        </div>
      </div>
    );
  }