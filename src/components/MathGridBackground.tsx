/**
 * Subtle animated coordinate grid — sci-fi / mathematical accent.
 * Use as a decorative layer behind section content (pointer-events-none).
 */
export default function MathGridBackground({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden opacity-40 dark:opacity-25 ${className}`}
      aria-hidden
    >
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="math-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-ocean-500/30"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#math-grid)" />
      </svg>
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-ocean-500/5 to-transparent animate-pulse" />
    </div>
  );
}
