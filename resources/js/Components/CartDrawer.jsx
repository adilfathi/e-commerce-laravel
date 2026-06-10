import { useState, useEffect } from 'react';
import GlassButton from './GlassButton';

export default function CartDrawer({ isOpen, onClose }) {
    const [cartItems, setCartItems] = useState([]);

    // We can fetch from local storage or API. For now, let's keep it simple.
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Fetch cart from API/local state
            // fetchCart().then(data => setCartItems(data));
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Drawer */}
            <div 
                className={`fixed top-0 right-0 h-full w-full max-w-[420px] glass-panel rounded-none rounded-l-2xl z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
            >
                {/* Header */}
                <div className="p-6 border-b border-[var(--glass-border)] flex items-center justify-between">
                    <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Your Cart</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-[var(--glass-hover)] transition-colors text-[var(--text-muted)] hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[var(--text-muted)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="text-[var(--text-primary)] font-medium mb-2">Your cart is empty</p>
                            <p className="text-[var(--text-muted)] text-sm mb-6">Looks like you haven't added anything yet.</p>
                            <GlassButton variant="secondary" onClick={onClose}>Continue Shopping</GlassButton>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="glass-panel p-3 flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-[var(--text-primary)] font-medium line-clamp-1">{item.name}</h4>
                                        <p className="text-[var(--text-muted)] text-sm font-mono">${item.price}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-2 py-1">
                                            <button className="text-[var(--text-muted)] hover:text-white">-</button>
                                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                                            <button className="text-[var(--text-muted)] hover:text-white">+</button>
                                        </div>
                                        <button className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Summary */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-[var(--glass-border)] bg-[#0d0d1a]/80 backdrop-blur-md">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-[var(--text-muted)]">
                                <span>Subtotal</span>
                                <span className="font-mono">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[var(--text-muted)]">
                                <span>Shipping</span>
                                <span className="font-mono">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[var(--text-primary)] font-bold text-lg pt-3 border-t border-[var(--glass-border)]">
                                <span>Total</span>
                                <span className="font-mono text-[var(--accent-warm)]">${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <GlassButton variant="gradient" className="w-full py-4 text-lg font-bold">
                            Proceed to Checkout
                        </GlassButton>
                    </div>
                )}
            </div>
        </>
    );
}
