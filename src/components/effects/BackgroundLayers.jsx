import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const BackgroundLayers = ({ theme = "rainCafe" }) => {
    // Mouse Parallax Logic
    const ref = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse movement
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Normalize -0.5 to 0.5
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Theme Configuration
    const getThemeColors = () => {
        switch (theme) {
            case 'forestFocus':
                return {
                    bg: 'from-green-950 via-green-900 to-black',
                    blob1: 'bg-green-600/20',
                    blob2: 'bg-emerald-500/10',
                    blob3: 'bg-teal-900/40'
                };
            case 'neonLounge':
                return {
                    bg: 'from-indigo-950 via-purple-950 to-black',
                    blob1: 'bg-purple-600/20',
                    blob2: 'bg-pink-500/10',
                    blob3: 'bg-blue-900/40'
                };
            case 'cozyCabin':
                return {
                    bg: 'from-orange-950 via-red-950 to-black',
                    blob1: 'bg-orange-600/20',
                    blob2: 'bg-amber-700/10',
                    blob3: 'bg-red-900/40'
                };
            case 'rainCafe':
            default:
                return {
                    bg: 'from-slate-900 via-gray-900 to-black',
                    blob1: 'bg-blue-600/10',
                    blob2: 'bg-indigo-500/10',
                    blob3: 'bg-gray-800/40'
                };
        }
    };

    const colors = getThemeColors();

    // Parallax Transforms
    const layer1X = useTransform(springX, [-0.5, 0.5], ['2%', '-2%']);
    const layer1Y = useTransform(springY, [-0.5, 0.5], ['2%', '-2%']);

    const layer2X = useTransform(springX, [-0.5, 0.5], ['5%', '-5%']);
    const layer2Y = useTransform(springY, [-0.5, 0.5], ['5%', '-5%']);

    const layer3X = useTransform(springX, [-0.5, 0.5], ['-3%', '3%']); // Inverse
    const layer3Y = useTransform(springY, [-0.5, 0.5], ['-3%', '3%']);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Layer 1: Base Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`} />

            {/* Layer 2: Large Blurred Blob (Back) */}
            <motion.div
                style={{ x: layer1X, y: layer1Y }}
                className={`absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[100px] mix-blend-screen opacity-60 ${colors.blob1}`}
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Layer 3: Secondary Blob (Mid) - Opposite Motion */}
            <motion.div
                style={{ x: layer3X, y: layer3Y }}
                className={`absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] mix-blend-screen opacity-50 ${colors.blob2}`}
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, -20, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Layer 4: Accent Blob (Front) - Most Parallax */}
            <motion.div
                style={{ x: layer2X, y: layer2Y }}
                className={`absolute top-[20%] right-[30%] w-[40vw] h-[40vw] rounded-full blur-[80px] mix-blend-screen opacity-40 ${colors.blob3}`}
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Layer 5: Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Layer 6: Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80" />
        </div>
    );
};

export default React.memo(BackgroundLayers);
