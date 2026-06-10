import { useState } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import GlassButton from '@/Components/GlassButton';

export default function ProductDetail({ product, can_review }) {
    const { props } = usePage();
    const flash = props.flash || {};
    
    const [mainImage, setMainImage] = useState(product.product_image);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [activeSize, setActiveSize] = useState('M');

    const handleAddToCart = () => {
        router.post(`/cart/add/${product.id}`, { quantity }, { preserveScroll: true });
    };

    const handleBuyNow = () => {
        router.post(`/cart/add/${product.id}`, { quantity }, { 
            preserveScroll: true,
            onSuccess: () => {
                router.visit('/cart');
            }
        });
    };

    // Review Form
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 5,
        comment: ''
    });

    const submitReview = (e) => {
        e.preventDefault();
        post(`/product/${product.id}/review`, {
            preserveScroll: true,
            onSuccess: () => reset('comment', 'rating'),
        });
    };

    // Parse sub images safely
    let subImages = [];
    try {
        subImages = typeof product.product_sub_images === 'string' 
            ? JSON.parse(product.product_sub_images) 
            : product.product_sub_images;
        if (!Array.isArray(subImages)) subImages = [];
    } catch (e) {
        subImages = [];
    }
    
    const allImages = [product.product_image, ...subImages].filter(Boolean);

    const discount = product.old_price > product.new_price 
        ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100) 
        : 0;

    return (
        <MainLayout>
            <Head title={`${product.name} - ECOMMERZZ`} />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8 animate-fade-up">
                <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
                <span>/</span>
                <Link href={`/category/${product.category}`} className="capitalize hover:text-[var(--text-primary)] transition-colors">{product.category}</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)] line-clamp-1">{product.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 mb-16">
                {/* Image Gallery (55%) */}
                <div className="w-full lg:w-[55%] space-y-4 animate-fade-up">
                    {/* Main Image */}
                    <div className="glass-panel overflow-hidden aspect-square flex items-center justify-center p-4">
                        <img 
                            src={mainImage} 
                            alt={product.name} 
                            className="w-full h-full object-contain rounded-xl"
                        />
                    </div>
                    
                    {/* Thumbnails */}
                    {allImages.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {allImages.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`shrink-0 w-24 h-24 rounded-xl overflow-hidden glass-panel transition-all ${
                                        mainImage === img ? 'ring-2 ring-[var(--accent-primary)] shadow-[var(--glow-violet)] scale-105' : 'opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Panel (45%) */}
                <div className="w-full lg:w-[45%] flex flex-col animate-fade-up" style={{ animationDelay: '100ms' }}>
                    <div className="mb-6 border-b border-[var(--border-color)] pb-6">
                        <span className="text-[var(--accent-secondary)] tracking-widest uppercase text-xs font-bold mb-2 block">
                            {product.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)] leading-tight mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex text-[var(--accent-warm)]">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < (product.rating || 0) ? 'fill-current' : 'text-gray-600'}`} viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-[var(--text-primary)]">{parseFloat(product.rating || 0).toFixed(1)}</span>
                            <span className="text-[var(--text-muted)] border-l border-[var(--border-color)] pl-4">124 Reviews</span>
                            <span className="text-[var(--text-muted)] border-l border-[var(--border-color)] pl-4">800+ Sold</span>
                        </div>
                    </div>

                    <div className="mb-8 font-mono flex items-center gap-4">
                        <span className="text-4xl font-bold text-[var(--accent-warm)]">
                            ${parseFloat(product.new_price).toFixed(2)}
                        </span>
                        {discount > 0 && (
                            <>
                                <span className="text-xl text-[var(--text-muted)] line-through">
                                    ${parseFloat(product.old_price).toFixed(2)}
                                </span>
                                <span className="glass-panel px-3 py-1 rounded-full text-[var(--accent-warm)] text-sm font-bold bg-[#f59e0b]/10 border-[#f59e0b]/30">
                                    -{discount}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Variant Selector */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-3">
                            <span className="text-[var(--text-primary)] font-medium">Size</span>
                            <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm hover:underline">Size Guide</button>
                        </div>
                        <div className="flex gap-3">
                            {['S', 'M', 'L', 'XL'].map(size => (
                                <button 
                                    key={size}
                                    onClick={() => setActiveSize(size)}
                                    className={`w-14 h-12 rounded-none transition-all font-medium ${
                                        activeSize === size 
                                            ? 'bg-[var(--text-primary)] border border-[var(--text-primary)] text-[var(--bg-base)]' 
                                            : 'border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="flex flex-col gap-4 mt-auto">
                        <div className="flex items-center gap-4">
                            <span className="text-[var(--text-primary)] font-medium w-16">Quantity</span>
                            <div className="border border-[var(--border-color)] flex items-center h-12 px-2 w-32">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    -
                                </button>
                                <input 
                                    type="number" 
                                    value={quantity}
                                    readOnly
                                    className="w-full text-center bg-transparent text-[var(--text-primary)] font-mono border-none focus:ring-0 outline-none p-0"
                                />
                                <button 
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-[var(--text-muted)] text-sm">{product.stock} pieces available</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <GlassButton variant="gradient" className="flex-1 py-4 text-lg" onClick={handleBuyNow}>
                                Buy Now
                            </GlassButton>
                            <GlassButton variant="secondary" className="flex-1 py-4 text-lg border border-[var(--accent-primary)]/30" onClick={handleAddToCart}>
                                Add to Cart
                            </GlassButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Component */}
            <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
                <div className="flex border-b border-[var(--glass-border)] mb-6">
                    {['description', 'specifications', 'reviews'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-4 font-display font-bold text-lg capitalize transition-colors relative ${
                                activeTab === tab ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[var(--glow-violet)]"></div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="glass-panel p-8 min-h-[300px]">
                    {activeTab === 'description' && (
                        <div className="prose prose-invert max-w-none">
                            <p className="text-[var(--text-primary)] leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>
                    )}
                    {activeTab === 'specifications' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between py-3 border-b border-[var(--border-color)]">
                                <span className="text-[var(--text-muted)]">Category</span>
                                <span className="text-[var(--text-primary)] capitalize">{product.category}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-[var(--border-color)]">
                                <span className="text-[var(--text-muted)]">Brand</span>
                                <span className="text-[var(--text-primary)]">{product.seller_name || 'ECOMMERZZ Exclusive'}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-[var(--border-color)]">
                                <span className="text-[var(--text-muted)]">SKU</span>
                                <span className="text-[var(--text-primary)] font-mono uppercase">NX-{String(product.id).substring(0, 8).toUpperCase()}</span>
                            </div>
                            
                            {/* Dynamic Specifications */}
                            {Array.isArray(product.specifications) && product.specifications.map((spec, idx) => (
                                <div key={idx} className="flex justify-between py-3 border-b border-[var(--border-color)]">
                                    <span className="text-[var(--text-muted)]">Feature {idx + 1}</span>
                                    <span className="text-[var(--text-primary)]">{spec}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div className="py-4">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-color)]">
                                <div>
                                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Customer Reviews</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-[var(--text-primary)]">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < (product.rating || 0) ? 'fill-current' : 'text-gray-600'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            ))}
                                        </div>
                                        <span className="text-[var(--text-primary)] font-medium">{parseFloat(product.rating || 0).toFixed(1)}</span>
                                        <span className="text-[var(--text-muted)] text-sm">({product.reviews?.length || 0} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Flash Messages */}
                            {flash.success && (
                                <div className="mb-6 p-4 border border-green-500/30 bg-green-500/10 text-green-500 rounded-xl">
                                    {flash.success}
                                </div>
                            )}
                            {flash.error && (
                                <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-500 rounded-xl">
                                    {flash.error}
                                </div>
                            )}

                            {/* Existing Reviews List */}
                            {product.reviews && product.reviews.length > 0 ? (
                                <div className="space-y-6 mb-12">
                                    {product.reviews.map(review => (
                                        <div key={review.id} className="p-6 border border-[var(--border-color)] bg-[var(--bg-base)]">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <span className="text-[var(--text-primary)] font-bold block">{review.user?.name || 'Anonymous'}</span>
                                                    <span className="text-[var(--text-muted)] text-sm">{new Date(review.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex text-[var(--text-primary)]">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-600'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                    ))}
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="text-[var(--text-muted)]">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[var(--text-muted)] mb-8">No reviews yet. Be the first to review this product!</p>
                            )}

                            {/* Write Review Form */}
                            {can_review && (
                                <div className="mt-8 border-t border-[var(--border-color)] pt-8">
                                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-6">Write a Review</h4>
                                    <form onSubmit={submitReview} className="max-w-2xl space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 uppercase tracking-wider">Rating</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        type="button"
                                                        key={star}
                                                        onClick={() => setData('rating', star)}
                                                        className="focus:outline-none focus:ring-2 focus:ring-[var(--text-primary)]"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${star <= data.rating ? 'text-[var(--text-primary)] fill-current' : 'text-gray-600 fill-current'}`} viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>
                                            {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="comment" className="block text-sm font-medium text-[var(--text-primary)] mb-2 uppercase tracking-wider">Comment (Optional)</label>
                                            <textarea
                                                id="comment"
                                                rows="4"
                                                value={data.comment}
                                                onChange={e => setData('comment', e.target.value)}
                                                className="w-full bg-transparent border border-[var(--border-color)] p-3 text-[var(--text-primary)] focus-visible:outline-none focus-visible:border-[var(--text-primary)] transition-colors"
                                                placeholder="What did you like or dislike about this product?"
                                            ></textarea>
                                            {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
                                        </div>

                                        <GlassButton type="submit" disabled={processing} className="px-8">
                                            {processing ? 'Submitting...' : 'Submit Review'}
                                        </GlassButton>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
