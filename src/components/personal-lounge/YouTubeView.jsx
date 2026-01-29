import React, { useState, useEffect } from 'react';
import { Youtube, Search, PlayCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { youtubeConfig } from '../../config/personalLounge';

const YouTubeView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initial trending load
    useEffect(() => {
        fetchVideos('lofi hip hop radio');
    }, []);

    const fetchVideos = async (query) => {
        if (!youtubeConfig.apiKey || youtubeConfig.apiKey.includes('YOUR_')) {
            setError("API Key not configured");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&key=${youtubeConfig.apiKey}`
            );
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            setVideos(data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                channel: item.snippet.channelTitle,
                thumbnail: item.snippet.thumbnails.medium.url,
                description: item.snippet.description
            })));
        } catch (err) {
            console.error("YouTube API Error:", err);
            setError("Failed to load videos. Please check API key quota.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            fetchVideos(searchQuery);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto w-full">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search size={20} className="text-white/40" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search YouTube Music..."
                    className="w-full bg-black/40 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 focus:bg-black/60 transition-all font-medium"
                />
            </form>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
                {/* Video Player Area */}
                <div className="bg-black rounded-2xl overflow-hidden relative group border border-white/10 shadow-2xl flex flex-col">
                    {activeVideo ? (
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&controls=1&modestbranding=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/20 p-8">
                            <Youtube size={64} className="mb-4 text-red-600/50" />
                            <p className="text-center max-w-xs">Select a video to start playing.</p>
                        </div>
                    )}
                </div>

                {/* Results List */}
                <div className="flex flex-col overflow-hidden">
                    <h3 className="text-white/60 font-medium mb-4 px-2">
                        {loading ? 'Searching...' : 'Results'}
                    </h3>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm mb-4">
                            {error}
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                        {loading && videos.length === 0 ? (
                            <div className="flex justify-center p-8"><Loader className="animate-spin text-white/30" /></div>
                        ) : (
                            videos.map((video) => (
                                <motion.div
                                    key={video.id}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setActiveVideo(video)}
                                    className={`flex gap-4 p-3 rounded-xl border cursor-pointer group transition-all ${activeVideo?.id === video.id
                                            ? 'bg-red-900/20 border-red-500/30'
                                            : 'bg-white/5 hover:bg-white/10 border-white/5'
                                        }`}
                                >
                                    <div className="w-32 aspect-video bg-white/10 rounded-lg relative overflow-hidden flex-shrink-0">
                                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <PlayCircle size={24} className="text-white" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center min-w-0">
                                        <h4 className="font-bold text-white text-sm truncate pr-4" dangerouslySetInnerHTML={{ __html: video.title }} />
                                        <span className="text-xs text-white/50 mt-1">{video.channel}</span>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(YouTubeView);
