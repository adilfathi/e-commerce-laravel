import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import CartDrawer from '@/Components/CartDrawer';

import ThemeToggle from '@/Components/ThemeToggle';

export default function MainLayout({ children }) {
    const { url } = usePage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [blurAmount, setBlurAmount] = useState(8);
    const { auth, cartCount, flash } = usePage().props;
    const [toastMessage, setToastMessage] = useState(null);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            const timer = setTimeout(() => setToastMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    useEffect(() => {

        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 20);
            
            // Dynamic blur calculation based on scroll
            const newBlur = Math.min(24, 8 + scrollY / 20);
            setBlurAmount(newBlur);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Men', href: '/category/men' },
        { name: 'Women', href: '/category/women' },
        { name: 'Kids', href: '/category/kids' },
    ];

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Sticky Glass Navbar */}
            <nav 
                className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${
                    isScrolled ? 'bg-[var(--glass-bg)] border-[var(--glass-border)] py-3' : 'bg-transparent border-transparent py-5'
                }`}
                style={{
                    backdropFilter: isScrolled ? `blur(${blurAmount}px) saturate(180%)` : 'none',
                    WebkitBackdropFilter: isScrolled ? `blur(${blurAmount}px) saturate(180%)` : 'none',
                }}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl font-display font-bold tracking-widest uppercase text-[var(--text-primary)] border-2 border-[var(--text-primary)] px-2 py-1">
                            ECOMMERZZ
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            const isActive = url === link.href || (link.href !== '/' && url.startsWith(link.href));
                            return (
                                <Link 
                                    key={link.name}
                                    href={link.href}
                                    className={`font-sans text-sm uppercase tracking-wider transition-colors hover:text-[var(--text-primary)] ${
                                        isActive ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-muted)]'
                                    }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <div className="h-px w-full bg-[var(--text-primary)] mt-1 animate-fade-up" />
                                    )}
                                </Link>
                            );
                        })}
                        {auth?.user && (
                            <Link href="/orders" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm font-medium uppercase tracking-widest transition-colors">
                                My Orders
                            </Link>
                        )}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Search */}
                        <div className="relative hidden sm:block group">
                            <input 
                                type="text" 
                                placeholder="SEARCH..." 
                                className="bg-transparent border-b border-[var(--text-muted)] py-1 pl-8 pr-4 w-40 focus:w-64 transition-all duration-300 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)] uppercase tracking-wider"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-1.5 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Cart */}
                        <Link 
                            href="/cart"
                            className="relative p-2 hover:text-[var(--text-muted)] transition-colors group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 h-4 w-4 bg-[var(--text-primary)] text-[var(--bg-base)] rounded-full text-[9px] font-bold flex items-center justify-center border border-[var(--bg-base)]">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User */}
                        {auth?.user ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center overflow-hidden hover:border-[var(--text-primary)] transition-colors bg-[var(--bg-secondary)]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </button>
                                
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-xl animate-fade-up z-50 py-2">
                                        <div className="px-4 py-2 border-b border-[var(--border-color)] mb-2">
                                            <p className="text-sm font-bold text-[var(--text-primary)] truncate">{auth.user.name}</p>
                                        </div>
                                        {auth.user.is_admin && (
                                            <Link href="/admin/products" className="block px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-base)] transition-colors">
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <Link href="/orders" className="block md:hidden px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-base)] transition-colors">
                                            My Orders
                                        </Link>
                                        <Link href="/logout" method="post" as="button" className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[var(--bg-base)] transition-colors font-medium">
                                            Logout
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center overflow-hidden hover:border-[var(--text-primary)] transition-colors bg-[var(--bg-secondary)]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 md:px-6">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="glass-panel rounded-none border-x-0 border-b-0 py-8 mt-auto">
                <div className="container mx-auto px-4 md:px-6 text-center text-[var(--text-muted)]">
                    <p>&copy; {new Date().getFullYear()} ECOMMERZZ E-Commerce. All rights reserved.</p>
                </div>
            </footer>

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-4 right-4 z-50 glass-panel border border-green-500/50 bg-green-500/10 text-green-500 px-6 py-3 rounded-none shadow-xl animate-fade-up flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium tracking-wide">{toastMessage}</span>
                </div>
            )}
        </div>
    );
}
