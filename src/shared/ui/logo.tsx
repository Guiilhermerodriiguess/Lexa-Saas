/**
 * LEXA Logo — SVG Component
 * Balança da Justiça estilizada como letra "A" nas cores da marca
 */
export function LexaIcon({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main "A" Frame (Navy) */}
      <path
        d="M32 8L12 52H20L32 24L44 52H52L32 8Z"
        fill="currentColor"
        className="text-navy dark:text-gold"
      />
      {/* Golden circle at apex */}
      <circle cx="32" cy="10" r="4" fill="hsl(var(--gold))" />
      {/* Left scale pan (Gold) */}
      <ellipse cx="20" cy="48" rx="8" ry="3" fill="none" stroke="hsl(var(--gold))" strokeWidth="2" />
      {/* Right scale pan (Gold) */}
      <ellipse cx="44" cy="48" rx="8" ry="3" fill="none" stroke="hsl(var(--gold))" strokeWidth="2" />
      {/* Crossbar (Gold) */}
      <line x1="20" y1="42" x2="44" y2="42" stroke="hsl(var(--gold))" strokeWidth="2" />
    </svg>
  );
}

/**
 * LEXA Full Logo — Icon + Wordmark
 */
export function LexaLogo({
  showTagline = false,
  className,
}: {
  showTagline?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LexaIcon size={36} />
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tighter text-foreground">
          LEXA<span className="text-[#C5A55A]">§</span>
        </span>
        {showTagline && (
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Tecnologia a Serviço do Direito
          </span>
        )}
      </div>
    </div>
  );
}
