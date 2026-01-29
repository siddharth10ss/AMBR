import React from 'react';
import { motion } from 'framer-motion';

export const IconBounce = ({ children }) => (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
        {children}
    </motion.div>
);

export const IconSpin = ({ children }) => (
    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
        {children}
    </motion.div>
);

export const IconPulse = ({ children }) => (
    <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
        {children}
    </motion.div>
);

export const IconFloat = ({ children, delay = 0 }) => (
    <motion.div
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
    >
        {children}
    </motion.div>
);
