import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import RainDrops from './RainDrops';
import CafeInterior from './CafeInterior';
import BokehLights from './BokehLights';

const RainCafe = () => {
    // Parallax Logic
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPct = (clientX / innerWidth) - 0.5;
        const yPct = (clientY / innerHeight) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    // Smooth springs for parallax
    const springX = useSpring(x, { stiffness: 50, damping: 20 });
    const springY = useSpring(y, { stiffness: 50, damping: 20 });

    const moveBackground = useTransform(springX, [-0.5, 0.5], ["-2%", "2%"]);
    const moveMidground = useTransform(springX, [-0.5, 0.5], ["-5%", "5%"]);
    const moveForeground = useTransform(springX, [-0.5, 0.5], ["-8%", "8%"]);

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className="absolute inset-0 overflow-hidden bg-[#1a140e]"
        >
            {/* Layer 4: Ambient Background & Bokeh (Deepest) */}
            <motion.div
                className="absolute inset-[-5%] w-[110%] h-[110%]"
                style={{ x: moveBackground, y: useTransform(springY, [-0.5, 0.5], ["-2%", "2%"]) }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#2c2416] via-[#2c2416] to-[#120e09]" />
                <BokehLights />
            </motion.div>

            {/* Layer 2: Cafe Interior (Midground) */}
            <motion.div
                className="absolute inset-[-5%] w-[110%] h-[110%] flex items-end justify-center z-10 blur-[2px] opacity-80"
                style={{ x: moveMidground, y: useTransform(springY, [-0.5, 0.5], ["-3%", "3%"]) }}
            >
                <CafeInterior />
            </motion.div>

            {/* Layer 1: Window & Rain (Foreground) */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{ x: moveForeground, y: useTransform(springY, [-0.5, 0.5], ["-1%", "1%"]) }}
            >
                <RainDrops />
                {/* Window Frame Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.8)_100%)]" />
            </motion.div>
        </div>
    );
};

export default React.memo(RainCafe);
