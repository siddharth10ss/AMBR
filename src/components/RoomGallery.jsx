import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import RoomCard from './RoomCard';

const RoomGallery = ({ rooms, onRoomClick }) => {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { scrollXProgress } = useScroll({ container: scrollRef });
    const scaleX = useSpring(scrollXProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Update active index based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (!scrollRef.current) return;
            const scrollLeft = scrollRef.current.scrollLeft;
            const width = scrollRef.current.offsetWidth;
            const index = Math.round(scrollLeft / (width * 0.75)); // Approx card width ratio
            // Clamp index
            const safeIndex = Math.min(Math.max(index, 0), rooms.length - 1);
            setActiveIndex(safeIndex);
        };

        const ref = scrollRef.current;
        ref?.addEventListener('scroll', handleScroll);
        return () => ref?.removeEventListener('scroll', handleScroll);
    }, [rooms.length]);

    const scrollTo = (index) => {
        if (!scrollRef.current) return;
        const width = scrollRef.current.offsetWidth;
        // On desktop, card is 70vw, on mobile 85vw. 
        // We need to calculate scroll position to center the target.
        // Simplified: scroll to child position
        const child = scrollRef.current.children[0].children[index];
        if (child) {
            child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    };

    return (
        <div className="relative w-full py-10">
            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-8 md:gap-16 px-6 md:px-[15vw] overflow-x-auto snap-x snap-mandatory scrollbar-none pb-12 pt-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex gap-8 md:gap-16">
                    {rooms.map((room, i) => (
                        <div
                            key={room.id}
                            className="snap-center shrink-0 w-[85vw] md:w-[70vw] max-w-5xl"
                        >
                            <RoomCard
                                {...room}
                                onClick={() => onRoomClick(room.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-3">
                {rooms.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollTo(i)}
                        className="group relative flex items-center justify-center p-2 outline-none"
                        aria-label={`Go to room ${i + 1}`}
                    >
                        <motion.div
                            className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/20 group-hover:bg-white/40'
                                }`}
                        />
                    </button>
                ))}
            </div>

            {/* Fade Masks */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
        </div>
    );
};

export default RoomGallery;
