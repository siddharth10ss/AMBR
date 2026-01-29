import React, { useState } from 'react';
import { Music, AlertCircle, Heart } from 'lucide-react';

const SpotifyView = () => {
    const [isConnected, setIsConnected] = useState(false);

    if (!isConnected) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-[#1DB954]/20 p-6 rounded-full mb-6 animate-pulse">
                    <Music size={48} className="text-[#1DB954]" />
                </div>
                <h2 className="heading-sm mb-2 text-white">Connect to Spotify</h2>
                <p className="text-white/60 max-w-md mb-8">
                    Link your Premium account to stream your favorite playlists, albums, and tracks directly in the lounge.
                </p>
                <button
                    onClick={() => setIsConnected(true)}
                    className="px-8 py-4 bg-[#1DB954] text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(29,185,84,0.3)]"
                >
                    Connect Spotify
                </button>
                <p className="mt-4 text-xs text-white/30">Requires Spotify Premium</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-6">
            {/* Header / Search */}
            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <Music className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input
                        type="text"
                        placeholder="Search songs, artists, or podcasts..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-white/40 focus:outline-none focus:border-[#1DB954]/50 focus:bg-white/10 transition-all"
                    />
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-black font-bold">A</div>
                    <span className="text-sm font-medium">Admin</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                {/* Left: Library */}
                <div className="md:col-span-1 glass rounded-2xl p-4 flex flex-col overflow-hidden">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Your Library</h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                        {['Liked Songs', 'Cyberpunk Mix', 'Lofi Focus', 'Discover Weekly', 'Late Night Jazz'].map((playlist, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group">
                                <div className={`w-12 h-12 rounded-md ${i === 0 ? 'bg-gradient-to-br from-indigo-500 to-purple-500' : 'bg-white/10'} flex items-center justify-center`}>
                                    {i === 0 ? <Heart size={16} className="text-white" /> : <Music size={16} className="text-white/30" />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-white group-hover:text-[#1DB954] transition-colors">{playlist}</span>
                                    <span className="text-xs text-white/40">Playlist • Spotify</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Results / Featured */}
                <div className="md:col-span-2 glass rounded-2xl p-6 overflow-y-auto custom-scrollbar">
                    <h3 className="text-lg font-bold text-white mb-4">Good Evening</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        {[1, 2, 3, 4, 5, 6].map((_, i) => (
                            <div key={i} className="bg-white/5 hover:bg-white/10 p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors group">
                                <div className="w-12 h-12 bg-white/10 rounded-md shadow-lg" />
                                <span className="font-medium text-sm truncate group-hover:text-white">Daily Mix {i + 1}</span>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-4">Made For You</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="p-4 bg-[#181818] hover:bg-[#282828] rounded-xl cursor-pointer transition-colors group">
                                <div className="w-full aspect-square bg-white/10 rounded-lg mb-4 shadow-lg group-hover:shadow-2xl transition-shadow relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h4 className="font-bold text-white mb-1 truncate">Discover Weekly</h4>
                                <p className="text-xs text-[#a7a7a7] line-clamp-2">Your weekly mixtape of fresh music.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SpotifyView);
