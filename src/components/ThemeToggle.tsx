import { useState } from 'react';

function getInitialTheme() {
    if (typeof document === 'undefined') return true;
    const stored = localStorage.getItem('theme');
    if (stored === 'light') return false;
    if (stored === 'dark') return true;
    return document.documentElement.classList.contains('dark');
}

export default function ThemeToggle() {
    const [dark, setDark] = useState(getInitialTheme);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="relative w-14 h-7 rounded-full bg-deep-200 dark:bg-deep-700 transition-colors duration-300 flex items-center p-1 cursor-pointer group"
        >
            <div
                className={`w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${dark ? 'translate-x-7 bg-ocean-500' : 'translate-x-0 bg-yellow-400'
                    }`}
            >
                {dark ? (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                ) : (
                    <svg className="w-3 h-3 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                )}
            </div>
        </button>
    );
}
