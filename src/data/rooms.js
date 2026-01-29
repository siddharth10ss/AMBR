// Room Configuration Data

export const ROOMS_DATA = [
    {
        id: 'rain-cafe',
        name: 'Rainy Café',
        description: 'A cozy corner with jazz and gentle rain sounds for deep focus.',
        currentUsers: 142,
        mood: 'Focus',
        tracks: [
            { id: 'rain-1', title: 'Chill Lofi', src: '/audio/Rainy Cafe/chill-lofi-music-409356.mp3' },
            { id: 'rain-2', title: 'Coffee Shop Vibes', src: '/audio/Rainy Cafe/coffee-lofi-lofi-music-chill-ambient-458900.mp3' },
            { id: 'rain-3', title: 'Late Night Study', src: '/audio/Rainy Cafe/lofi-chill-2-466475.mp3' }
        ],
        aiTracks: [
            { title: "Neuro-Focus Vibe (AI)", src: "/audio/Rainy Cafe/lofi-chill-2-466475.mp3" },
            { title: "Deep Chill Gen-X (AI)", src: "/audio/Rainy Cafe/coffee-lofi-lofi-music-chill-ambient-458900.mp3" }
        ],
        aiTracks: [
            { title: "Neuro-Focus Vibe (AI)", src: "/audio/Rainy Cafe/lofi-chill-2-466475.mp3" },
            { title: "Deep Chill Gen-X (AI)", src: "/audio/Rainy Cafe/coffee-lofi-lofi-music-chill-ambient-458900.mp3" }
        ],
        video: '/videos/rooms/rain-cafe/animation.webm',
        backgroundEffect: 'rain',
        backgroundGradient: 'from-slate-900 to-gray-900',
        colors: { bg: '#2c2416', accent: '#d4a574', secondary: '#4a3b2a', text: '#f5e6d3' }
    },
    {
        id: 'forest-focus',
        name: 'Forest Focus',
        description: 'Birdsong and rustling leaves in a sunlit grove.',
        currentUsers: 89,
        mood: 'Focus',
        tracks: [
            { id: 'forest-1', title: 'Moonlit Forest', src: '/audio/Forest Creek/moonlit-forest-410597.mp3' },
            { id: 'forest-2', title: 'Forest Meditation', src: '/audio/Forest Creek/music-meditation-forest-rain-animal-birds-421046.mp3' },
            { id: 'forest-3', title: 'Zen Garden', src: '/audio/Forest Creek/zen-garden-tibetan-bowls-calming-music-for-toddlers-387024.mp3' }
        ],
        aiTracks: [
            { title: "Meditative State Alpha (AI)", src: "/audio/Forest Creek/zen-garden-tibetan-bowls-calming-music-for-toddlers-387024.mp3" },
            { title: "Bamboo Flow (AI)", src: "/audio/Forest Creek/music-meditation-forest-rain-animal-birds-421046.mp3" }
        ],
        video: '/videos/rooms/forest-focus/animation.mp4',
        backgroundEffect: 'particles',
        backgroundGradient: 'from-emerald-900 to-green-900',
        colors: { bg: '#064e3b', accent: '#34d399', secondary: '#10b981', text: '#d1fae5' }
    },
    {
        id: 'neon-lounge',
        name: 'Neon Lounge',
        description: 'Cyberpunk synths and humming city lights.',
        currentUsers: 204,
        mood: 'Vibe',
        tracks: [
            { id: 'neon-1', title: 'Dreamy Synth', src: '/audio/Neon Lounge/dreamy-synthwave-music-349457.mp3' },
            { id: 'neon-2', title: 'Cyberpunk 3025', src: '/audio/Neon Lounge/in-3025-sci-fi-electronic-ambient-music-384511.mp3' },
            { id: 'neon-3', title: 'Retro Arcade', src: '/audio/Neon Lounge/synthwave-for-games-147920.mp3' }
        ],
        aiTracks: [
            { title: "Synthwave Dream v4 (AI)", src: "/audio/Neon Lounge/in-3025-sci-fi-electronic-ambient-music-384511.mp3" },
            { title: "Cyber City Pulse (AI)", src: "/audio/Neon Lounge/synthwave-for-games-147920.mp3" }
        ],
        aiTracks: [
            { title: "Synthwave Dream v4 (AI)", src: "/audio/Neon Lounge/in-3025-sci-fi-electronic-ambient-music-384511.mp3" },
            { title: "Cyber City Pulse (AI)", src: "/audio/Neon Lounge/synthwave-for-games-147920.mp3" }
        ],
        video: '/videos/rooms/neon-lounge/animation.webm',
        backgroundEffect: 'neon',
        backgroundGradient: 'from-fuchsia-900 to-indigo-900',
        colors: { bg: '#4a044e', accent: '#e879f9', secondary: '#c026d3', text: '#fae8ff' }
    },
    {
        id: 'cozy-cabin',
        name: 'Cozy Cabin',
        description: 'Warm fire crackling and soft acoustic guitar.',
        currentUsers: 56,
        mood: 'Relax',
        tracks: [
            { id: 'cabin-1', title: 'Acoustic Warmth', src: '/audio/Cozy Cabin/acoustic-guitar-music-459424.mp3' },
            { id: 'cabin-2', title: 'Gentle Strum', src: '/audio/Cozy Cabin/acoustic-guitar-music-471196.mp3' },
            { id: 'cabin-3', title: 'Lakeside Guitar', src: '/audio/Cozy Cabin/smooth-waters-115977.mp3' }
        ],
        aiTracks: [
            { title: "Abyss Echoes (AI)", src: "/audio/Cozy Cabin/acoustic-guitar-music-471196.mp3" },
            { title: "Tidal Sleep (AI)", src: "/audio/Cozy Cabin/acoustic-guitar-music-459424.mp3" }
        ],
        video: '/videos/rooms/cozy-cabin/animation.mp4',
        backgroundEffect: 'fire',
        backgroundGradient: 'from-[#1a0f0a] to-[#2b1810]',
        colors: { bg: '#1a0f0a', accent: '#ff6b35', secondary: '#8a4020', text: '#fff4e6' }
    },
    {
        id: 'personal-lounge',
        name: 'Personal Lounge',
        description: 'Your music, your way. Connect Spotify, YouTube, or play local files.',
        currentUsers: 1,
        mood: 'Custom',
        tracks: [], // Custom handling
        backgroundEffect: 'particles', // Default
        backgroundGradient: 'from-violet-900 via-fuchsia-900 to-purple-900',
        colors: { bg: '#2e1065', accent: '#d8b4fe', secondary: '#c026d3', text: '#f3e8ff' },
        icon: '🎧' // Custom icon property if needed by UI
    }
];
