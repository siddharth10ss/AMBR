import React from 'react';

const RoomEnhancements = ({ roomId }) => {
    if (roomId === 'neon-lounge') {
        return (
            <div className="absolute inset-0 pointer-events-none z-[5]">
                {/* Subtle scanlines */}
                <div
                    className="w-full h-full opacity-20"
                    style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
                    }}
                />
                {/* Slight vignette boost for neon */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(20,0,40,0.4)_100%)]" />
            </div>
        );
    }

    if (roomId === 'forest-focus') {
        return (
            <div className="absolute inset-0 pointer-events-none z-[5]">
                {/* Subtle sunbeams overlay could go here if static, but keeping minimal as requested */}
            </div>
        );
    }

    // For other rooms (Rain Cafe, Cozy Cabin), return null (trust Video/Whisk animation)
    return null;
};

export default RoomEnhancements;
