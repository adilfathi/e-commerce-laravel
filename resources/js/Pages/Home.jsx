import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import GlassButton from '@/Components/GlassButton';
import ProductCard from '@/Components/ProductCard';

export default function Home({ topProducts = [] }) {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });
        
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        
        return () => observer.disconnect();
    }, [topProducts]);
    return (
        <MainLayout>
            <Head title="Home - Shop the Future" />

            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-between mb-20 border-b border-[var(--border-color)]">
                <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                    {/* Left: Text Content */}
                    <div className="space-y-8 relative z-10 animate-fade-up">
                        <div className="inline-block border border-[var(--text-primary)] px-4 py-1.5 mb-4">
                            <span className="text-[var(--text-primary)] font-mono text-sm tracking-widest uppercase">New Collection 2026</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight uppercase tracking-tight">
                            Shop the <br />
                            <span className="text-[var(--text-primary)]">
                                Future
                            </span>
                        </h1>
                        
                        <p className="text-[var(--text-muted)] text-lg md:text-xl max-w-[560px] font-sans">
                            Experience a premium, immersive shopping journey. Discover curated collections designed for the modern aesthetic and lifestyle.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="/category/men">
                                <GlassButton variant="primary" className="px-8 py-4 text-lg">
                                    Explore Men
                                </GlassButton>
                            </Link>
                            <Link href="/category/women">
                                <GlassButton variant="secondary" className="px-8 py-4 text-lg">
                                    Explore Women
                                </GlassButton>
                            </Link>
                        </div>
                        
                        <div className="pt-8 flex items-center gap-8 border-t border-[var(--glass-border)] w-fit mt-8">
                            <div>
                                <h4 className="text-3xl font-display font-bold text-white">10k+</h4>
                                <p className="text-[var(--text-muted)] text-sm">Premium Products</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-display font-bold text-white">50k+</h4>
                                <p className="text-[var(--text-muted)] text-sm">Happy Customers</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Floating 3D Card */}
                    <div className="hidden lg:flex justify-center relative perspective-1000 animate-float" style={{ animationDelay: '1s' }}>
                        <div className="relative w-full max-w-md transform-style-3d hover:-rotate-y-8 hover:rotate-x-4 transition-transform duration-700 ease-out z-10 border border-[var(--border-color)]">
                            {topProducts.length > 0 ? (
                                <ProductCard product={topProducts[0]} />
                            ) : (
                                <div className="glass-panel p-6 aspect-[4/5] flex flex-col justify-between">
                                    <div className="w-full h-3/4 bg-[var(--bg-secondary)] rounded-none animate-pulse"></div>
                                    <div className="space-y-3 mt-4">
                                        <div className="h-6 w-3/4 bg-[var(--bg-secondary)] rounded-none"></div>
                                        <div className="h-4 w-1/2 bg-[var(--bg-secondary)] rounded-none"></div>
                                        <div className="h-10 w-full bg-[var(--text-primary)] rounded-none opacity-50"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                        

                    </div>
                </div>
            </section>

            {/* Top Products Grid */}
            {topProducts && topProducts.length > 0 && (
                <section className="py-20 border-t border-[var(--glass-border)] reveal">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Trending Now</h2>
                            <p className="text-[var(--text-muted)]">Discover what everyone is buying.</p>
                        </div>
                        <Link href="/category/men" className="text-[var(--accent-secondary)] hover:text-cyan-300 transition-colors font-medium flex items-center gap-1">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topProducts.slice(1, 5).map((product, idx) => (
                            <div key={product.id} className="reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </section>
            )}
            
        </MainLayout>
    );
}
