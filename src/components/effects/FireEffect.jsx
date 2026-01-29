import React from 'react';
import { motion } from 'framer-motion';

const FireEffect = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
            {/* Warm Glow Base */}
            <motion.div
                animate={{ opacity: [0.6, 0.8, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[50vh] bg-orange-600/20 blur-[100px]"
            />

            {/* Flickering Flames */}
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bottom-0 w-32 h-64 bg-yellow-500/10 rounded-full blur-[40px]"
                    style={{ left: `${40 + Math.random() * 20}%` }}
                    animate={{
                        opacity: [0, 0.3, 0],
                        height: ['20vh', '40vh', '30vh'],
                        scale: [0.8, 1.1, 0.9]
                    }}
                    transition={{
                        duration: 0.5 + Math.random(),
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: Math.random()
                    }}
                />
            ))}
        </div>
    );
};

export default FireEffect;
