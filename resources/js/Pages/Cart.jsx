import { Head, Link, router, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import GlassButton from '@/Components/GlassButton';

export default function Cart({ cartItems, totalPrice, discount, netPrice, totalOldPrice }) {
    const { props } = usePage();
    const flash = props.flash || {};

    const handleUpdateQuantity = (id, quantity) => {
        router.put(`/cart/update/${id}`, { quantity }, { preserveScroll: true });
    };

    const handleRemoveItem = (id) => {
        router.delete(`/cart/remove/${id}`, { preserveScroll: true });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        router.post('/order', {}, { preserveScroll: true });
    };

    return (
        <MainLayout>
            <Head title="Cart - E-Commerce" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter text-[var(--text-primary)]">Shopping Cart</h1>
                    <p className="text-[var(--text-muted)] mt-2 font-sans text-lg">Review your items before checkout.</p>
                </div>

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

                {cartItems && cartItems.length > 0 ? (
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 flex flex-col sm:flex-row items-center gap-6">
                                    <div className="w-full sm:w-32 h-32 bg-[var(--bg-base)] border border-[var(--border-color)] flex items-center justify-center overflow-hidden shrink-0">
                                        <img 
                                            src={item.product.product_image?.startsWith('http') ? item.product.product_image : `/${item.product.product_image}`} 
                                            alt={item.product.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 w-full text-center sm:text-left">
                                        <Link href={`/product/${item.product.id}`} className="hover:text-[var(--text-muted)] transition-colors">
                                            <h3 className="text-xl font-bold text-[var(--text-primary)] line-clamp-2">{item.product.name}</h3>
                                        </Link>
                                        <div className="mt-2 font-mono flex items-center justify-center sm:justify-start gap-3">
                                            <span className="text-[var(--text-primary)] font-bold text-lg">${parseFloat(item.product.new_price).toFixed(2)}</span>
                                            {parseFloat(item.product.old_price) > parseFloat(item.product.new_price) && (
                                                <span className="text-[var(--text-muted)] line-through text-sm">${parseFloat(item.product.old_price).toFixed(2)}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                                        <div className="flex items-center border border-[var(--border-color)]">
                                            <button 
                                                className="px-3 py-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-50"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-1 text-[var(--text-primary)] font-mono min-w-[3rem] text-center">{item.quantity}</span>
                                            <button 
                                                className="px-3 py-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-500 hover:text-red-400 text-sm font-medium uppercase tracking-wider transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Checkout Panel */}
                        <div className="lg:col-span-1">
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 sticky top-24">
                                <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] uppercase tracking-wide mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-8 font-mono">
                                    <div className="flex justify-between items-center text-[var(--text-muted)]">
                                        <span>Total MSRP:</span>
                                        <span>${parseFloat(totalOldPrice).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-green-500">
                                        <span>Discount:</span>
                                        <span>-${parseFloat(discount).toFixed(2)}</span>
                                    </div>
                                    <div className="pt-4 border-t border-[var(--border-color)] flex justify-between items-center text-xl">
                                        <span className="text-[var(--text-primary)] font-bold">Total:</span>
                                        <span className="text-[var(--text-primary)] font-bold">${parseFloat(netPrice).toFixed(2)}</span>
                                    </div>
                                </div>

                                <form onSubmit={handlePlaceOrder}>
                                    <GlassButton type="submit" className="w-full py-4 text-lg">
                                        CHECKOUT NOW
                                    </GlassButton>
                                </form>
                                <div className="mt-4 text-center">
                                    <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] underline transition-colors">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                        <div className="mb-6 text-[var(--text-muted)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Your cart is empty!</h2>
                        <p className="text-[var(--text-muted)] mb-8 max-w-md mx-auto">Explore our collections and add some premium items to your cart.</p>
                        <Link href="/">
                            <GlassButton className="px-8">START SHOPPING</GlassButton>
                        </Link>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
