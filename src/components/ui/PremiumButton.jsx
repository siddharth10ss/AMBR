import sfxManager from '../../utils/sfxManager';

const PremiumButton = ({
    children,
    onClick,
    variant = "glow", // glow, lift, shine, magnetic, ripple, morph
    size = "md", // sm, md, lg, xl
    className = "",
    disabled = false,
    loading = false,
    soundEnabled = true,
    "aria-label": ariaLabel,
    ...props
}) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Magnetic Effect Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 20 });
    const springY = useSpring(y, { stiffness: 150, damping: 20 });

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (soundEnabled && !disabled && !loading) sfxManager.play('hover');
    };

    const handleClick = (e) => {
        if (soundEnabled && !disabled && !loading) sfxManager.play('click');
        if (onClick) onClick(e);
    };

    const handleMouseMove = (e) => {
        if (variant === "magnetic" && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            x.set(mouseX * 0.2); // Movement strength
            y.set(mouseY * 0.2);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    // Style Maps
    const sizeClasses = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-3.5 text-base",
        xl: "px-10 py-5 text-lg"
    };

    const baseClasses = `
        relative inline-flex items-center justify-center 
        font-medium tracking-wide rounded-full 
        transition-all duration-300 select-none
        border border-white/10
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
    `;

    // Variants Definition
    const variantsMap = {
        glow: {
            hover: {
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                borderColor: "rgba(255, 255, 255, 0.4)",
                scale: 1.02
            },
            tap: { scale: 0.98 }
        },
        lift: {
            hover: {
                y: -4,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
                borderColor: "rgba(255, 255, 255, 0.3)"
            },
            tap: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" }
        },
        shine: {
            hover: { scale: 1.05 },
            tap: { scale: 0.95 }
        },
        magnetic: {
            hover: { scale: 1.1 },
            tap: { scale: 0.9 }
        },
        ripple: {
            hover: { backgroundColor: "rgba(255,255,255,0.15)" },
            tap: { scale: 0.98 }
        },
        morph: {
            hover: { borderRadius: "12px", scale: 1.05 }, // Circle to rounded square
            tap: { scale: 0.95 }
        }
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={disabled || loading ? undefined : handleClick}
            className={`${baseClasses} ${sizeClasses[size]}`}
            style={{
                x: variant === "magnetic" ? springX : 0,
                y: variant === "magnetic" ? springY : 0
            }}
            variants={variantsMap[variant] || {}}
            whileHover={!disabled && !loading ? "hover" : undefined}
            whileTap={!disabled && !loading ? "tap" : undefined}
            aria-label={ariaLabel || (typeof children === 'string' ? children : 'Button')}
            aria-busy={loading}
            aria-disabled={disabled}
            {...props}
        >
            {/* Backgrounds */}
            <div className={`absolute inset-0 rounded-[inherit] bg-white/10 backdrop-blur-md transition-colors ${isHovered ? 'bg-white/20' : ''}`} />

            {/* Shine Effect Overlay */}
            {variant === "shine" && (
                <motion.div
                    className="absolute inset-0 -translate-x-[100%] z-10 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                    variants={{
                        hover: { x: ['100%', '-100%'] }
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            )}

            {/* Ripple Effect (Simple CSS Implementation for now, could be canvas/complex) */}
            {variant === "ripple" && (
                <span className="absolute inset-0 rounded-[inherit] overflow-hidden">
                    {/* Placeholder for click ripple logic if implemented via JS */}
                </span>
            )}

            {/* Content */}
            <div className="relative z-20 flex items-center gap-2 text-white/90">
                {loading ? (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>Loading...</span>
                    </>
                ) : (
                    children
                )}
            </div>
        </motion.button>
    );
};

export default React.memo(PremiumButton);
