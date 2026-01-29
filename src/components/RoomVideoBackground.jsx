import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const RoomVideoBackground = ({
    roomId,
    children,
    enableParallax = false,
    overlayOpacity = 0.3,
    energy = 0, // -1 to 1 (Mapped to 0.5x to 2x speed)
    mood = 0    // -1 to 1 (Mapped to Hue/Saturation)
}) => {
    const [loaded, setLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef(null);

    // Apply Energy (Speed)
    useEffect(() => {
        if (videoRef.current) {
            // Map -1 (Slow) to 1 (Fast) -> 0.5x to 1.5x
            // Default 0 -> 1.0x
            const rate = 1 + (energy * 0.5);
            videoRef.current.playbackRate = Math.max(0.5, Math.min(2.0, rate));
        }
    }, [energy]);

    // Calculate Mood Filter
    // Mood (-1 to 1):
    // -1 (Cool) -> Hue Rotate -30deg, Saturate 1.2
    // 0 (Neutral) -> None
    // 1 (Warm) -> Hue Rotate +30deg, Saturate 1.2, Contrast 1.1
    const moodFilter = `hue-rotate(${mood * 30}deg) saturate(${1 + Math.abs(mood) * 0.3}) contrast(${1 + (mood > 0 ? mood * 0.1 : 0)})`;

    // Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 100 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Detect mobile
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mouse parallax
    useEffect(() => {
        if (!enableParallax || isMobile) return;

        const handleMouseMove = (e) => {
            const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
            const yPos = (e.clientY / window.innerHeight - 0.5) * 30;

            mouseX.set(xPos);
            mouseY.set(yPos);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [enableParallax, isMobile]);

    // Ensure video plays (some browsers block autoplay)
    useEffect(() => {
        if (videoRef.current && loaded) {
            videoRef.current.play().catch(err => {
                console.log('Autoplay prevented:', err);
                // Retry on user interaction
                const playOnInteraction = () => {
                    videoRef.current?.play();
                    document.removeEventListener('click', playOnInteraction);
                };
                document.addEventListener('click', playOnInteraction);
            });
        }
    }, [loaded]);

    // Video paths
    // Note: Skipping mobile suffix as specific mobile assets weren't generated in this session.
    // Using high-res assets for all.
    const webmPath = `/videos/rooms/${roomId}/animation.webm`;
    const mp4Path = `/videos/rooms/${roomId}/animation.mp4`;

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Loading State */}
            {!loaded && !videoError && (
                <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
                    <div className="text-white text-xl animate-pulse font-light tracking-widest text-[#d4a574]">
                        Loading Atmosphere...
                    </div>
                </div>
            )}

            {/* Video Background */}
            <motion.div
                className="absolute inset-0"
                style={{
                    x: enableParallax && !isMobile ? x : 0,
                    y: enableParallax && !isMobile ? y : 0,
                    scale: enableParallax ? 1.15 : 1.05, // Slight zoom to hide edges
                    filter: moodFilter // Apply visual mood
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
            >
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={() => setLoaded(true)}
                    onError={(e) => {
                        // If webm fails it might try mp4, only error if both fail
                        // But error event on video tag bubbles.
                        // We can check network state.
                        // For now, simple error handling.
                        console.warn(`Video load issue for ${roomId}`, e);
                        // Don't set error immediately, wait a bit or check readiness?
                        // Actually, if sources fail, error triggers.
                    }}
                >
                    {/* WebM for better quality/size */}
                    <source src={webmPath} type="video/webm" />

                    {/* MP4 fallback */}
                    <source src={mp4Path} type="video/mp4" />

                    Your browser does not support video backgrounds.
                </video>
            </motion.div>

            {/* Dark Overlay (helps UI elements stand out) */}
            <div
                className="absolute inset-0 pointer-events-none bg-black"
                style={{
                    opacity: overlayOpacity,
                    zIndex: 2,
                }}
            />

            {/* Vignette Effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
                    zIndex: 3,
                }}
            />

            {/* Subtle Grain Texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
                    zIndex: 4,
                }}
            />

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>

            {/* Error Fallback handled by parent Room boundary usually, but inline here: */}
            {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black z-50">
                    <div className="text-center text-white p-8">
                        <p className="text-2xl mb-4">Unable to load room atmosphere</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomVideoBackground;
