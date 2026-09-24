import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import software from '../data/software.json';
import { withBase } from '../utils/base';

// Show only first 6 on homepage
const INITIAL_COUNT = 6;

interface SoftwareSectionProps {
    showAll?: boolean;
}

export default function SoftwareSection({ showAll = false }: SoftwareSectionProps) {
    const [expanded, setExpanded] = useState(showAll);

    const authored = software.filter((s) => !('contributed' in s && s.contributed));
    const contributed = software.filter((s) => 'contributed' in s && s.contributed);

    const displayedAuthored = expanded ? authored : authored.slice(0, INITIAL_COUNT);
    const hasMore = authored.length > INITIAL_COUNT;

    return (
        <section id="software" className="py-20 px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-deep-100/30 dark:bg-deep-900/30" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-ocean-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-50 h-50 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                <ScrollReveal>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                        <span className="text-ocean-500 font-mono text-lg block mb-2">{'// software'}</span>
                        Scientific Software
                    </h2>
                    <p className="text-center text-deep-600 dark:text-deep-300 max-w-2xl mx-auto mt-4">
                        Open-source tools built for the research community — designed with usability in mind.
                    </p>
                </ScrollReveal>

                {/* Published Software */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    {displayedAuthored.map((sw, i) => (
                        <ScrollReveal key={sw.slug} delay={i * 0.05}>
                            <motion.a
                                href={withBase(`/software/${sw.slug}`)}
                                whileHover={{ y: -6 }}
                                className="group relative glass rounded-xl p-5 block h-full cursor-pointer"
                            >
                                {/* Hover glow effect */}
                                <div className="absolute inset-0 rounded-xl bg-ocean-500/5 dark:bg-ocean-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute -inset-px rounded-xl bg-linear-to-r from-ocean-500/0 via-ocean-500/10 to-ocean-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-ocean-500/20 to-ocean-600/10 flex items-center justify-center text-ocean-500 font-mono font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                                            {'</>'}
                                        </div>
                                        <h3 className="font-bold text-deep-800 dark:text-white group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors">
                                            {sw.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-deep-600 dark:text-deep-300 leading-relaxed mb-4 line-clamp-3">
                                        {sw.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {sw.tags.map((tag) => (
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
                                        {sw.paper && (
                                            <span className="flex items-center gap-1 text-ocean-500">
                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                                                </svg>
                                                Paper
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.a>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Show More button */}
                {hasMore && !showAll && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="inline-flex items-center gap-2 px-5 py-2 text-sm text-ocean-500 hover:text-ocean-600 dark:hover:text-ocean-400 font-medium transition-colors"
                        >
                            {expanded ? 'Show Less' : `Show More (${authored.length - INITIAL_COUNT} more)`}
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

                {/* Link to full software page */}
                <div className="text-center mt-4">
                    <a
                        href={withBase('/software')}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs text-deep-500 dark:text-deep-400 hover:text-ocean-500 transition-colors"
                    >
                        View all software
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                {/* Contributed Software - show on homepage only if expanded */}
                {contributed.length > 0 && expanded && (
                    <>
                        <ScrollReveal>
                            <h3 className="text-xl font-bold text-center mt-12 mb-6 text-deep-600 dark:text-deep-300">
                                Contributed Software <span className="text-sm font-normal text-deep-400">(bug fix & optimization)</span>
                            </h3>
                        </ScrollReveal>
                        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                            {contributed.map((sw, i) => (
                                <ScrollReveal key={sw.slug} delay={i * 0.05}>
                                    <motion.a
                                        href={withBase(`/software/${sw.slug}`)}
                                        whileHover={{ y: -3 }}
                                        className="group glass rounded-xl p-4 flex items-start gap-3"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-deep-200 to-deep-300 dark:from-deep-700 dark:to-deep-600 flex items-center justify-center text-deep-400 dark:text-deep-500 font-mono text-xs shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                            {'{ }'}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-deep-700 dark:text-deep-200 group-hover:text-ocean-500 transition-colors">
                                                {sw.name}
                                            </h4>
                                            <p className="text-xs text-deep-600 dark:text-deep-300 mt-1.5">
                                                {sw.description}
                                            </p>
                                        </div>
                                    </motion.a>
                                </ScrollReveal>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
