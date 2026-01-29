import { useState, useEffect, useCallback } from 'react';

const useAutoHide = (timeout = 8000, shouldAutoHide = true) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastInteraction, setLastInteraction] = useState(Date.now());

    const resetTimer = useCallback(() => {
        setIsVisible(true);
        setLastInteraction(Date.now());
    }, []);

    useEffect(() => {
        // If we shouldn't auto hide, force visibility and do nothing else
        if (!shouldAutoHide) {
            setIsVisible(true);
            return;
        }

        // Events to track
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('keydown', resetTimer);
        window.addEventListener('touchstart', resetTimer);

        // Timer check
        const interval = setInterval(() => {
            if (Date.now() - lastInteraction > timeout) {
                setIsVisible(false);
            }
        }, 1000);

        return () => {
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            window.removeEventListener('touchstart', resetTimer);
            clearInterval(interval);
        };
    }, [timeout, lastInteraction, resetTimer, shouldAutoHide]);

    return [isVisible, setIsVisible];
};

export default useAutoHide;
