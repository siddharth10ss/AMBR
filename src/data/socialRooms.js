export const SOCIAL_ROOMS_DATA = [
    {
        id: 'room-alex',
        name: "Alex's Chill Session",
        type: 'friend', // Green
        users: 3,
        maxUsers: 6,
        orbit: { radius: 3.2, speed: 0.2, angle: 0, height: 0.5 },
        aiTracks: [
            { title: "Neuro-Focus Vibe (AI)", src: "/audio/Rainy Cafe/chill-lofi-music-409356.mp3" },
            { title: "Deep Chill Gen-X (AI)", src: "/audio/Rainy Cafe/coffee-lofi-lofi-music-chill-ambient-458900.mp3" }
        ]
    },
    {
        id: 'room-public-1',
        name: "Lofi Study Group",
        type: 'public', // Blue
        users: 8,
        maxUsers: 10,
        orbit: { radius: 3.8, speed: 0.12, angle: 2, height: -0.8 },
        aiTracks: [
            { title: "Study Flow Theta (AI)", src: "/audio/Rainy Cafe/lofi-chill-2-466475.mp3" },
            { title: "Cognitive Rain (AI)", src: "/audio/Rainy Cafe/chill-lofi-music-409356.mp3" }
        ]
    },
    {
        id: 'room-public-2',
        name: "Neon Nights",
        type: 'public', // Blue
        users: 4,
        maxUsers: 8,
        orbit: { radius: 3.5, speed: 0.15, angle: 4, height: 1.2 },
        aiTracks: [
            { title: "Synthwave Dream v4 (AI)", src: "/audio/Neon Lounge/dreamy-synthwave-music-349457.mp3" },
            { title: "Cyber City Pulse (AI)", src: "/audio/Neon Lounge/in-3025-sci-fi-electronic-ambient-music-384511.mp3" }
        ]
    },
    {
        id: 'new-1',
        name: "Create Vibe Room",
        type: 'empty', // White
        users: 0,
        maxUsers: 0,
        orbit: { radius: 3.0, speed: 0.08, angle: 5.5, height: 0 },
        aiTracks: []
    },
    {
        id: 'new-2',
        name: "Create Vibe Room",
        type: 'empty', // White
        users: 0,
        maxUsers: 0,
        orbit: { radius: 4.2, speed: 0.05, angle: 1, height: -0.5 },
        aiTracks: []
    },
    {
        id: 'zen-1',
        name: "Zen Garden 🎋",
        type: 'special', // Gold/Zen ??
        users: 12,
        maxUsers: 20,
        orbit: { radius: 4.5, speed: 0.1, angle: 3, height: 1.5 },
        aiTracks: [
            { title: "Meditative State Alpha (AI)", src: "/audio/Forest Creek/zen-garden-tibetan-bowls-calming-music-for-toddlers-387024.mp3" },
            { title: "Bamboo Flow (AI)", src: "/audio/Forest Creek/music-meditation-forest-rain-animal-birds-421046.mp3" }
        ]
    },
    {
        id: 'cosmic-1',
        name: "Cosmic Library 📚",
        type: 'public',
        users: 5,
        maxUsers: 8,
        orbit: { radius: 3.9, speed: 0.18, angle: 4.5, height: 0.2 },
        aiTracks: [
            { title: "Stellar Drift (AI)", src: "/audio/Neon Lounge/dreamy-synthwave-music-349457.mp3" },
            { title: "Nebula Reading (AI)", src: "/audio/Cozy Cabin/smooth-waters-115977.mp3" }
        ]
    },
    {
        id: 'ocean-1',
        name: "Ocean Deep 🌊",
        type: 'friend',
        users: 2,
        maxUsers: 4,
        orbit: { radius: 3.3, speed: 0.25, angle: 5, height: -1.2 },
        aiTracks: [
            { title: "Abyss Echoes (AI)", src: "/audio/Cozy Cabin/acoustic-guitar-music-471196.mp3" },
            { title: "Tidal Sleep (AI)", src: "/audio/Cozy Cabin/acoustic-guitar-music-459424.mp3" }
        ]
    }
];
