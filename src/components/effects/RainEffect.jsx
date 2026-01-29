import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const RainEffect = ({ intensity = "medium" }) => {

    const dropCount = useMemo(() => {
        return intensity === "high" ? 120 : intensity === "low" ? 50 : 80;
    }, [intensity]);

    const drops = useMemo(() => {
        return Array.from({ length: dropCount }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // %
            delay: Math.random() * 2, // s
            duration: 0.5 + Math.random() * 1, // s
            opacity: 0.1 + Math.random() * 0.3,
            length: 50 + Math.random() * 50 // px
        }));
    }, [dropCount]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 selection:bg-transparent">
            {/* Rain Drops */}
            {drops.map((drop) => (
                <div
                    key={drop.id}
                    className="absolute top-0 w-[1px] bg-gradient-to-b from-transparent via-blue-100/40 to-transparent will-change-transform translate-z-0"
                    style={{
                        left: `${drop.left}%`,
                        height: `${drop.length}px`,
                        opacity: drop.opacity,
                        animation: `rainfall ${drop.duration}s linear infinite`,
                        animationDelay: `-${drop.delay}s`,
                    }}
                />
            ))}

            {/* Window Glass Overlay (Subtle) */}
            <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-[1px]" />

            {/* Window Frame/Droplets Overlay */}
            <div className="absolute inset-0 z-20 opacity-30 mix-blend-overlay">
                {/* Static droplets on glass (simulated with radial gradients) */}
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={`static-${i}`}
                        className="absolute rounded-full bg-white/20 blur-[1px]"
                        style={{
                            left: `${Math.random() * 90 + 5}%`,
                            top: `${Math.random() * 90 + 5}%`,
                            width: Math.random() * 4 + 2 + 'px',
                            height: Math.random() * 4 + 2 + 'px',
                        }}
                        animate={{
                            y: [0, 20, 100],
                            opacity: [0.5, 0.8, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeIn"
                        }}
                    />
                ))}
            </div>

            {/* CSS Animation Keyframes */}
            <style jsx>{`
                @keyframes rainfall {
                    0% {
                        transform: translateY(-200px);
                    }
                    100% {
                        transform: translateY(110vh);
                    }
                }
            `}</style>
        </div>
    );
};

export default React.memo(RainEffect);
