import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import publications from '../data/publications.json';

const allTags = Array.from(new Set(publications.flatMap((p) => p.tags)));

// Show only first 5 publications on homepage, with link to full page
const INITIAL_COUNT = 5;

interface PublicationsSectionProps {
    showAll?: boolean;
}

export default function PublicationsSection({ showAll = false }: PublicationsSectionProps) {
    const [filter, setFilter] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(showAll);

    const filtered = filter
        ? publications.filter((p) => p.tags.includes(filter))
        : publications;

    const displayed = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
    const hasMore = filtered.length > INITIAL_COUNT;

    return (
        <section id="publications" className="py-20 px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-20 right-0 w-80 h-80 bg-ocean-500/3 dark:bg-ocean-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-0 w-60 h-60 bg-purple-500/3 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative">
                <ScrollReveal>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                        <span className="text-ocean-500 font-mono text-lg block mb-2">{'// publications'}</span>
                        Publications
                    </h2>
                </ScrollReveal>

                {/* Filter tags */}
                <ScrollReveal delay={0.1}>
                    <div className="flex flex-wrap gap-2 justify-center mt-6 mb-8">
                        <button
                            onClick={() => { setFilter(null); if (!showAll) setExpanded(false); }}
                            className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${!filter
                                ? 'bg-ocean-500 text-white border-ocean-500 shadow-lg shadow-ocean-500/25'
                                : 'border-deep-300 dark:border-deep-600 text-deep-500 dark:text-deep-400 hover:border-ocean-500 hover:text-ocean-500'
                                }`}
                        >
                            All ({publications.length})
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => { setFilter(tag === filter ? null : tag); if (!showAll) setExpanded(false); }}
                                className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${filter === tag
                                    ? 'bg-ocean-500 text-white border-ocean-500 shadow-lg shadow-ocean-500/25'
                                    : 'border-deep-300 dark:border-deep-600 text-deep-500 dark:text-deep-400 hover:border-ocean-500 hover:text-ocean-500'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Publication list - compact layout */}
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {displayed.map((pub, i) => (
                            <motion.div
                                key={pub.title}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, delay: i * 0.03 }}
                                className="group relative glass rounded-lg p-4 hover:border-ocean-500/40 transition-all duration-200"
                            >
                                {/* Left accent bar */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-linear-to-b from-ocean-500 to-ocean-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <a
                                            href={`https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-deep-800 dark:text-white group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors text-sm leading-snug hover:underline underline-offset-2 decoration-ocean-500/40 line-clamp-2"
                                        >
                                            {pub.title}
                                        </a>
                                        <p className="text-xs text-deep-600 dark:text-deep-300 mt-1.5 line-clamp-1">
                                            {pub.authors}
                                        </p>
                                        <p className="text-xs text-deep-500 dark:text-deep-400 mt-0.5">
                                            <em>{pub.journal}</em> ({pub.year})
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${pub.badge.includes('Preprint')
                                                ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20'
                                                : 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                                                }`}
                                        >
                                            {pub.badge}
                                        </span>
                                    </div>
                                </div>
                                {'corresponding' in pub && pub.corresponding && (
                                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-ocean-500/10 text-ocean-600 dark:text-ocean-400 border border-ocean-500/20">
                                        ✦ Corresponding Author
                                    </span>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show More / View All button */}
                {hasMore && !showAll && (
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="inline-flex items-center gap-2 px-5 py-2 text-sm text-ocean-500 hover:text-ocean-600 dark:hover:text-ocean-400 font-medium transition-colors"
                        >
                            {expanded ? 'Show Less' : `Show More (${filtered.length - INITIAL_COUNT} more)`}
                            <svg
                                className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Link to full publications page */}
                <div className="text-center mt-4">
                    <a
                        href="/publications"
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs text-deep-500 dark:text-deep-400 hover:text-ocean-500 transition-colors"
                    >
                        View all publications
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
