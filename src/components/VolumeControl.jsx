import React, { useState, useEffect } from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';

const VolumeControl = ({ initialVolume = 50, onChange }) => {
    const [volume, setVolume] = useState(initialVolume);
    const [isMuted, setIsMuted] = useState(false);
    const [prevVolume, setPrevVolume] = useState(initialVolume);

    useEffect(() => {
        // Debounce the onChange callback to avoid excessive updates during sliding
        const timeoutId = setTimeout(() => {
            if (onChange) {
                onChange(isMuted ? 0 : volume / 100);
            }
        }, 100); // 100ms delay

        return () => clearTimeout(timeoutId);
    }, [volume, isMuted, onChange]);

    const handleSliderChange = (e) => {
        const newVal = Number(e.target.value);
        setVolume(newVal);
        if (newVal > 0 && isMuted) {
            setIsMuted(false);
        }
    };

    const toggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            setVolume(prevVolume || 50);
        } else {
            setPrevVolume(volume);
            setIsMuted(true);
            setVolume(0);
        }
    };

    const getIcon = () => {
        if (isMuted || volume === 0) return <VolumeX size={20} />;
        if (volume < 50) return <Volume1 size={20} />;
        return <Volume2 size={20} />;
    };

    return (
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md transition-all hover:bg-white/10 group">
            <button
                onClick={toggleMute}
                className="text-white/70 hover:text-white transition-colors outline-none focus:text-white"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {getIcon()}
            </button>

            <div className="relative flex items-center w-24 h-4">
                {/* Custom Track Background */}
                <div className="absolute w-full h-1 bg-white/20 rounded-lg overflow-hidden">
                    {/* Filled portion */}
                    <div
                        className="h-full bg-white transition-all duration-75 ease-out"
                        style={{ width: `${isMuted ? 0 : volume}%` }}
                    />
                </div>

                {/* The actual input slider (invisible but clickable) */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleSliderChange}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    aria-label="Volume"
                />

                {/* Thumb (Visual only, follows volume) */}
                <div
                    className="absolute h-3 w-3 bg-white rounded-full shadow-md pointer-events-none transition-all duration-75 ease-out"
                    style={{
                        left: `calc(${isMuted ? 0 : volume}% - 6px)`,
                        transform: 'scale(1)',
                    }}
                />
            </div>

            <span className="text-xs text-white/50 w-8 text-right tabular-nums">
                {isMuted ? 0 : volume}%
            </span>
        </div>
    );
};

export default VolumeControl;
