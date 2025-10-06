import { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

// Subtle animated particle background (matches Home style)
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
        const particleCount = 45;
        for (let i = 0; i < particleCount; i++) {
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

                // connection lines
                particles.forEach((q, j) => {
                    if (i === j) return;
                    const dx = p.x - q.x; const dy = p.y - q.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = `rgba(210, 4, 45, ${0.12 * (1 - dist / 140)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            raf = requestAnimationFrame(draw);
        };
        draw();

        window.addEventListener('resize', resize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
        />
    );
};

const FloatingOrb = ({ size = 320, blur = 60, delay = 0, duration = 18, color = 'rgba(210, 4, 45, 0.14)' }) => {
    return (
        <div
            style={{
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${color}, transparent 70%)`,
                filter: `blur(${blur}px)`,
                animation: `float ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                pointerEvents: 'none',
            }}
        />
    );
};

const Contact = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult("Sending....");
        const formData = new FormData(e.target);

        // --- IMPORTANT: Replace with your actual access key from Web3Forms ---
        formData.append("access_key", "2148dbf8-54b7-4484-8bbf-49e96265dabb");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Message sent successfully!");
            e.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div style={{ background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
            <style>
                {`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(0, -25px) scale(1.03); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(35px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          @media (max-width: 900px) {
            .contact-grid-modern { grid-template-columns: 1fr !important; }
          }
        `}
            </style>

            {/* Hero */}
            <section
                style={{
                    position: 'relative',
                    padding: '6rem 2rem 5rem 2rem',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #F5F5F7 0%, #FFFFFF 35%, #F5F5F7 100%)',
                    overflow: 'hidden',
                }}
            >
                {/* Animated background layer */}
                <AnimatedBackground />
                <div style={{ position: 'absolute', top: '12%', left: '12%' }}>
                    <FloatingOrb delay={0} duration={16} />
                </div>
                <div style={{ position: 'absolute', bottom: '10%', right: '15%' }}>
                    <FloatingOrb delay={6} duration={22} size={380} color='rgba(255, 23, 68, 0.12)' />
                </div>

                <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>
                    <div
                        style={{
                            display: 'inline-block',
                            background: 'rgba(210, 4, 45, 0.1)',
                            border: '1px solid rgba(210, 4, 45, 0.35)',
                            borderRadius: '50px',
                            padding: '0.55rem 1.6rem',
                            marginBottom: '1.8rem',
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            color: '#D2042D',
                            textTransform: 'uppercase',
                            letterSpacing: '1.8px',
                            animation: 'slideUp 0.6s ease-out',
                        }}
                    >
                        Let's talk
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
                            color: '#1D1D1F',
                            lineHeight: 1.1,
                            letterSpacing: '-2px',
                            margin: '0 0 1rem 0',
                            fontWeight: 900,
                            animation: 'slideUp 0.7s ease-out 0.05s backwards',
                        }}
                    >
                        Start a conversation that moves your business forward
                    </h1>
                    <p
                        style={{
                            fontSize: '1.25rem',
                            color: '#7a7a7a',
                            maxWidth: '760px',
                            margin: '0 auto',
                            lineHeight: 1.75,
                            animation: 'slideUp 0.7s ease-out 0.15s backwards',
                        }}
                    >
                        Tell us about your goals. We’ll reply quickly with clear next steps.
                    </p>
                </div>
                {/* Full-width shimmer line at bottom of hero */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #D2042D, transparent)',
                        animation: 'shimmer 3s infinite linear',
                        backgroundSize: '1000px 100%',
                        zIndex: 2,
                    }}
                />
            </section>

            {/* Content */}
            <section style={{ padding: '5rem 2rem' }}>
                <div
                    ref={ref}
                    style={{
                        maxWidth: '1150px',
                        margin: '0 auto',
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,245,247,0.9))',
                        backdropFilter: 'blur(14px)',
                        border: '2px solid rgba(234,234,234,0.6)',
                        borderRadius: '28px',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
                        padding: '3.2rem',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.6s ease-out',
                    }}
                >
                    <div
                        className="contact-grid-modern"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.2fr',
                            gap: '3rem',
                            alignItems: 'start',
                        }}
                    >
                        {/* Info */}
                        <div>
                            <h2
                                style={{
                                    fontFamily: "'Exo 2', sans-serif",
                                    fontSize: '1.8rem',
                                    color: '#1D1D1F',
                                    marginTop: 0,
                                    marginBottom: '1.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                }}
                            >
                                Contact Information
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.05rem' }}>
                                <div style={{ color: '#D2042D' }}><FaEnvelope size={20} /></div>
                                <a href="mailto:dylan@verndigital.com" style={{ color: '#D2042D', fontWeight: 700, textDecoration: 'none' }}>
                                    dylan@verndigital.com
                                </a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.05rem', color: '#1D1D1F' }}>
                                <div style={{ color: '#D2042D' }}><FaPhone size={20} /></div>
                                <span>07935 712911</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.05rem', color: '#1D1D1F' }}>
                                <div style={{ color: '#D2042D' }}><FaMapMarkerAlt size={20} /></div>
                                <span>Coventry, United Kingdom</span>
                            </div>
                        </div>

                        {/* Form */}
                        <div>
                            <h2
                                style={{
                                    fontFamily: "'Exo 2', sans-serif",
                                    fontSize: '1.8rem',
                                    color: '#1D1D1F',
                                    marginTop: 0,
                                    marginBottom: '1.2rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                }}
                            >
                                Send a Message
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '1.2rem' }}>
                                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1.1rem',
                                            borderRadius: '12px',
                                            border: '1px solid #EAEAEA',
                                            background: '#FFFFFF',
                                            fontSize: '1rem',
                                            transition: 'box-shadow 0.3s, border-color 0.3s',
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#D2042D';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(210, 4, 45, 0.12)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#EAEAEA';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.2rem' }}>
                                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1.1rem',
                                            borderRadius: '12px',
                                            border: '1px solid #EAEAEA',
                                            background: '#FFFFFF',
                                            fontSize: '1rem',
                                            transition: 'box-shadow 0.3s, border-color 0.3s',
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#D2042D';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(210, 4, 45, 0.12)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#EAEAEA';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.4rem' }}>
                                    <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1.1rem',
                                            borderRadius: '12px',
                                            border: '1px solid #EAEAEA',
                                            background: '#FFFFFF',
                                            fontSize: '1rem',
                                            resize: 'vertical',
                                            transition: 'box-shadow 0.3s, border-color 0.3s',
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#D2042D';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(210, 4, 45, 0.12)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#EAEAEA';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    style={{
                                        background: 'linear-gradient(135deg, #D2042D, #FF1744)',
                                        color: '#FFFFFF',
                                        padding: '1.1rem 2.6rem',
                                        borderRadius: '50px',
                                        border: 'none',
                                        fontFamily: "'Exo 2', sans-serif",
                                        fontSize: '1.05rem',
                                        fontWeight: 700,
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: '0 12px 30px rgba(210, 4, 45, 0.3)',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.04)';
                                        e.currentTarget.style.boxShadow = '0 20px 45px rgba(210, 4, 45, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(210, 4, 45, 0.3)';
                                    }}
                                >
                                    Send Message
                                </button>
                            </form>
                            {result && (
                                <p style={{ marginTop: '1rem', fontWeight: 700, color: '#1D1D1F' }}>{result}</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;