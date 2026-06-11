import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function AdminOrders({ auth, orders }) {
    // orders is now a paginated response
    const orderItems = orders.data || [];

    return (
        <MainLayout user={auth?.user}>
            <Head title="Admin Orders" />

            <div className="flex border-b border-[var(--border-color)] mb-8 mt-4">
                <Link href="/admin/products" className="px-6 py-3 uppercase tracking-widest text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Inventory</Link>
                <Link href="/admin/orders" className="px-6 py-3 uppercase tracking-widest text-sm font-bold border-b-2 border-[var(--text-primary)] text-[var(--text-primary)]">Orders</Link>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-[var(--text-primary)]">All Orders</h1>
                    <p className="text-[var(--text-muted)] mt-1 font-sans">View and manage customer orders.</p>
                </div>
            </div>

            {!orderItems || orderItems.length === 0 ? (
                <div className="text-center py-24 border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                    <p className="text-[var(--text-muted)]">No orders found in the database.</p>
                </div>
            ) : (
                <div className="glass-panel overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Order ID</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Date</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Customer</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Address</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] text-right">Items</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] text-right">Total</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                            {orderItems.map((order) => (
                                <tr key={order.id} className="hover:bg-[var(--bg-secondary)] transition-colors">
                                    <td className="p-4 font-mono text-sm text-[var(--text-primary)] whitespace-nowrap">
                                        {order.id.split('-')[0]}
                                    </td>
                                    <td className="p-4 text-sm text-[var(--text-muted)] whitespace-nowrap">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-sm text-[var(--text-primary)] font-medium whitespace-nowrap">
                                        {order.user?.name || 'Unknown'}
                                    </td>
                                    <td className="p-4 text-sm text-[var(--text-muted)] max-w-xs truncate" title={order.shipping_address}>
                                        {order.shipping_address || 'No address'}
                                    </td>
                                    <td className="p-4 text-sm font-mono text-[var(--text-primary)] text-right">
                                        {order.order_items?.length || 0}
                                    </td>
                                    <td className="p-4 text-sm font-mono font-bold text-[var(--text-primary)] text-right">
                                        ${parseFloat(order.net_price).toFixed(2)}
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        <span className={`inline-block px-2 py-1 font-bold rounded text-[10px] uppercase tracking-widest ${order.payment_status === 'paid' ? 'bg-green-500/10 text-green-500' : (order.payment_status === 'failed' || order.payment_status === 'cancelled' || order.payment_status === 'expired' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500')}`}>
                                            {order.payment_status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {orders.links && (
                <div className="mt-8 flex justify-center">
                    <div className="flex flex-wrap gap-1">
                        {orders.links.map((link, key) => (
                            <Link
                                key={key}
                                href={link.url || '#'}
                                className={`px-4 py-2 border text-sm font-mono transition-colors ${
                                    link.active 
                                        ? 'bg-[var(--text-primary)] text-[var(--bg-base)] border-[var(--text-primary)]' 
                                        : 'bg-transparent text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
