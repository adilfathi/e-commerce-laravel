import { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import MainLayout from '@/Layouts/MainLayout';
import GlassButton from '@/Components/GlassButton';

export default function Payment({ order, midtrans_client_key, is_production }) {
    const [timeLeft, setTimeLeft] = useState('');
    const [isExpired, setIsExpired] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);



    useEffect(() => {
        if (!order.payment_expires_at) return;

        const expiryTime = new Date(order.payment_expires_at).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = expiryTime - now;

            if (distance < 0) {
                setIsExpired(true);
                setTimeLeft('EXPIRED');
                alert('Payment time has expired. Order will be cancelled.');
                router.get('/midtrans/failure');
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`(${hours}h ${minutes}m ${seconds}s remaining)`);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [order.payment_expires_at]);

    const handlePayment = () => {
        setIsProcessing(true);
        // Redirect to the Payment Simulator page
        router.visit(`/simulator/${order.id}`);
    };

    return (
        <MainLayout>
            <Head title="Payment - E-Commerce" />

            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)] uppercase tracking-tight mb-8 text-center">
                        Payment Gateway
                    </h1>
                    
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wide border-b border-[var(--border-color)] pb-3 mb-4">
                            Order Summary
                        </h2>
                        <div className="space-y-3 font-mono">
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Total MSRP:</span>
                                <span className="text-[var(--text-primary)]">${parseFloat(order.total_price).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Discount:</span>
                                <span className="text-green-500">-${parseFloat(order.discount).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl pt-4 mt-2 border-t border-[var(--border-color)]">
                                <span className="text-[var(--text-primary)] font-bold">Net Price:</span>
                                <span className="text-[var(--text-primary)] font-bold">${parseFloat(order.net_price).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-wide border-b border-[var(--border-color)] pb-3 mb-4">
                            Order Items
                        </h3>
                        <div className="space-y-3">
                            {order.order_items && order.order_items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-4 bg-[var(--bg-base)] border border-[var(--border-color)]">
                                    <span className="text-[var(--text-primary)]">{item.product.name} <span className="text-[var(--text-muted)]">x{item.quantity}</span></span>
                                    <span className="text-[var(--text-primary)] font-mono font-bold">${parseFloat(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {order.payment_expires_at && !isExpired && (
                        <div className="mb-8 p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-lg">
                            <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                                Payment expires: <span className="font-mono">{new Date(order.payment_expires_at).toLocaleString()}</span>
                                <span className="ml-2 font-bold">{timeLeft}</span>
                            </p>
                            <p className="text-xs text-yellow-600/70 dark:text-yellow-400/70 mt-2">
                                If payment is not completed before the expiration time, your order will be automatically cancelled.
                            </p>
                        </div>
                    )}

                    <GlassButton 
                        onClick={handlePayment} 
                        disabled={isProcessing || isExpired}
                        className="w-full py-4 text-lg"
                    >
                        {isProcessing ? 'Processing...' : 'PAY SECURELY NOW'}
                    </GlassButton>
                </div>
            </div>
        </MainLayout>
    );
}
