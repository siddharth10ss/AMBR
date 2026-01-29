import { useState, useEffect } from 'react';

const useEasterEggs = () => {
    const [konamiActive, setKonamiActive] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    // Konami Code Sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const [inputSequence, setInputSequence] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const { key } = e;
            const currentSequence = [...inputSequence, key];

            // Keep sequence length same as code
            if (currentSequence.length > konamiCode.length) {
                currentSequence.shift();
            }

            setInputSequence(currentSequence);

            if (JSON.stringify(currentSequence) === JSON.stringify(konamiCode)) {
                setKonamiActive(true);
                alert("🎮 KONAMI CODE ACTIVATED! Super Vibe Mode Unlocked! 🎮");
                // Reset after use
                setInputSequence([]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputSequence]);

    // Logo Double Click
    const handleLogoDoubleClick = () => {
        alert("✨ Sparkle! You found a hidden delight! ✨");
    };

    return { konamiActive, handleLogoDoubleClick };
};

export default useEasterEggs;
