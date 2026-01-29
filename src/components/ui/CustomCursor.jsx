import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

const CustomCursor = () => {
    const { cursorVariant } = useCursor();
    const [isPointer, setIsPointer] = useState(false);

    // Use MotionValues for high-performance updates without re-renders
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const mouseMove = (e) => {
            // Update MotionValues directly - this is already fast
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Throttle checks for pointer style to every 100ms or so if needed, but simple tag checks are fast.
            // Let's add a small requestAnimationFrame throttle for the logic part if it feels heavy
            requestAnimationFrame(() => {
                const target = e.target;
                // Expanded check
                const isClickable =
                    target.tagName === 'BUTTON' ||
                    target.tagName === 'A' ||
                    target.tagName === 'INPUT' ||
                    target.tagName === 'LABEL' ||
                    target.classList.contains('cursor-pointer') ||
                    target.closest('button') ||
                    target.closest('a') ||
                    (target instanceof HTMLElement && target.style.cursor === 'pointer');

                if (!!isClickable !== isPointer) {
                    setIsPointer(!!isClickable);
                }
            });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, [mouseX, mouseY, isPointer]);

    // Variants for the main cursor shape
    const variants = {
        default: {
            height: 24,
            width: 24,
            backgroundColor: "rgba(255, 255, 255, 0)",
            border: "2px solid rgba(255, 255, 255, 0.5)",
            mixBlendMode: "difference"
        },
        hover: {
            height: 40,
            width: 40,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "2px solid rgba(255, 255, 255, 0.8)",
            mixBlendMode: "difference"
        },
        click: {
            height: 16,
            width: 16,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "2px solid rgba(255, 255, 255, 1)",
            mixBlendMode: "normal"
        }
    };

    const activeVariant = cursorVariant !== 'default' ? cursorVariant : (isPointer ? 'hover' : 'default');

    return (
        <>
            {/* Main Cursor (Spring physics) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                variants={variants}
                animate={activeVariant}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.8
                }}
            />

            {/* Small Dot (follows instantly) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 4,
                    height: 4
                }}
            />
        </>
    );
};

export default CustomCursor;
