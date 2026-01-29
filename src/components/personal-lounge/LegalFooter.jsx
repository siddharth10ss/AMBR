import React from 'react';

const LegalFooter = () => {
    return (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/40 backdrop-blur-sm border-t border-white/5 flex justify-center gap-6 text-[10px] text-white/20 z-50 pointer-events-none">
            <span>Spotify® is a registered trademark of Spotify AB</span>
            <span>YouTube™ is a trademark of Google LLC</span>
            <div className="flex gap-4 pointer-events-auto">
                <a href="https://www.spotify.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Spotify Privacy</a>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Google Privacy</a>
            </div>
        </div>
    );
};

export default LegalFooter;
