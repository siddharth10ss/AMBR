// Micro-interactions and Animation Variants

export const hoverScale = {
    whileHover: {
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 17 }
    }
};

export const tapScale = {
    whileTap: {
        scale: 0.95
    }
};

export const floatingAnimation = {
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const pulseGlow = {
    animate: {
        opacity: [1, 0.5, 1],
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const fadeInChild = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100 }
    }
};

export const glassShine = {
    initial: { x: "-100%" },
    whileHover: {
        x: "200%",
        transition: { duration: 0.5, ease: "easeInOut" }
    }
};
