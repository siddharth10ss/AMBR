// Spotify Configuration
export const spotifyConfig = {
    clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID || 'YOUR_SPOTIFY_CLIENT_ID',
    redirectUri: window.location.origin + '/callback',
    scopes: [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-library-read',
        'playlist-read-private'
    ].join(' ')
};

// YouTube Configuration  
export const youtubeConfig = {
    apiKey: import.meta.env.VITE_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY',
    playlistLimit: 50,
    searchLimit: 20
};

// My Files Configuration
export const myFilesConfig = {
    maxFileSize: 50 * 1024 * 1024, // 50MB
    acceptedFormats: ['.mp3', '.wav', '.ogg', '.m4a', '.flac'],
    maxFiles: 100
};
