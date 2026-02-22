import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Research', href: '#research' },
    { label: 'Publications', href: '#publications' },
    { label: 'Software', href: '#software' },
    { label: 'Awards', href: '#awards' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 50);
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(maxScroll > 0 ? y / maxScroll : 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track active section on scroll
    useEffect(() => {
        const sections = navLinks.map(link => link.href.slice(1));

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/90 dark:bg-deep-950/90 backdrop-blur-xl shadow-lg shadow-ocean-500/5 border-b border-deep-200/50 dark:border-deep-800/50'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group">
                        <span className="text-xl font-bold font-mono">
                            <span className="text-ocean-500">{'>'}</span>
                            <span className="text-deep-800 dark:text-white group-hover:text-ocean-400 transition-all duration-300">
                                {' '}yifei.gu
                            </span>
                            <span className="text-ocean-400 cursor-blink">_</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${isActive
                                        ? 'text-ocean-500 dark:text-ocean-400 bg-ocean-500/10'
                                        : 'text-deep-500 dark:text-deep-300 hover:text-ocean-500 dark:hover:text-ocean-400 hover:bg-ocean-500/5'
                                        }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ocean-500"
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                        <div className="ml-2 pl-2 border-l border-deep-200 dark:border-deep-700">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 text-deep-500 dark:text-deep-300 hover:text-ocean-500 dark:hover:text-ocean-400 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <motion.div
                                animate={{ rotate: mobileOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {mobileOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </motion.div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white/95 dark:bg-deep-950/95 backdrop-blur-xl border-t border-deep-200/50 dark:border-deep-800/50"
                    >
                        <div className="px-4 py-3 space-y-1">
                            {navLinks.map((link, index) => {
                                const isActive = activeSection === link.href.slice(1);
                                return (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${isActive
                                            ? 'text-ocean-500 dark:text-ocean-400 bg-ocean-500/10'
                                            : 'text-deep-600 dark:text-deep-300 hover:text-ocean-500 dark:hover:text-ocean-400 hover:bg-ocean-500/5'
                                            }`}
                                    >
                                        {link.label}
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll progress indicator */}
            {scrolled && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-deep-200/30 dark:bg-deep-700/30">
                    <motion.div
                        style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
                        className="h-full bg-linear-to-r from-ocean-400 via-ocean-500 to-ocean-400"
                    />
                </div>
            )}
        </motion.nav>
    );
}
