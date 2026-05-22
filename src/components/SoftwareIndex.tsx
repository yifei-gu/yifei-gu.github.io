import { useState, useMemo } from 'react';

interface SoftwareItem {
  id: string;
  data: {
    name: string;
    description: string;
    tags: string[];
    github: string;
    paper: boolean;
    contributed: boolean;
  };
}

interface SoftwareIndexProps {
  software: SoftwareItem[];
  allTags: string[];
}

export default function SoftwareIndex({ software, allTags }: SoftwareIndexProps) {
  const [filterTag, setFilterTag] = useState<string | null>(null);
  
  const filteredSoftware = useMemo(() => {
    if (!filterTag) return software;
    return software.filter((sw) => sw.data.tags.includes(filterTag));
  }, [filterTag, software]);
  
  const authored = filteredSoftware.filter((sw) => !sw.data.contributed);
  const contributed = filteredSoftware.filter((sw) => sw.data.contributed);
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="text-ocean-500 font-mono text-lg block mb-2">{'// software'}</span>
          Scientific Software
        </h1>
        <p className="text-deep-600 dark:text-deep-300 max-w-2xl mx-auto mt-4">
          Open-source tools built for the research community — designed with usability in mind.
          Click on any tool to learn more, read documentation, and access related publications.
        </p>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => setFilterTag(null)}
          className={`text-xs px-4 py-2 rounded-full border transition-all ${!filterTag 
            ? 'bg-ocean-500 text-white border-ocean-500' 
            : 'border-deep-300 dark:border-deep-600 text-deep-500 dark:text-deep-400 hover:border-ocean-500 hover:text-ocean-500'
          }`}
        >
          All ({software.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag === filterTag ? null : tag)}
            className={`text-xs px-4 py-2 rounded-full border transition-all ${filterTag === tag 
              ? 'bg-ocean-500 text-white border-ocean-500' 
              : 'border-deep-300 dark:border-deep-600 text-deep-500 dark:text-deep-400 hover:border-ocean-500 hover:text-ocean-500'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Authored Software */}
      {authored.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-deep-700 dark:text-deep-200 mb-6">
            Authored Software
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {authored.map((sw) => (
              <a
                key={sw.id}
                href={`/software/${sw.id}`}
                className="group relative glass rounded-xl p-5 block h-full hover:border-ocean-500/40 transition-all"
              >
                <div className="absolute inset-0 rounded-xl bg-ocean-500/5 dark:bg-ocean-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-ocean-500/20 to-ocean-600/10 flex items-center justify-center text-ocean-500 font-mono font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                      {'</>'}
                    </div>
                    <h3 className="font-bold text-deep-800 dark:text-white group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors">
                      {sw.data.name}
                    </h3>
                  </div>
                  <p className="text-sm text-deep-600 dark:text-deep-300 leading-relaxed mb-4 line-clamp-3">
                    {sw.data.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {sw.data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-ocean-500/10 dark:bg-ocean-500/15 text-ocean-600 dark:text-ocean-400 border border-ocean-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-deep-500 dark:text-deep-400 pt-3 border-t border-deep-200/50 dark:border-deep-700/50">
                    <span className="flex items-center gap-1.5 group-hover:text-ocean-500 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </span>
                    {sw.data.paper && (
                      <span className="flex items-center gap-1 text-ocean-500">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                        </svg>
                        Paper
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      {/* Contributed Software */}
      {contributed.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-deep-700 dark:text-deep-200 mb-6">
            Contributed Software <span className="text-sm font-normal text-deep-400">(bug fix & optimization)</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {contributed.map((sw) => (
              <a
                key={sw.id}
                href={`/software/${sw.id}`}
                className="group glass rounded-xl p-4 flex items-start gap-3 hover:border-ocean-500/40 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-deep-200 to-deep-300 dark:from-deep-700 dark:to-deep-600 flex items-center justify-center text-deep-400 dark:text-deep-500 font-mono text-xs shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  {'{ }'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-deep-700 dark:text-deep-200 group-hover:text-ocean-500 transition-colors">
                    {sw.data.name}
                  </h3>
                  <p className="text-xs text-deep-600 dark:text-deep-300 mt-1 line-clamp-2">
                    {sw.data.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {sw.data.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-deep-200 dark:bg-deep-700 text-deep-600 dark:text-deep-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
      
      {filteredSoftware.length === 0 && (
        <div className="text-center py-12 text-deep-500 dark:text-deep-400">
          No software found with this filter.
        </div>
      )}
    </div>
  );
}
