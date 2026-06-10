export default function GlassCard({ children, className = '', hoverEffect = true, ...props }) {
    return (
        <div 
            className={`glass-panel overflow-hidden relative ${hoverEffect ? 'hover:-translate-y-1' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
