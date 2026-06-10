import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard';

export default function ProductListing({ products, category }) {
    const [sortedProducts, setSortedProducts] = useState(products);
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        let sorted = [...products];
        if (sortOrder === 'price_asc') sorted.sort((a, b) => a.new_price - b.new_price);
        if (sortOrder === 'price_desc') sorted.sort((a, b) => b.new_price - a.new_price);
        if (sortOrder === 'newest') sorted.sort((a, b) => b.id - a.id);
        setSortedProducts(sorted);
    }, [sortOrder, products]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });
        
        // Slight delay to allow DOM render of new products
        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }, 100);
        
        return () => observer.disconnect();
    }, [sortedProducts]);

    return (
        <MainLayout>
            <Head title={`${category.charAt(0).toUpperCase() + category.slice(1)} - ECOMMERZZ`} />

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-fade-up">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-2">
                        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
                        <span>/</span>
                        <span className="capitalize text-[var(--accent-secondary)]">{category}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold capitalize text-[var(--text-primary)]">
                        {category}
                    </h1>
                </div>

                <div className="glass-panel px-4 py-2 flex items-center gap-3">
                    <span className="text-[var(--text-muted)] text-sm">Sort by:</span>
                    <select 
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="bg-transparent text-[var(--text-primary)] border-none focus:ring-0 outline-none cursor-pointer"
                    >
                        <option value="newest" className="bg-[var(--bg-base)]">Newest Arrivals</option>
                        <option value="price_asc" className="bg-[var(--bg-base)]">Price: Low to High</option>
                        <option value="price_desc" className="bg-[var(--bg-base)]">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Layout */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full md:w-64 shrink-0 glass-panel p-6 h-fit sticky top-24 hidden md:block">
                    <h3 className="text-xl font-display font-bold mb-6 text-[var(--text-primary)] border-b border-[var(--border-color)] pb-4">Filters</h3>
                    
                    <div className="space-y-6">
                        {/* Price Filter */}
                        <div>
                            <h4 className="font-medium text-[var(--text-primary)] mb-3">Price Range</h4>
                            <div className="space-y-2 text-[var(--text-muted)]">
                                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--text-primary)] transition-colors">
                                    <input type="checkbox" className="checkbox checkbox-sm checkbox-primary rounded" />
                                    <span>Under $50</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--text-primary)] transition-colors">
                                    <input type="checkbox" className="checkbox checkbox-sm checkbox-primary rounded" />
                                    <span>$50 - $100</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--text-primary)] transition-colors">
                                    <input type="checkbox" className="checkbox checkbox-sm checkbox-primary rounded" />
                                    <span>Over $100</span>
                                </label>
                            </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <h4 className="font-medium text-[var(--text-primary)] mb-3">Availability</h4>
                            <div className="space-y-2 text-[var(--text-muted)]">
                                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--text-primary)] transition-colors">
                                    <input type="checkbox" className="checkbox checkbox-sm checkbox-primary rounded" defaultChecked />
                                    <span>In Stock</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1">
                    {sortedProducts.length === 0 ? (
                        <div className="glass-panel p-12 text-center flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[var(--text-muted)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h3 className="text-xl text-[var(--text-primary)] font-bold mb-2">No products found</h3>
                            <p className="text-[var(--text-muted)]">Try adjusting your filters or search criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {sortedProducts.map((product, idx) => (
                                <div key={product.id} className="reveal" style={{ transitionDelay: `${(idx % 6) * 100}ms` }}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </MainLayout>
    );
}
