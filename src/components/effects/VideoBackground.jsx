import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VideoBackground = ({ src, fallbackColor }) => {
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const [activeVideo, setActiveVideo] = useState(1); // 1 or 2
    const [isLoaded, setIsLoaded] = useState(false);

    // Crossfade duration in seconds
    const FADE_DURATION = 1.0;

    const handleTimeUpdate = (e) => {
        const video = e.target;
        const timeLeft = video.duration - video.currentTime;

        // Start crossfade shortly before end
        if (timeLeft <= FADE_DURATION && activeVideo === (e.target === videoRef1.current ? 1 : 2)) {
            const nextVideo = activeVideo === 1 ? videoRef2.current : videoRef1.current;

            if (nextVideo && nextVideo.paused) {
                // Prepare next video
                nextVideo.currentTime = 0;
                nextVideo.play().then(() => {
                    setActiveVideo(activeVideo === 1 ? 2 : 1);
                }).catch(err => console.log("Loop Autoplay blocked", err));
            }
        }
    };

    const handleLoadedData = () => {
        // Only mark loaded when the FIRST video is ready
        if (!isLoaded) setIsLoaded(true);
    };

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {/* Fallback */}
            <div
                className="absolute inset-0 z-0 bg-black transition-opacity duration-1000"
                style={{ backgroundColor: fallbackColor }}
            />

            {/* Video 1 */}
            <motion.video
                ref={videoRef1}
                src={src}
                className="absolute inset-0 w-full h-full object-cover z-10"
                style={{ opacity: activeVideo === 1 ? 1 : 0, transition: `opacity ${FADE_DURATION}s ease-in-out` }}
                muted
                playsInline
                preload="auto"
                onLoadedData={handleLoadedData}
                onTimeUpdate={handleTimeUpdate}
                autoPlay
            />

            {/* Video 2 (Buffer) */}
            <motion.video
                ref={videoRef2}
                src={src}
                className="absolute inset-0 w-full h-full object-cover z-10"
                style={{ opacity: activeVideo === 2 ? 1 : 0, transition: `opacity ${FADE_DURATION}s ease-in-out` }}
                muted
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
            // Don't autoplay this one initially
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 z-20 pointer-events-none mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-20 pointer-events-none" />
        </div>
    );
};

export default React.memo(VideoBackground);
