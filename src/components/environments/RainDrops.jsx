import React, { useEffect, useRef } from 'react';

const RainDrops = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const drops = [];
        const numDrops = 80;

        class Drop {
            constructor() {
                this.reset();
                this.y = Math.random() * height; // Start spread out
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * -100; // Start above screen
                this.size = Math.random() * 2 + 1; // 1-3px
                this.speed = Math.random() * 5 + 2;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.length = Math.random() * 20 + 10;
            }

            update() {
                this.y += this.speed;
                if (this.y > height) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                // Rain Drop Trail
                const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
                gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                gradient.addColorStop(1, `rgba(200, 220, 255, ${this.opacity})`);

                ctx.fillStyle = gradient;
                ctx.rect(this.x, this.y, this.size / 2, this.length);
                ctx.fill();
            }
        }

        // Initialize drops
        for (let i = 0; i < numDrops; i++) {
            drops.push(new Drop());
        }

        // Window Condensation / Static Drops (Simulated with simple circles for performance)
        const staticDrops = [];
        for (let i = 0; i < 30; i++) {
            staticDrops.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 2 + 1,
                opacity: Math.random() * 0.3 + 0.1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw static condensation
            staticDrops.forEach(d => {
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${d.opacity})`;
                ctx.fill();
            });

            // Draw falling rain
            drops.forEach(drop => {
                drop.update();
                drop.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full mix-blend-overlay opacity-70"
        />
    );
};

export default React.memo(RainDrops);
