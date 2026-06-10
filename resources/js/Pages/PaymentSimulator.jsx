import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import GlassButton from '@/Components/GlassButton';

export default function PaymentSimulator({ order }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('credit_card');

    const handleSimulation = (status) => {
        setIsProcessing(true);
        router.post(`/simulator/${order.id}/process`, {
            status: status,
            payment_method: selectedMethod
        }, {
            onFinish: () => setIsProcessing(false)
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-base)] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
            <Head title="Payment Gateway Simulator" />

            <div className="w-full max-w-md animate-fade-up">
                {/* Simulator Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-display font-bold text-[var(--text-primary)] uppercase tracking-widest">
                        Ecommerzz Simulator
                    </h1>
                    <p className="text-[var(--text-muted)] text-sm mt-1">Test Environment</p>
                </div>

                {/* Gateway Window */}
                <div className="glass-panel p-6 shadow-2xl border border-[var(--border-color)] relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-[var(--border-color)]">
                        <div>
                            <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider">Amount Due</p>
                            <p className="text-[var(--accent-warm)] text-2xl font-mono font-bold">
                                ${parseFloat(order.net_price).toFixed(2)}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider">Order ID</p>
                            <p className="text-[var(--text-primary)] font-mono text-sm">
                                #{order.id.split('-')[0]}
                            </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="text-[var(--text-primary)] text-sm font-bold uppercase tracking-wider mb-4">Select Payment Method</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => setSelectedMethod('credit_card')}
                                className={`p-3 border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                                    selectedMethod === 'credit_card' 
                                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--text-primary)]' 
                                        : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                <span className="text-xs font-medium uppercase tracking-wider">Credit Card</span>
                            </button>
                            <button 
                                onClick={() => setSelectedMethod('bank_transfer')}
                                className={`p-3 border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                                    selectedMethod === 'bank_transfer' 
                                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--text-primary)]' 
                                        : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                </svg>
                                <span className="text-xs font-medium uppercase tracking-wider">Virtual Account</span>
                            </button>
                            <button 
                                onClick={() => setSelectedMethod('ewallet')}
                                className={`p-3 border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                                    selectedMethod === 'ewallet' 
                                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--text-primary)]' 
                                        : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs font-medium uppercase tracking-wider">E-Wallet (QR)</span>
                            </button>
                            <button 
                                onClick={() => setSelectedMethod('retail')}
                                className={`p-3 border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                                    selectedMethod === 'retail' 
                                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--text-primary)]' 
                                        : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="text-xs font-medium uppercase tracking-wider">Retail Store</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-[var(--bg-base)] border border-[var(--border-color)] p-4 mb-8 text-center text-sm text-[var(--text-muted)]">
                        This is a simulated payment gateway. No real money will be deducted. Choose an outcome below to test the application flow.
                    </div>

                    <div className="space-y-3">
                        <GlassButton 
                            variant="gradient" 
                            className="w-full py-3"
                            disabled={isProcessing}
                            onClick={() => handleSimulation('success')}
                        >
                            {isProcessing ? 'Processing...' : 'Simulate Success'}
                        </GlassButton>
                        <GlassButton 
                            variant="secondary" 
                            className="w-full py-3 border-yellow-500/30 text-yellow-500 hover:border-yellow-500/50 hover:bg-yellow-500/10"
                            disabled={isProcessing}
                            onClick={() => handleSimulation('pending')}
                        >
                            Simulate Pending
                        </GlassButton>
                        <GlassButton 
                            variant="secondary" 
                            className="w-full py-3 border-red-500/30 text-red-500 hover:border-red-500/50 hover:bg-red-500/10"
                            disabled={isProcessing}
                            onClick={() => handleSimulation('failed')}
                        >
                            Simulate Failure / Cancel
                        </GlassButton>
                    </div>
                </div>
                
                <div className="text-center mt-6">
                    <button 
                        onClick={() => router.visit(`/payment/${order.id}`)}
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-widest border-b border-transparent hover:border-[var(--text-primary)] pb-0.5"
                    >
                        &larr; Back to Order
                    </button>
                </div>
            </div>
        </div>
    );
}
