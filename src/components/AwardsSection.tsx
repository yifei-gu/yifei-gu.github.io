import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { withBase } from '../utils/base';

const awards = [
    {
        year: '2026',
        title: 'Environment and Conservation Fund (Co-PI)',
        org: 'Hong Kong Government',
        detail: 'Applying Wildlife Forensic Methods to Understand the Illegal Seahorse Trade (HKD 365,000)',
        type: 'grant',
    },
    {
        year: '2025',
        title: '1st Prize — Oral Presentation',
        org: 'ITRS & Marine Biological Association of the UK',
        detail: 'International Temperate Reef Symposium',
        type: 'award',
    },
    {
        year: '2024',
        title: '2nd Prize — Oral Presentation',
        org: '16th UCAS',
        detail: 'University Consortium on Aquatic Sciences',
        type: 'award',
    },
    {
        year: '2024',
        title: '2nd Prize — Oral Presentation',
        org: '3rd Annual EBRS, HKU',
        detail: 'Ecology & Biodiversity Research Symposium',
        type: 'award',
    },
    {
        year: '2022',
        title: '2nd Prize — Oral Presentation',
        org: 'GDUT Conference',
        detail: 'Guangdong University of Technology',
        type: 'award',
    },
    {
        year: '2022',
        title: '1st Prize — Oral Presentation',
        org: '2nd BECoME & HKMEA',
        detail: 'Biodiversity, Ecology, and Conservation of Marine Ecosystems',
        type: 'award',
    },
    {
        year: '2020',
        title: 'Arctic Code Vault Contributor',
        org: 'GitHub',
        detail: 'Selected to preserve coding projects for future generations in the Arctic World Archive',
        type: 'special',
    },
];

// Show only first 4 on homepage, all on dedicated page
const INITIAL_COUNT = 4;

interface AwardsSectionProps {
    showAll?: boolean;
}

export default function AwardsSection({ showAll = false }: AwardsSectionProps) {
    const displayed = showAll ? awards : awards.slice(0, INITIAL_COUNT);
    const hasMore = awards.length > INITIAL_COUNT;

    return (
        <section id="awards" className="py-20 px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-deep-100/30 dark:bg-deep-900/30" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-ocean-500/20 to-transparent" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-ocean-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-50 h-50 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative">
                <ScrollReveal>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                        <span className="text-ocean-500 font-mono text-lg block mb-2">{'// awards'}</span>
                        Awards & Grants
                    </h2>
                    <p className="text-center text-deep-600 dark:text-deep-300 max-w-lg mx-auto mt-2 text-sm">
                        Recognition and funding for research excellence
                    </p>
                </ScrollReveal>

                {/* Awards grid - compact layout */}
                <div className="grid sm:grid-cols-2 gap-3 mt-10">
                    {displayed.map((award, i) => (
                        <ScrollReveal key={i} delay={i * 0.05}>
                            <motion.div
                                whileHover={{ y: -2 }}
                                className="group glass rounded-lg p-4 hover:border-ocean-500/40 transition-all duration-200"
                            >
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-ocean-500/10 text-ocean-600 dark:text-ocean-400 border border-ocean-500/20">
                                        {award.year}
                                    </span>
                                    {award.type === 'grant' && (
                                        <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                                            Grant
                                        </span>
                                    )}
                                    {award.type === 'special' && (
                                        <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20">
                                            Special
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-semibold text-deep-800 dark:text-white text-sm group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors line-clamp-2">
                                    {award.title}
                                </h3>
                                <p className="text-xs text-ocean-500 dark:text-ocean-400 mt-1">{award.org}</p>
                                <p className="text-xs text-deep-500 dark:text-deep-400 mt-1.5 leading-relaxed line-clamp-2">
                                    {award.detail}
                                </p>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Link to full awards page */}
                {hasMore && (
                    <div className="text-center mt-6">
                        <a
                            href={withBase('/awards')}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs text-deep-500 dark:text-deep-400 hover:text-ocean-500 transition-colors"
                        >
                            View all ({awards.length} total)
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
