import React from 'react';
import { motion } from 'framer-motion';

const NeonGlowEffect = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 0, 110, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 110, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    perspective: '500px',
                    transform: 'scale(1.5) perspective(500px) rotateX(20deg)'
                }}
            />

            {/* Pulsing Orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-500/30 rounded-full blur-[80px]"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/30 rounded-full blur-[100px]"
            />
        </div>
    );
};

export default NeonGlowEffect;
