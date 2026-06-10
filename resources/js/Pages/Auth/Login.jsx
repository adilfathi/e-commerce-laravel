import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import GlassCard from '@/Components/GlassCard';
import GlassButton from '@/Components/GlassButton';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <MainLayout>
            <Head title="Log In - ECOMMERZZ" />

            <div className="flex items-center justify-center min-h-[70vh] animate-fade-up">

                <GlassCard className="w-full max-w-md p-8 md:p-10 border border-[var(--border-color)]">
                    <div className="text-center mb-8">
                        <div className="inline-flex w-12 h-12 border border-[var(--text-primary)] items-center justify-center mb-4 bg-[var(--bg-secondary)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-display font-bold text-[var(--text-primary)]">Welcome Back</h2>
                        <p className="text-[var(--text-muted)] mt-2 font-sans">Enter your credentials to access your account.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
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

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-[var(--text-primary)]">Password</label>
                                <a href="#" className="text-sm font-medium text-[var(--accent-secondary)] hover:text-cyan-400 transition-colors">Forgot Password?</a>
                            </div>
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

                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-[var(--text-muted)]">
                                Remember me
                            </label>
                        </div>

                        <GlassButton 
                            variant="gradient" 
                            className="w-full py-3 text-lg font-bold"
                            disabled={processing}
                        >
                            Sign In
                        </GlassButton>
                    </form>

                    <div className="mt-8 text-center border-t border-[var(--glass-border)] pt-6">
                        <p className="text-[var(--text-muted)]">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-medium text-[var(--accent-primary)] hover:text-violet-400 transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </GlassCard>
            </div>
        </MainLayout>
    );
}
