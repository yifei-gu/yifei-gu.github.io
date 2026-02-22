import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const researchAreas = [
    {
        icon: '🧠',
        title: 'AI & Computer Vision',
        description: 'Deep learning for ecological image analysis — from mussel bed segmentation to holothurian detection in turbid waters.',
        tools: ['PyTorch', 'YOLOv8', 'CNNs', 'Semantic Segmentation'],
    },
    {
        icon: '🌊',
        title: 'Marine Ecology',
        description: 'Understanding rocky shore ecosystems, intertidal habitats, and marine biodiversity through data-driven approaches.',
        tools: ['Field Surveys', 'GIS', 'Species Monitoring', 'Conservation'],
    },
    {
        icon: '📐',
        title: '3D Habitat Analysis',
        description: 'Quantifying structural complexity of habitats using 3D point clouds and photogrammetry.',
        tools: ['HSC3D', 'Point Clouds', 'Photogrammetry', 'Python'],
    },
    {
        icon: '🗺️',
        title: 'Geospatial Science',
        description: 'Building interactive GIS databases and data infrastructure for marine and paleo-environmental research.',
        tools: ['WebGIS', 'HOLSEA', 'HKRISE', 'Remote Sensing'],
    },
    {
        icon: '🌍',
        title: 'Sea-Level Science',
        description: 'Global data infrastructure for Holocene sea-level records, supporting paleo-environmental reconstruction.',
        tools: ['PaleoSTeHM', 'BTFr', 'Bayesian Modeling', 'Data Curation'],
    },
    {
        icon: '🔧',
        title: 'Research Software',
        description: 'Developing user-friendly, open-source tools that make advanced methods accessible to ecologists worldwide.',
        tools: ['Python', 'UI/UX', 'Open Source', 'Reproducibility'],
    },
];

export default function ResearchSection() {
    return (
        <section id="research" className="py-24 px-4 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-deep-100/30 dark:bg-deep-900/30" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-ocean-500/20 to-transparent" />

            <div className="max-w-6xl mx-auto relative">
                <ScrollReveal>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                        <span className="text-ocean-500 font-mono text-lg block mb-2">{'// research'}</span>
                        Research Areas
                    </h2>
                    <p className="text-center text-deep-600 dark:text-deep-300 max-w-2xl mx-auto mt-4">
                        My work connects ecological questions with computational solutions — building bridges
                        between field science and artificial intelligence.
                    </p>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {researchAreas.map((area, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <motion.div
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                className="group relative glass rounded-xl p-6 h-full cursor-default"
                            >
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 rounded-xl bg-ocean-500/5 dark:bg-ocean-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute -inset-px rounded-xl bg-linear-to-r from-ocean-500/0 via-ocean-500/10 to-ocean-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

                                <div className="relative z-10">
                                    <div className="text-4xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">{area.icon}</div>
                                    <h3 className="text-xl font-bold text-deep-800 dark:text-white mb-3 group-hover:text-ocean-600 dark:group-hover:text-ocean-400 transition-colors">{area.title}</h3>
                                    <p className="text-deep-600 dark:text-deep-200 text-sm leading-relaxed mb-4">
                                        {area.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {area.tools.map((tool) => (
                                            <span
                                                key={tool}
                                                className="text-xs px-2.5 py-1 rounded-full bg-ocean-500/10 dark:bg-ocean-500/20 text-ocean-600 dark:text-ocean-300 border border-ocean-500/20 dark:border-ocean-500/30 group-hover:border-ocean-500/40 transition-colors"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
