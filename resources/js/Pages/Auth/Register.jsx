import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import GlassCard from '@/Components/GlassCard';
import GlassButton from '@/Components/GlassButton';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <MainLayout>
            <Head title="Register - NEXUS" />

            <div className="flex items-center justify-center min-h-[80vh] animate-fade-up">

                <GlassCard className="w-full max-w-lg p-8 md:p-10 border border-[var(--border-color)]">
                    <div className="text-center mb-8">
                        <div className="inline-flex w-12 h-12 border border-[var(--text-primary)] items-center justify-center mb-4 bg-[var(--bg-secondary)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-display font-bold text-[var(--text-primary)]">Create Account</h2>
                        <p className="text-[var(--text-muted)] mt-2 font-sans">Join NEXUS for a premium shopping experience.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Full Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all"
                                placeholder="John Doe"
                                required
                            />
                            {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all"
                                placeholder="you@example.com"
                                required
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <GlassButton 
                                variant="gradient" 
                                className="w-full py-3 text-lg font-bold"
                                disabled={processing}
                            >
                                Register Now
                            </GlassButton>
                        </div>
                    </form>

                    <div className="mt-8 text-center border-t border-[var(--glass-border)] pt-6">
                        <p className="text-[var(--text-muted)]">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-[var(--accent-primary)] hover:text-violet-400 transition-colors">
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </GlassCard>
            </div>
        </MainLayout>
    );
}
