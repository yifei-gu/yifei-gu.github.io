import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const roles = [
    'Ecologist who codes',
    'AI × Marine Science',
    'Scientific Software Developer',
    'Post-doctoral Fellow @ HKU',
];

function TypingText() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState('');
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = roles[roleIndex];
        const timeout = setTimeout(
            () => {
                if (!deleting) {
                    setText(current.slice(0, text.length + 1));
                    if (text.length + 1 === current.length) {
                        setTimeout(() => setDeleting(true), 2000);
                    }
                } else {
                    setText(current.slice(0, text.length - 1));
                    if (text.length === 0) {
                        setDeleting(false);
                        setRoleIndex((prev) => (prev + 1) % roles.length);
                    }
                }
            },
            deleting ? 40 : 80
        );
        return () => clearTimeout(timeout);
    }, [text, deleting, roleIndex]);

    return (
        <span className="font-mono text-ocean-400">
            {text}
            <span className="cursor-blink text-ocean-300">|</span>
        </span>
    );
}

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-deep-50/50 dark:to-deep-950/50 pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Terminal-style greeting */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-ocean-500/10 dark:bg-ocean-500/15 border border-ocean-500/20 dark:border-ocean-500/30"
                    >
                        <span className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                        </span>
                        <span className="text-sm font-mono text-ocean-500 dark:text-ocean-400 ml-2">
                            <span className="text-ocean-600 dark:text-ocean-500">$</span> whoami
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
                    >
                        <span className="text-deep-800 dark:text-white">Yifei </span>
                        <span className="gradient-text-light dark:gradient-text">Gu</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="text-xl sm:text-2xl mb-8 h-10"
                    >
                        <TypingText />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="text-lg text-deep-600 dark:text-deep-300 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Bridging ecology and technology — I build{' '}
                        <span className="text-ocean-600 dark:text-ocean-400 font-medium">AI-powered tools</span> and{' '}
                        <span className="text-ocean-600 dark:text-ocean-400 font-medium">scientific software</span> that help
                        researchers understand complex ecological patterns across scales.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <a
                            href="#research"
                            className="group relative px-7 py-3.5 bg-ocean-500 hover:bg-ocean-400 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-ocean-500/30 hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="relative z-10">Explore My Work</span>
                            <div className="absolute inset-0 bg-linear-to-r from-ocean-400 to-ocean-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                        <a
                            href="#contact"
                            className="group px-7 py-3.5 border-2 border-ocean-500/30 dark:border-ocean-500/50 text-ocean-600 dark:text-ocean-400 hover:border-ocean-500 hover:bg-ocean-500/10 font-medium rounded-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <span className="flex items-center gap-2">
                                Get in Touch
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-deep-400 dark:text-deep-500"
                >
                    <span className="text-xs font-medium uppercase tracking-widest opacity-60">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-deep-300 dark:border-deep-600 flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-1.5 h-1.5 rounded-full bg-ocean-500"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
