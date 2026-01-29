import React from 'react';
import { motion } from 'framer-motion';

// 1. Reveal (Staggered Characters)
export const TextReveal = ({ text, delay = 0, className = "" }) => {
    const letters = text.split("");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay }
        }
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 }
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: { type: "spring", damping: 12, stiffness: 100 }
        }
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

// 2. Gradient (Animated Background Clip)
export const TextGradient = ({ text, from = "from-indigo-400", to = "to-purple-400", className = "" }) => {
    return (
        <motion.span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${from} via-white ${to} bg-300% ${className}`}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
            {text}
        </motion.span>
    );
};

// 3. Fade Up
export const TextFadeUp = ({ text, delay = 0, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
            className={className}
        >
            {text}
        </motion.div>
    );
};
