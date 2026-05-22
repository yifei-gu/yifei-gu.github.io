/**
 * Horizontal marquee of math/science symbols — lightweight sci-fi accent.
 */
const SYMBOLS =
  '∫ ∑ ∂ ∇ λ μ σ ρ θ α β γ δ ε ζ η κ ν π φ ψ ω Δ Σ Ω ℝ ℂ ∝ ≈ ≠ ≤ ≥ ± × ÷ √ ∞';

export default function FormulaTicker() {
  const track = `${SYMBOLS}    ${SYMBOLS}    `;

  return (
    <div
      className="mt-12 overflow-hidden border-y border-ocean-500/15 py-2"
      aria-hidden
    >
      <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite] font-mono text-sm text-ocean-600/50 dark:text-ocean-400/40">
        <span className="px-4">{track}</span>
        <span className="px-4">{track}</span>
      </div>
    </div>
  );
}
