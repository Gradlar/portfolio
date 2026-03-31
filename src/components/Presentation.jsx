import { useEffect, useRef } from 'react';

export default function Presentation() {
    const canvasRef = useRef(null);
    const animRef   = useRef(null);
    const scrollRef = useRef(0);

    const scrollToCompetences = (e) => {
        e.preventDefault();
        const target = document.querySelector('#competences');
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx    = canvas.getContext('2d');
        let t = 0;

        const resize = () => {
            canvas.width  = window.innerWidth  * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        resize();
        window.addEventListener('resize', resize);

        const rings = [
            { radius: 210, width: 22, speed:  0.004,  offset: 0,                opacity: 0.70, scatterAngle: Math.PI * 0.1,  scatterDist: 1.8 },
            { radius: 170, width: 14, speed: -0.006,  offset: Math.PI / 3,      opacity: 0.58, scatterAngle: Math.PI * 1.3,  scatterDist: 2.4 },
            { radius: 130, width: 10, speed:  0.009,  offset: Math.PI / 1.5,    opacity: 0.48, scatterAngle: Math.PI * 0.7,  scatterDist: 2.0 },
            { radius: 90,  width: 7,  speed: -0.013,  offset: Math.PI,          opacity: 0.38, scatterAngle: Math.PI * 1.75, scatterDist: 2.8 },
            { radius: 52,  width: 5,  speed:  0.018,  offset: Math.PI / 4,      opacity: 0.30, scatterAngle: Math.PI * 0.45, scatterDist: 3.2 },
        ];

        const onScroll = () => {
            scrollRef.current = Math.min(window.scrollY / window.innerHeight, 1);
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        const ease = (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

        const draw = () => {
            const W  = window.innerWidth;
            const H  = window.innerHeight;
            const cx = W / 2;
            const cy = H / 2;
            const progress = ease(scrollRef.current);

            ctx.clearRect(0, 0, W, H);

            const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300);
            bgGlow.addColorStop(0,   `rgba(30, 80, 200, ${0.22 * (1 - progress)})`);
            bgGlow.addColorStop(0.5, `rgba(20, 50, 150, ${0.10 * (1 - progress)})`);
            bgGlow.addColorStop(1,   'rgba(0, 0, 0, 0)');
            ctx.fillStyle = bgGlow;
            ctx.fillRect(0, 0, W, H);

            rings.forEach((ring) => {
                const angle          = t * ring.speed + ring.offset;
                const scatterX       = Math.cos(ring.scatterAngle) * ring.scatterDist * progress * W * 0.35;
                const scatterY       = Math.sin(ring.scatterAngle) * ring.scatterDist * progress * H * 0.35;
                const scatterRadius  = ring.radius * (1 + progress * 1.8);
                const currentOpacity = ring.opacity * (1 - progress * 0.92);
                const lineWidth      = ring.width * (1 - progress * 0.5);

                if (currentOpacity <= 0.01) return;

                ctx.save();
                ctx.translate(cx + scatterX, cy + scatterY);
                ctx.rotate(angle + progress * ring.scatterAngle * 0.5);

                const grad = ctx.createConicGradient(0, 0, 0);
                grad.addColorStop(0,    `rgba(80, 140, 255, 0)`);
                grad.addColorStop(0.15, `rgba(100, 160, 255, ${currentOpacity * 0.5})`);
                grad.addColorStop(0.4,  `rgba(60,  110, 230, ${currentOpacity})`);
                grad.addColorStop(0.65, `rgba(80,  140, 255, ${currentOpacity * 0.4})`);
                grad.addColorStop(1,    `rgba(80,  140, 255, 0)`);

                ctx.beginPath();
                ctx.arc(0, 0, scatterRadius, 0, Math.PI * 2);
                ctx.strokeStyle = grad;
                ctx.lineWidth   = lineWidth;
                ctx.stroke();

                const glowGrad = ctx.createConicGradient(0, 0, 0);
                glowGrad.addColorStop(0.3,  `rgba(80, 140, 255, 0)`);
                glowGrad.addColorStop(0.45, `rgba(80, 140, 255, ${currentOpacity * 0.28})`);
                glowGrad.addColorStop(0.55, `rgba(80, 140, 255, 0)`);

                ctx.beginPath();
                ctx.arc(0, 0, scatterRadius, 0, Math.PI * 2);
                ctx.strokeStyle = glowGrad;
                ctx.lineWidth   = lineWidth * 2.8;
                ctx.stroke();

                ctx.restore();
            });

            const pulse       = 0.5 + Math.sin(t * 0.02) * 0.5;
            const coreOpacity = 1 - progress;
            if (coreOpacity > 0.01) {
                const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
                coreGrad.addColorStop(0,   `rgba(100, 160, 255, ${(0.30 + pulse * 0.18) * coreOpacity})`);
                coreGrad.addColorStop(0.6, `rgba(60,  110, 230, ${(0.12 + pulse * 0.08) * coreOpacity})`);
                coreGrad.addColorStop(1,   'rgba(0, 0, 0, 0)');
                ctx.beginPath();
                ctx.arc(cx, cy, 40, 0, Math.PI * 2);
                ctx.fillStyle = coreGrad;
                ctx.fill();
            }

            t++;
            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: -1,
                    pointerEvents: 'none',
                    background: 'transparent', 
                }}
            />

            <div
                className="relative min-h-screen flex items-center justify-center"
                style={{ 
                    background: 'transparent',
                    backdropFilter: 'blur(4px)', 
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, transparent 30%, #0d1117 100%)',
                        pointerEvents: 'none',
                        opacity: 0.6 
                    }}
                />

                <div className="relative z-10 text-center px-6">
                    <h1
                        className="mb-5 text-5xl font-bold"
                        style={{
                            color: '#c8d8ff',
                            letterSpacing: '-0.02em',
                            textShadow: '0 0 40px rgba(80,140,255,0.4)',
                        }}
                    >
                        Lamour Enzo
                    </h1>
                    <p
                        className="max-w-md mx-auto mb-10"
                        style={{
                            color: 'rgba(160, 190, 255, 0.85)',
                            lineHeight: 1.7,
                            fontSize: '1.1rem'
                        }}
                    >
                        Actuellement étudiant en 3ᵉ année de BUT Informatique à l'IUT A de Villeneuve-d'Ascq.
                    </p>

                    {/* ── BOUTON VOIR PLUS ── */}
                    <a 
                        href="#competences"
                        onClick={scrollToCompetences}
                        style={{
                            display: 'inline-block',
                            padding: '12px 32px',
                            borderRadius: '99px',
                            background: 'rgba(80, 140, 255, 0.1)',
                            border: '1px solid rgba(80, 140, 255, 0.3)',
                            color: '#c8d8ff',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            transition: 'all 0.3s ease',
                            boxShadow: '0 0 20px rgba(80, 140, 255, 0.1)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(80, 140, 255, 0.2)';
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(80, 140, 255, 0.3)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(80, 140, 255, 0.1)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(80, 140, 255, 0.1)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        En savoir plus
                    </a>
                </div>
            </div>
        </>
    );
}