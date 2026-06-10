import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import GlassButton from '@/Components/GlassButton';

export default function Orders({ auth, orders }) {
    return (
        <MainLayout user={auth?.user}>
            <Head title="My Orders - E-Commerce" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter text-[var(--text-primary)]">My Orders</h1>
                    <p className="text-[var(--text-muted)] mt-2 font-sans text-lg">View your order history and details.</p>
                </div>

                {!orders || orders.length === 0 ? (
                    <div className="text-center py-24 border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                        <div className="mb-6 text-[var(--text-muted)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">No orders found</h2>
                        <p className="text-[var(--text-muted)] mb-8 max-w-md mx-auto">You haven't placed any orders yet. Start exploring our collection!</p>
                        <Link href="/">
                            <GlassButton className="px-8">START SHOPPING</GlassButton>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden">
                                <div className="bg-[var(--bg-base)] border-b border-[var(--border-color)] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full font-mono text-sm">
                                        <div>
                                            <p className="text-[var(--text-muted)] uppercase tracking-widest mb-1">Order Placed</p>
                                            <p className="text-[var(--text-primary)] font-bold">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[var(--text-muted)] uppercase tracking-widest mb-1">Total</p>
                                            <p className="text-[var(--text-primary)] font-bold">${parseFloat(order.net_price).toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[var(--text-muted)] uppercase tracking-widest mb-1">Payment Status</p>
                                            <span className={`inline-block px-2 py-1 font-bold rounded text-xs uppercase tracking-widest ${order.payment_status === 'paid' ? 'bg-green-500/10 text-green-500' : (order.payment_status === 'failed' || order.payment_status === 'cancelled' || order.payment_status === 'expired' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500')}`}>
                                                {order.payment_status}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[var(--text-muted)] uppercase tracking-widest mb-1">Order #</p>
                                            <p className="text-[var(--text-primary)] truncate max-w-[120px]">{order.id.split('-')[0]}</p>
                                        </div>
                                    </div>
                                    
                                    {order.payment_status === 'pending' && (
                                        <div className="shrink-0">
                                            <Link href={`/payment/${order.id}`}>
                                                <GlassButton className="py-2 px-6">Pay Now</GlassButton>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 border-b border-[var(--border-color)]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-lg font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">Shipping Details</h3>
                                            <p className="text-[var(--text-primary)] font-medium">{auth?.user?.name}</p>
                                            <p className="text-[var(--text-muted)] whitespace-pre-wrap mt-1">{order.shipping_address}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">Order Status</h3>
                                            <p className="text-[var(--text-primary)] capitalize">{order.status}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">Items in Order</h3>
                                    <div className="space-y-4">
                                        {order.order_items?.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-[var(--bg-base)] border border-[var(--border-color)] shrink-0 overflow-hidden">
                                                    {item.product && (
                                                        <img 
                                                            src={item.product.product_image?.startsWith('http') ? item.product.product_image : `/${item.product.product_image}`} 
                                                            alt={item.product.name} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <Link href={`/product/${item.product_id}`} className="hover:text-[var(--text-muted)] transition-colors">
                                                        <h4 className="font-bold text-[var(--text-primary)] line-clamp-1">{item.product ? item.product.name : 'Unknown Product'}</h4>
                                                    </Link>
                                                    <p className="text-[var(--text-muted)] text-sm mt-1 font-mono">
                                                        Qty: {item.quantity} x ${parseFloat(item.price).toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="font-mono font-bold text-[var(--text-primary)]">
                                                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
