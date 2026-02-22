import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

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

export default function AwardsSection() {
    return (
        <section id="awards" className="py-24 px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-deep-100/30 dark:bg-deep-900/30" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-ocean-500/20 to-transparent" />

            <div className="max-w-3xl mx-auto relative">
                <ScrollReveal>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                        <span className="text-ocean-500 font-mono text-lg block mb-2">{'// awards'}</span>
                        Awards & Grants</h2>
                </ScrollReveal>

                <div className="mt-14 relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-ocean-500 via-ocean-500/50 to-transparent" />

                    {awards.map((award, i) => (
                        <ScrollReveal key={i} delay={i * 0.08}>
                            <motion.div
                                whileHover={{ x: 6 }}
                                className="relative pl-16 pb-8 group"
                            >
                                {/* Timeline dot with glow */}
                                <div className={`absolute left-4 top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${award.type === 'grant'
                                    ? 'border-green-500 bg-green-500/20 group-hover:bg-green-500 group-hover:shadow-lg group-hover:shadow-green-500/50'
                                    : award.type === 'special'
                                        ? 'border-purple-500 bg-purple-500/20 group-hover:bg-purple-500 group-hover:shadow-lg group-hover:shadow-purple-500/50'
                                        : 'border-ocean-500 bg-ocean-500/20 group-hover:bg-ocean-500 group-hover:shadow-lg group-hover:shadow-ocean-500/50'
                                    }`} />

                                <div className="glass rounded-xl p-4 hover:border-ocean-500/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-ocean-500/10">
                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                                        <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-ocean-500/10 dark:bg-ocean-500/15 text-ocean-600 dark:text-ocean-400 border border-ocean-500/20">
                                            {award.year}
                                        </span>
                                        {award.type === 'grant' && (
                                            <span className="text-xs px-2.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                                                💰 Grant
                                            </span>
                                        )}
                                        {award.type === 'special' && (
                                            <span className="text-xs px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20">
                                                ❄️ Special
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-deep-800 dark:text-white text-sm mt-2 group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors">
                                        {award.title}
                                    </h3>
                                    <p className="text-xs text-ocean-500 dark:text-ocean-400 mt-1.5 font-medium">{award.org}</p>
                                    <p className="text-xs text-deep-600 dark:text-deep-300 mt-1">{award.detail}</p>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
