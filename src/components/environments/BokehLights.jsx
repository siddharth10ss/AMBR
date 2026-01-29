import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const BokehLights = () => {
    const lights = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 80 + 10, // Keep away from extreme edges
            size: Math.random() * 80 + 40,
            color: Math.random() > 0.6 ? '#d4a574' : '#ff9f43', // Amber/Orange
            duration: Math.random() * 4 + 3,
            delay: Math.random() * 2
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {lights.map(light => (
                <motion.div
                    key={light.id}
                    className="absolute rounded-full mix-blend-screen blur-xl"
                    style={{
                        left: `${light.x}%`,
                        top: `${light.y}%`,
                        width: light.size,
                        height: light.size,
                        background: `radial-gradient(circle, ${light.color}40 0%, transparent 70%)`,
                    }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1],
                        x: [0, Math.random() * 20 - 10, 0]
                    }}
                    transition={{
                        duration: light.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: light.delay
                    }}
                />
            ))}
        </div>
    );
};

export default React.memo(BokehLights);
