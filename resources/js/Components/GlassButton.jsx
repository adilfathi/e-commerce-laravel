export default function GlassButton({ 
    children, 
    variant = 'primary', 
    className = '', 
    disabled = false,
    ...props 
}) {
    let variantStyles = '';
    
    switch (variant) {
        case 'primary':
            // High contrast invert (Black background in light mode, White background in dark mode)
            variantStyles = 'bg-[var(--text-primary)] text-[var(--bg-base)] hover:opacity-80 border-none';
            break;
        case 'secondary':
            // Outline minimal style
            variantStyles = 'bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]';
            break;
        case 'ghost':
            variantStyles = 'bg-transparent hover:bg-[var(--glass-hover)] text-[var(--text-primary)] border-transparent';
            break;
        case 'gradient': // We keep the variant name so we don't break existing calls, but make it BNW
            variantStyles = 'bg-[var(--text-primary)] text-[var(--bg-base)] hover:scale-[0.98] transition-transform border-none';
            break;
        default:
            variantStyles = 'bg-[var(--text-primary)] text-[var(--bg-base)]';
    }

    return (
        <button
            disabled={disabled}
            className={`btn rounded-none uppercase tracking-wider font-sans font-medium text-sm transition-all duration-300 ${variantStyles} ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:opacity-50' : ''} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        </button>
    );
}
