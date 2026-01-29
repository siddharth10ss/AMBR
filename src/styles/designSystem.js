export const designSystem = {
    // Typography scale with Tailwind classes
    typography: {
        headings: {
            h1: 'text-4xl md:text-6xl font-bold tracking-tight',
            h2: 'text-3xl md:text-5xl font-semibold tracking-tight',
            h3: 'text-2xl md:text-3xl font-semibold',
            h4: 'text-xl md:text-2xl font-medium',
        },
        body: {
            lg: 'text-lg leading-relaxed',
            base: 'text-base leading-relaxed',
            sm: 'text-sm leading-relaxed',
        },
        caption: {
            default: 'text-xs text-white/60',
            uppercase: 'text-xs uppercase tracking-wider text-white/50',
        },
    },

    // Spacing system (4px base unit)
    spacing: {
        base: 4,
        xs: '4px',    // 1 unit
        sm: '8px',    // 2 units
        md: '16px',   // 4 units
        lg: '24px',   // 6 units
        xl: '32px',   // 8 units
        '2xl': '48px', // 12 units
        '3xl': '64px', // 16 units
        section: '80px', // 20 units
    },

    // Color palette with semantic names
    colors: {
        // Rain Café Theme
        rainCafe: {
            primary: '#2c2416',
            accent: '#d4a574',
            text: '#f5e6d3',
            surface: 'rgba(44, 36, 22, 0.4)',
        },
        // Forest Focus Theme
        forestFocus: {
            primary: '#1a2e1a',
            accent: '#4a7c4a',
            text: '#e8f5e8',
            surface: 'rgba(26, 46, 26, 0.4)',
        },
        // Neon Lounge Theme
        neonLounge: {
            primary: '#0a0a1a',
            accent: '#ff006e',
            secondary: '#00f5ff',
            text: '#ffffff',
            surface: 'rgba(10, 10, 26, 0.4)',
        },
        // Cozy Cabin Theme
        cozyCabin: {
            primary: '#1a0f0a',
            accent: '#ff6b35',
            text: '#fff4e6',
            surface: 'rgba(26, 15, 10, 0.4)',
        },
        // Shared Semantics
        semantic: {
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#3b82f6',
        },
    },

    // Component sizing
    sizing: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
        xl: 'h-14 px-8 text-xl',
    },

    // Animation timings
    animations: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
        ease: {
            default: 'ease-in-out',
            out: 'ease-out',
            in: 'ease-in',
        },
    },

    // Z-index layers
    zIndex: {
        background: 0,
        content: 10,
        overlay: 20,
        modal: 30,
        tooltip: 40,
        max: 9999,
    },

    // Border radius presets
    borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        full: '9999px',
    },

    // Shadow elevations
    shadows: {
        1: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        2: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        3: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        4: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        5: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        glow: {
            sm: '0 0 10px rgba(255, 255, 255, 0.1)',
            md: '0 0 20px rgba(255, 255, 255, 0.2)',
        }
    },
};
