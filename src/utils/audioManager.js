import { Howl } from 'howler';

class AudioManager {
    constructor() {
        this.rooms = new Map(); // roomId -> { tracks: [Howl], metadata: [trackData], currentIndex: 0 }
        this.currentRoomId = null;
        this.volume = 0.5;
        this.fadeDuration = 1000;
        this.crossfadeDuration = 1500;
        this.listeners = new Set();
    }

    init(roomsData) {
        roomsData.forEach(room => {
            if (room.tracks && room.tracks.length > 0) {
                this.loadRoom(room.id, room.tracks, room.aiTracks || []);
            }
        });
    }

    loadRoom(roomId, trackData, aiTracksData = []) {
        if (this.rooms.has(roomId)) return;

        const tracks = trackData.map(data => new Howl({
            src: [data.src],
            loop: true,
            volume: 0,
            html5: true,
            preload: true
        }));

        const aiTracks = aiTracksData.map(data => new Howl({
            src: [data.src],
            loop: true,
            volume: 0,
            html5: true,
            preload: true
        }));

        this.rooms.set(roomId, {
            tracks: tracks,
            metadata: trackData,
            aiTracks: aiTracks,
            aiMetadata: aiTracksData,
            currentIndex: 0
        });
    }

    // AI / Smart Mix Logic
    generateSmartMix(roomId) {
        if (!this.rooms.has(roomId)) return null;

        const room = this.rooms.get(roomId);
        if (!room.aiTracks || room.aiTracks.length === 0) return null;

        // Pick a random AI track that is NOT currently playing if possible
        const aiIndex = Math.floor(Math.random() * room.aiTracks.length);
        const aiSound = room.aiTracks[aiIndex];
        const currentSound = room.tracks[room.currentIndex]; // The currently playing "Normal" track

        // Stop Normal Track
        currentSound.fade(this.volume, 0, 1000);
        setTimeout(() => currentSound.stop(), 1000);

        // Stop any other active AI tracks first
        room.aiTracks.forEach(t => { if (t !== aiSound && t.playing()) t.stop(); });

        // Play AI Track
        aiSound.volume(0);
        aiSound.play();
        aiSound.fade(0, this.volume, 1000);

        // Randomize Rate for "AI" effect
        const currentRate = Math.random() > 0.5 ? 1.05 : 0.95;
        aiSound.rate(currentRate);

        return {
            mode: 'AI_OPTIMIZED',
            rate: currentRate,
            trackName: room.aiMetadata[aiIndex].title,
        };
    }

    playRoom(roomId) {
        if (!this.rooms.has(roomId)) {
            console.warn(`AudioManager: Room ${roomId} not found.`);
            return;
        }

        // If already playing this room, just ensure it's running
        if (this.currentRoomId === roomId) {
            const room = this.rooms.get(roomId);
            const currentSound = room.tracks[room.currentIndex];
            if (currentSound && !currentSound.playing()) {
                currentSound.play();
            }
            return;
        }

        const nextRoom = this.rooms.get(roomId);
        const nextSound = nextRoom.tracks[nextRoom.currentIndex];

        // Stop all other rooms but NOT the one we are about to play (if it was somehow playing)
        this.rooms.forEach((room, id) => {
            if (id !== roomId) {
                room.tracks.forEach(track => {
                    if (track.playing()) {
                        track.fade(track.volume(), 0, 800);
                        setTimeout(() => track.stop(), 800);
                    }
                });
            }
        });

        // Play the new room
        nextSound.volume(0);
        nextSound.play();
        nextSound.fade(0, this.volume, 1000);

        this.currentRoomId = roomId;
        this.notifyListeners();
    }

    // New: Track Navigation
    playTrack(roomId, index) {
        const room = this.rooms.get(roomId);
        if (!room || index === room.currentIndex) return;

        const oldSound = room.tracks[room.currentIndex];
        const newSound = room.tracks[index];

        // Crossfade tracks within the same room
        oldSound.fade(this.volume, 0, 1000);
        oldSound.once('fade', () => oldSound.stop());

        newSound.volume(0);
        newSound.play();
        newSound.fade(0, this.volume, 1000);

        room.currentIndex = index;
        this.notifyListeners();
    }

    nextTrack() {
        if (!this.currentRoomId) return;
        const room = this.rooms.get(this.currentRoomId);
        const nextIndex = (room.currentIndex + 1) % room.tracks.length;
        this.playTrack(this.currentRoomId, nextIndex);
    }

    prevTrack() {
        if (!this.currentRoomId) return;
        const room = this.rooms.get(this.currentRoomId);
        const prevIndex = (room.currentIndex - 1 + room.tracks.length) % room.tracks.length;
        this.playTrack(this.currentRoomId, prevIndex);
    }

    getCurrentTrackInfo() {
        if (!this.currentRoomId) return null;
        const room = this.rooms.get(this.currentRoomId);
        return room.metadata[room.currentIndex];
    }

    resumeContext() {
        if (Howler.ctx && Howler.ctx.state !== 'running') {
            Howler.ctx.resume();
        }
    }

    // Standard Controls
    stopAll(resetCurrent = true) {
        // Stop currently tracked room
        if (this.currentRoomId) {
            const room = this.rooms.get(this.currentRoomId);
            if (room) {
                const sound = room.tracks[room.currentIndex];
                if (sound) {
                    sound.fade(this.volume, 0, 500);
                    setTimeout(() => sound.stop(), 500);
                }
            }
        }

        // Safety: Iterate all rooms and stop everything to prevent leaks
        this.rooms.forEach(room => {
            room.tracks.forEach(track => {
                if (track.playing()) {
                    track.stop();
                }
            });
        });

        if (resetCurrent) {
            this.currentRoomId = null;
        }
        this.notifyListeners();
    }

    crossfade(fromRoomId, toRoomId) {
        const fromRoom = this.rooms.get(fromRoomId);
        const toRoom = this.rooms.get(toRoomId);

        if (fromRoom) {
            const fromSound = fromRoom.tracks[fromRoom.currentIndex];
            // Stop immediately if fading is causing issues, or short fade
            fromSound.fade(this.volume, 0, 500);
            setTimeout(() => fromSound.stop(), 500);
        }

        if (toRoom) {
            const toSound = toRoom.tracks[toRoom.currentIndex];
            // Ensure volume is set before playing
            toSound.volume(0);
            toSound.play();
            toSound.fade(0, this.volume, 1000); // Shorter fade
        }
    }

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        if (this.currentRoomId) {
            const room = this.rooms.get(this.currentRoomId);
            room.tracks[room.currentIndex].volume(this.volume);
        }
    }

    setRate(rate) {
        // Clamp rate between 0.5x and 2.0x for safety
        const safeRate = Math.max(0.5, Math.min(2.0, rate));
        if (this.currentRoomId) {
            const room = this.rooms.get(this.currentRoomId);
            // Apply rate to all tracks in the room to ensure seamless transitions if crossfades happen
            room.tracks.forEach(track => track.rate(safeRate));
        }
    }

    getCurrentVolume() {
        return this.volume;
    }

    // Subscription for UI
    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    // AI / Smart Mix Logic
    generateSmartMix(roomId) {
        if (!this.rooms.has(roomId)) return null;

        const room = this.rooms.get(roomId);
        // Only proceed if we have AI tracks for this room
        // For the hackathon demo, we might need to mock this if the data ins't fully loaded
        // Let's assume we injected "aiTracks" into the rooms setup or we find them by ID

        // Mock selection logic for demo
        // 1. Pick a random "AI" track (or just the next available one that isn't playing)
        // Since we didn't actually load "AI" tracks into the Howl array in loadRoom (unless we update init),
        // we might just pitch shift the CURRENT track to simulate a new "AI" version?
        // OR better: Just shift pitch/rate of current track to simulate adaptation.

        const currentRate = Math.random() > 0.5 ? 1.1 : 0.85; // Faster or Slower
        this.setRate(currentRate);

        // Notify UI that we are "AI Optimized"
        return {
            mode: 'AI_OPTIMIZED',
            rate: currentRate,
            trackName: `✨ AI Mix: ${room.metadata[room.currentIndex]?.title || 'Vibe'}`,
        };
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb({
            track: this.getCurrentTrackInfo(),
            roomId: this.currentRoomId
        }));
    }
}

const audioManager = new AudioManager();
export default audioManager;
