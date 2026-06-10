import { Link, router } from '@inertiajs/react';
import GlassCard from './GlassCard';
import GlassButton from './GlassButton';

export default function ProductCard({ product }) {
    // Determine badge
    const discount = product.old_price > product.new_price 
        ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100) 
        : 0;
        
    const badge = discount > 0 ? `SALE ${discount}%` : (product.is_new ? 'NEW' : null);
    const badgeColor = discount > 0 ? 'text-[var(--accent-warm)]' : 'text-[var(--accent-secondary)]';

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(`/cart/add/${product.id}`, { quantity: 1 }, {
            preserveScroll: true
        });
    };

    const handleCardClick = () => {
        router.visit(`/product/${product.id}`);
    };

    return (
        <GlassCard 
            className="flex flex-col h-full group hover:-translate-y-1 relative cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-t-2xl block">
                <img 
                    src={product.product_image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badge Overlay */}
                {badge && (
                    <div className="absolute top-3 left-3">
                        <span className={`glass-panel px-3 py-1 text-xs font-bold rounded-full ${badgeColor}`}>
                            {badge}
                        </span>
                    </div>
                )}
            </div>

            {/* Wishlist Button (Absolute to the card, not the link) */}
            <button 
                className="absolute top-3 right-3 glass-panel p-2 rounded-full text-[var(--text-muted)] hover:text-red-400 hover:scale-110 transition-all duration-300 z-10"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Category / Brand */}
                <span className="text-[var(--text-muted)] text-[13px] uppercase tracking-wider mb-1">
                    {product.category}
                </span>

                {/* Product Name */}
                <div className="hover:text-[var(--accent-primary)] transition-colors">
                    <h3 className="text-[var(--text-primary)] font-sans font-medium text-lg leading-tight mb-2 line-clamp-2">
                        {product.name}
                    </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                    <div className="flex text-[var(--accent-warm)]">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < (product.rating || 0) ? 'fill-current' : 'text-[var(--border-color)]'}`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-[var(--text-muted)] text-xs ml-1">({product.stock} in stock)</span>
                </div>

                <div className="mt-auto">
                    {/* Price Row */}
                    <div className="flex items-end gap-2 mb-4 font-mono">
                        <span className="text-[var(--accent-warm)] text-xl font-bold">
                            ${parseFloat(product.new_price).toFixed(2)}
                        </span>
                        {product.old_price > product.new_price && (
                            <span className="text-[var(--text-muted)] line-through text-sm pb-0.5">
                                ${parseFloat(product.old_price).toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* CTA */}
                    <GlassButton 
                        variant="secondary" 
                        className="w-full flex justify-center items-center py-3 group-hover:shadow-[var(--glow-violet)] group-hover:border-violet-500/40"
                        onClick={handleAddToCart}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add to Cart
                    </GlassButton>
                </div>
            </div>
        </GlassCard>
    );
}
