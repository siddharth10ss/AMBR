import { Howl } from 'howler';

class SFXManager {
    constructor() {
        this.sounds = {
            hover: new Howl({ src: ['/audio/hover.mp3'], volume: 0.2 }),
            click: new Howl({ src: ['/audio/click.mp3'], volume: 0.3 }),
            success: new Howl({ src: ['/audio/success.mp3'], volume: 0.4 }),
            transition: new Howl({ src: ['/audio/transition.mp3'], volume: 0.3 }),
            enter: new Howl({ src: ['/audio/enter.mp3'], volume: 0.5 }),
        };
        this.enabled = true;
    }

    play(soundName) {
        if (!this.enabled || !this.sounds[soundName]) return;
        this.sounds[soundName].play();
    }

    toggle(enabled) {
        this.enabled = enabled;
    }
}

const sfxManager = new SFXManager();
export default sfxManager;
