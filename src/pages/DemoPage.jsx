import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        const particles = [];
        const count = 45;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 2 + 1,
            });
        }
        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(210, 4, 45, 0.25)';
                ctx.fill();
                particles.forEach((q, j) => {
                    if (i === j) return;
                    const dx = p.x - q.x, dy = p.y - q.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 140) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = `rgba(210, 4, 45, ${0.12 * (1 - d / 140)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            raf = requestAnimationFrame(draw);
        };
        draw();
        window.addEventListener('resize', resize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
    }, []);
    return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
};

const FloatingOrb = ({ size = 320, blur = 60, delay = 0, duration = 18, color = 'rgba(210, 4, 45, 0.14)' }) => (
    <div style={{ position: 'absolute', width: `${size}px`, height: `${size}px`, borderRadius: '50%', background: `radial-gradient(circle, ${color}, transparent 70%)`, filter: `blur(${blur}px)`, animation: `float ${duration}s ease-in-out infinite`, animationDelay: `${delay}s`, pointerEvents: 'none' }} />
);

const DemoPage = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

    return (
        <div style={{ background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
            <style>{`
            @keyframes float { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(0,-25px) scale(1.03);} }
            @keyframes slideUp { from{opacity:0; transform:translateY(35px);} to{opacity:1; transform:translateY(0);} }
            @keyframes shimmer { 0%{background-position:-1000px 0;} 100%{background-position:1000px 0;} }
            `}</style>

            {/* Hero */}
            <section style={{ position: 'relative', padding: '6rem 2rem 5rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, #F5F5F7 0%, #FFFFFF 35%, #F5F5F7 100%)', overflow: 'hidden' }}>
                <AnimatedBackground />
                <div style={{ position: 'absolute', top: '12%', left: '12%' }}><FloatingOrb delay={0} duration={16} /></div>
                <div style={{ position: 'absolute', bottom: '10%', right: '15%' }}><FloatingOrb delay={6} duration={22} size={380} color='rgba(255, 23, 68, 0.12)' /></div>

                <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(210,4,45,0.1)', border: '1px solid rgba(210,4,45,0.35)', borderRadius: '50px', padding: '0.55rem 1.6rem', marginBottom: '1.8rem', fontSize: '0.95rem', fontWeight: 700, color: '#D2042D', textTransform: 'uppercase', letterSpacing: '1.8px', animation: 'slideUp 0.6s ease-out' }}>Live Demo</div>
                    <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', color: '#1D1D1F', lineHeight: 1.1, letterSpacing: '-2px', margin: '0 0 1rem 0', fontWeight: 900, animation: 'slideUp 0.7s ease-out 0.05s backwards' }}>
                        Experience our AI Assistant in your browser
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#7a7a7a', maxWidth: '760px', margin: '0 auto', lineHeight: 1.75, animation: 'slideUp 0.7s ease-out 0.15s backwards' }}>
                        The demo is publicly available. Open it in a new tab and try real workflows.
                    </p>
                    <a
                        href="https://demo.verndigital.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-block', marginTop: '2rem', background: 'linear-gradient(135deg, #D2042D, #FF1744)', color: '#FFFFFF', padding: '1.1rem 2.6rem', borderRadius: '50px', border: 'none', fontFamily: "'Exo 2', sans-serif", fontSize: '1.05rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', boxShadow: '0 12px 30px rgba(210, 4, 45, 0.3)', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 20px 45px rgba(210, 4, 45, 0.4)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(210, 4, 45, 0.3)'; }}
                    >
                        Launch Demo
                    </a>
                </div>
                {/* full-width shimmer line */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #D2042D, transparent)', animation: 'shimmer 3s infinite linear', backgroundSize: '1000px 100%', zIndex: 2 }} />
            </section>

            {/* Secondary info */}
            <div ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''} section-container`} style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem', textAlign: 'center' }}>
                <p style={{ color: '#7a7a7a', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    Prefer a guided tour? Contact us and we’ll walk you through advanced use-cases tailored to your business.
                </p>
                <a href="mailto:dylan@verndigital.com" style={{ color: '#D2042D', fontWeight: 700, textDecoration: 'none' }}>dylan@verndigital.com</a>
            </div>
        </div>
    );
};

export default DemoPage;