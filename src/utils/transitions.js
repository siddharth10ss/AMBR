// Page Transition Variants
export const pageTransition = {
    initial: {
        opacity: 0,
        filter: "blur(20px)",
        scale: 1.05
    },
    animate: {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        filter: "blur(20px)",
        scale: 0.95,
        transition: {
            duration: 0.5,
            ease: "easeIn",
        },
    }
};

export const slideUpTransition = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};
