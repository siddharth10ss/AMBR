import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const AmbientParticles = ({
    count = 20,
    speed = "normal", // slow, normal, fast
    mode = "calm" // calm, energetic, minimal
}) => {

    // Configuration based on props
    const speedMultiplier = useMemo(() => {
        switch (speed) {
            case "slow": return 1.5;
            case "fast": return 0.5;
            default: return 1;
        }
    }, [speed]);

    const particles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // %
            y: Math.random() * 100, // %
            size: Math.random() * 4 + 1, // px
            opacity: Math.random() * 0.5 + 0.1,
            duration: (15 + Math.random() * 20) * speedMultiplier,
            delay: Math.random() * 20
        }));
    }, [count, speedMultiplier]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white rounded-full blur-[1px] will-change-transform translate-z-0" // Hardware acceleration hints
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [p.opacity, p.opacity * 1.5, p.opacity]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear",
                        delay: p.delay
                    }}
                />
            ))}
        </div>
    );
};

export default React.memo(AmbientParticles);
