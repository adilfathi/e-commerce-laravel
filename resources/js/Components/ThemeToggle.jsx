import { useState, useEffect } from 'react';

export default function ThemeToggle() {
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        // Initialize theme based on localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light');
            setIsLight(true);
        } else if (savedTheme === 'dark') {
            document.documentElement.classList.remove('light');
            setIsLight(false);
        } else {
            // Default to dark since our design is dark-first
            document.documentElement.classList.remove('light');
            setIsLight(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isLight) {
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
            setIsLight(false);
        } else {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
            setIsLight(true);
        }
    };

    return (
        <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass-panel hover:bg-[var(--glass-hover)] transition-all hover:scale-105 hover:shadow-[var(--glow-cyan)] text-[var(--text-primary)]"
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
            {isLight ? (
                // Moon icon for switching to dark
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ) : (
                // Sun icon for switching to light
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>
    );
}
