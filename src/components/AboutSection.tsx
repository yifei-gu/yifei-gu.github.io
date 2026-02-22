import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';

const highlights = [
    { icon: '🎓', label: 'Ph.D.', detail: 'AI for Marine Science, HKU', gradient: 'from-blue-500 to-cyan-500' },
    { icon: '🔬', label: '7+', detail: 'Publications in Q1 Journals', gradient: 'from-purple-500 to-pink-500' },
    { icon: '💻', label: '8+', detail: 'Open-source Scientific Tools', gradient: 'from-green-500 to-emerald-500' },
    { icon: '🏆', label: '6×', detail: 'Conference Awards', gradient: 'from-orange-500 to-amber-500' },
];

export default function AboutSection() {
    return (
        <section id="about" className="py-24 px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-ocean-500/5 dark:bg-ocean-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ocean-500/5 dark:bg-ocean-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                <ScrollReveal>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                        <span className="text-ocean-500 font-mono text-lg block mb-2">{'// about'}</span>
                        About Me
                    </h2>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
                    <ScrollReveal direction="left">
                        <div className="space-y-5 text-deep-600 dark:text-deep-300 leading-relaxed">
                            <p>
                                I'm a <strong className="text-deep-800 dark:text-white">Post-doctoral Fellow</strong> at the
                                Department of Earth and Planetary Sciences, <strong className="text-deep-800 dark:text-white">The University of Hong Kong</strong>.
                                My research sits at the intersection of <span className="text-ocean-600 dark:text-ocean-400 font-medium">ecology</span>,
                                <span className="text-ocean-600 dark:text-ocean-400 font-medium"> artificial intelligence</span>, and
                                <span className="text-ocean-600 dark:text-ocean-400 font-medium"> geospatial science</span>.
                            </p>
                            <p>
                                What sets me apart from my ecologist colleagues is my ability to translate complex scientific
                                problems into <strong className="text-deep-800 dark:text-white">user-friendly software solutions</strong>.
                                From 3D habitat analysis to automated species detection, I build tools that make advanced
                                computational methods accessible to the broader research community.
                            </p>
                            <p>
                                My work spans from the rocky shores of Hong Kong to global sea-level databases, always
                                with the goal of making ecological research more efficient, reproducible, and impactful
                                through technology.
                            </p>

                            {/* Terminal-style education */}
                            <div className="mt-6 p-4 rounded-xl bg-deep-900 dark:bg-deep-900 border border-deep-700/50 font-mono text-sm shadow-xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                    </span>
                                    <span className="text-deep-500 text-xs ml-2">education.sh</span>
                                </div>
                                <div className="text-deep-300 space-y-1.5">
                                    <p><span className="text-ocean-400">$</span> cat education.log</p>
                                    <p className="text-deep-400/80">2020-2025 │ Ph.D., AI for Marine Science — HKU</p>
                                    <p className="text-deep-400/80">2018-2019 │ M.S., Environmental Management — HKU</p>
                                    <p className="text-deep-400/80">2014-2018 │ B.S., Aquatic Eco Technology — HZ, NL</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="right">
                        <div className="grid grid-cols-2 gap-4">
                            {highlights.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    className="group relative glass rounded-xl p-6 text-center overflow-hidden"
                                >
                                    {/* Gradient border effect */}
                                    <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />
                                    <div className="absolute inset-0 border border-transparent group-hover:border-ocean-500/30 rounded-xl transition-colors duration-300" />

                                    <div className="relative z-10">
                                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                        <div className="text-3xl font-bold text-deep-800 dark:text-white">{item.label}</div>
                                        <div className="text-sm text-deep-600 dark:text-deep-300 mt-1.5">{item.detail}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
