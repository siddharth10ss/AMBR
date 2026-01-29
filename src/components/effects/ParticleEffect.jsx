import React from 'react';
import { motion } from 'framer-motion';

const ParticleEffect = ({ color = '#4a7c4a' }) => {
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: 3 + Math.random() * 5
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full opacity-60 blur-[1px]"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: color,
                        boxShadow: `0 0 ${p.size * 2}px ${color}`
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, -10, 0],
                        opacity: [0, 0.6, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleEffect;
