export default function Footer() {
  return (
    <footer className="relative py-8 px-4">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-ocean-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-deep-500 dark:text-deep-300">
        <p className="flex flex-wrap items-center justify-center gap-1">
          <span>© {new Date().getFullYear()} Yifei Gu.</span>
          <span className="hidden sm:inline">Built with</span>
          <span className="sm:hidden">— Built with</span>
          <a href="https://astro.build" target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:text-ocean-400 transition-colors">
            Astro
          </a>
          <span>,</span>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:text-ocean-400 transition-colors">
            React
          </a>
          <span className="hidden sm:inline">&</span>
          <span className="sm:hidden">&</span>
          <a href="https://threejs.org" target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:text-ocean-400 transition-colors">
            Three.js
          </a>
        </p>
        <p className="font-mono text-xs flex items-center gap-1.5">
          <span className="text-ocean-500">{'>'}</span>
          <span className="text-deep-600 dark:text-deep-300">Hosted on GitHub Pages</span>
        </p>
      </div>
    </footer>
  );
}
