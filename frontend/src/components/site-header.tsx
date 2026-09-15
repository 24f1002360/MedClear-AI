export default function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2.5 px-5 py-4 sm:px-8">
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <rect width="22" height="22" rx="4" fill="var(--color-primary)" />
          <path
            d="M11 6.5v9M6.5 11h9"
            stroke="var(--color-surface)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-serif text-lg font-semibold tracking-tight">
          MedClear
        </span>
      </div>
    </header>
  );
}
