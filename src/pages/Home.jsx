import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Animated background canvas component
const AnimatedBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const particles = [];
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
            });
        }

        let animationFrameId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(210, 4, 45, 0.3)';
                ctx.fill();

                // Draw connections
                particles.forEach((p2, j) => {
                    if (i === j) return;
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(210, 4, 45, ${0.15 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
            }}
        />
    );
};

// Scroll-triggered fade animation hook
const useScrollAnimation = (threshold = 0.1) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return [ref, isVisible];
};

// Count-up animation hook
const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);

                    const steps = 60;
                    const increment = end / steps;
                    const stepDuration = duration / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, stepDuration);

                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [end, duration, hasStarted]);

    return [ref, count];
};

const Feature = ({ icon, title, index }) => {
    const [ref, isVisible] = useScrollAnimation(0.2);
    const [isHovered, setIsHovered] = useState(false);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
                background: '#FFFFFF',
                padding: '3rem 2rem',
                borderRadius: '24px',
                textAlign: 'center',
                boxShadow: isHovered ? '0 25px 60px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Subtle gradient border using mask */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '24px',
                    padding: '1.5px',
                    background: isHovered
                        ? 'linear-gradient(135deg, rgba(210,4,45,0.6), rgba(255,23,68,0.6))'
                        : 'linear-gradient(135deg, rgba(0,0,0,0.06), rgba(0,0,0,0.02))',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                }}
            />

            {/* Interactive glow following cursor on hover */}
            {isHovered && (
                <div
                    style={{
                        position: 'absolute',
                        top: `${mouse.y}px`,
                        left: `${mouse.x}px`,
                        width: '260px',
                        height: '260px',
                        background: 'radial-gradient(circle, rgba(210,4,45,0.18), transparent 60%)',
                        filter: 'blur(28px)',
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* Icon chip */}
            <div
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90px',
                    height: '90px',
                    borderRadius: '20px',
                    marginBottom: '1.25rem',
                    background: isHovered ? 'linear-gradient(135deg, #D2042D, #FF1744)' : 'rgba(210,4,45,0.08)',
                    color: isHovered ? '#fff' : 'inherit',
                    fontSize: '2.4rem',
                    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: isHovered ? '0 15px 35px rgba(210,4,45,0.35)' : 'none',
                    transform: isHovered ? 'translateZ(18px) scale(1.05)' : 'translateZ(0) scale(1)',
                }}
            >
                {icon}
            </div>

            <h3
                style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: '1.45rem',
                    color: '#1D1D1F',
                    margin: 0,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transform: isHovered ? 'translateZ(12px)' : 'translateZ(0)',
                    transition: 'transform 0.35s',
                }}
            >
                {title}
            </h3>
        </div>
    );
};

const MetricItem = ({ end, label, suffix = '', index }) => {
    const [ref, count] = useCountUp(end, 2500);
    return (
        <div
            ref={ref}
            style={{
                padding: '2rem',
                textAlign: 'center',
                position: 'relative',
            }}
        >
            <div
                style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: 'clamp(3rem, 8vw, 5rem)',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #D2042D, #FF1744)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1',
                    letterSpacing: '2px',
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 4px 8px rgba(210, 4, 45, 0.2))',
                }}
            >
                {count}{suffix}
            </div>
            <div
                style={{
                    fontSize: '1.1rem',
                    color: '#7a7a7a',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                }}
            >
                {label}
            </div>
        </div>
    );
};

const TimelineItem = ({ step, title, description, side, index }) => {
    const [ref, isVisible] = useScrollAnimation(0.2);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                padding: '10px 40px',
                position: 'relative',
                width: '50%',
                left: side === 'right' ? '50%' : '0',
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                    ? 'translateX(0)'
                    : side === 'right' ? 'translateX(50px)' : 'translateX(-50px)',
                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`,
            }}
            className={`timeline-item ${side}`}
        >
            <div
                style={{
                    padding: '2.5rem',
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 247, 0.95))',
                    backdropFilter: 'blur(10px)',
                    border: isHovered ? '2px solid rgba(210, 4, 45, 0.3)' : '2px solid rgba(234, 234, 234, 0.5)',
                    borderRadius: '20px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'scale(1.03) translateY(-5px)' : 'scale(1)',
                    boxShadow: isHovered
                        ? '0 25px 50px rgba(210, 4, 45, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                        : '0 8px 30px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Animated gradient overlay */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: isHovered ? '0%' : '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(210, 4, 45, 0.05), transparent)',
                        transition: 'left 0.6s',
                        pointerEvents: 'none',
                    }}
                />
                <div
                    style={{
                        fontFamily: "'Exo 2', sans-serif",
                        color: '#D2042D',
                        fontSize: '1.1rem',
                        marginBottom: '0.8rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    {step}
                </div>
                <h3
                    style={{
                        fontFamily: "'Exo 2', sans-serif",
                        fontSize: '1.9rem',
                        color: '#1D1D1F',
                        margin: '0 0 1rem 0',
                        fontWeight: '700',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    {title}
                </h3>
                <p style={{
                    margin: 0,
                    color: '#7a7a7a',
                    lineHeight: '1.7',
                    fontSize: '1.05rem',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    {description}
                </p>
            </div>
        </div>
    );
};

const DetailedFeature = ({ icon, title, text, index }) => {
    const [ref, isVisible] = useScrollAnimation(0.15);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.8rem',
                background: isHovered
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 247, 0.95))'
                    : 'rgba(245, 245, 247, 0.6)',
                backdropFilter: 'blur(15px)',
                padding: '2.2rem',
                borderRadius: '20px',
                border: isHovered ? '2px solid rgba(210, 4, 45, 0.3)' : '2px solid rgba(234, 234, 234, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateX(12px) scale(1.02)' : 'translateX(0) scale(1)',
                boxShadow: isHovered
                    ? '0 20px 40px rgba(210, 4, 45, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                    : '0 5px 20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `slideUp 0.6s ease-out ${index * 0.08}s backwards` : 'none',
                cursor: 'pointer',
            }}
        >
            <div
                style={{
                    fontSize: '2.2rem',
                    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    transform: isHovered ? 'scale(1.25) rotate(10deg)' : 'scale(1) rotate(0)',
                    filter: isHovered ? 'drop-shadow(0 8px 16px rgba(210, 4, 45, 0.3))' : 'none',
                    flexShrink: 0,
                }}
            >
                {icon}
            </div>
            <div style={{ flex: 1 }}>
                <h4
                    style={{
                        fontFamily: "'Exo 2', sans-serif",
                        fontSize: '1.25rem',
                        color: '#1D1D1F',
                        marginBottom: '0.6rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: '700',
                    }}
                >
                    {title}
                </h4>
                <p
                    style={{
                        fontSize: '1.02rem',
                        lineHeight: '1.7',
                        color: '#7a7a7a',
                        margin: 0,
                    }}
                >
                    {text}
                </p>
            </div>
        </div>
    );
};

const CommitmentItem = ({ icon, title, description, index }) => {
    const [ref, isVisible] = useScrollAnimation(0.15);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.8rem',
                textAlign: 'left',
                transition: 'all 0.3s',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.12}s backwards` : 'none',
            }}
        >
            <div
                style={{
                    fontSize: '2.2rem',
                    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    transform: isHovered ? 'scale(1.2) rotate(15deg)' : 'scale(1) rotate(0)',
                    filter: isHovered ? 'drop-shadow(0 8px 16px rgba(210, 4, 45, 0.3))' : 'none',
                    flexShrink: 0,
                }}
            >
                {icon}
            </div>
            <div>
                <h3
                    style={{
                        fontFamily: "'Exo 2', sans-serif",
                        fontSize: '1.35rem',
                        color: '#1D1D1F',
                        marginBottom: '0.6rem',
                        textTransform: 'uppercase',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                    }}
                >
                    {title}
                </h3>
                <p
                    style={{
                        fontSize: '1.02rem',
                        lineHeight: '1.7',
                        color: '#7a7a7a',
                        margin: 0,
                    }}
                >
                    {description}
                </p>
            </div>
        </div>
    );
};

const Home = () => {
    const detailedFeatures = [
        { icon: '🛠️', title: 'Website Remaster', text: 'Give your existing site a modern refresh using your current files. Faster load times, cleaner design, zero hassle.' },
        { icon: '🚀', title: 'New Site Creation', text: 'Provide your content once, we craft a fast, beautiful site and hand over access when you approve.' },
        { icon: '🔍', title: 'Hosting + SEO', text: 'Reliable hosting with ongoing SEO improvements so you steadily climb search rankings.' },
        { icon: '🤖', title: 'Simple Chatbot', text: 'Train on your services and FAQs for instant answers and lead capture—live on your site 24/7.' },
        { icon: '📅', title: 'Booking Automation', text: 'Calendar‑aware assistant that checks availability and schedules appointments for you.' },
        { icon: '📈', title: 'Digital & Workflow Insights', text: 'Actionable analysis of your online presence and day‑to‑day processes to uncover measurable wins.' },
    ];

    const commitments = [
        { icon: '⚡', title: 'Fast Turnaround', description: 'From kickoff to shipped in days, not months—clear milestones and tight feedback loops.' },
        { icon: '💰', title: 'Transparent Pricing', description: 'Flat fees for Web and Consultancy. Simple monthly pricing for AI assistants—no surprises.' },
        { icon: '🔒', title: 'Privacy‑First', description: 'We only use the data we need and follow best practices for secure handling and storage.' },
        { icon: '📊', title: 'Measurable ROI', description: 'Track leads captured, bookings made, and time saved. We optimize based on real numbers.' },
    ];

    return (
        <div style={{ background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
            <style>
                {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-30px) scale(1.05); }
          }

          @keyframes rotate360 {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            .timeline-item {
              width: 100% !important;
              left: 0 !important;
              padding-left: 50px !important;
              padding-right: 15px !important;
            }
             .timeline-center-line {
              left: 12px !important;
             }
          }
        `}
            </style>

            {/* Hero Section */}
            <section
                style={{
                    position: 'relative',
                    minHeight: '75vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '5rem 2rem',
                    background: 'linear-gradient(135deg, #F5F5F7 0%, #FFFFFF 30%, #F5F5F7 70%, #FFFFFF 100%)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientShift 15s ease infinite',
                    overflow: 'hidden',
                }}
            >
                <AnimatedBackground />
                {/* Large floating gradient orbs */}
                <div
                    style={{
                        position: 'absolute',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(210, 4, 45, 0.15), transparent 70%)',
                        filter: 'blur(80px)',
                        animation: 'float 8s ease-in-out infinite',
                        top: '10%',
                        left: '10%',
                        zIndex: 1,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255, 23, 68, 0.12), transparent 70%)',
                        filter: 'blur(70px)',
                        animation: 'float 10s ease-in-out infinite 2s',
                        bottom: '10%',
                        right: '10%',
                        zIndex: 1,
                    }}
                />

                <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px' }}>
                    <div
                        style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, rgba(210, 4, 45, 0.1), rgba(255, 23, 68, 0.1))',
                            border: '2px solid rgba(210, 4, 45, 0.3)',
                            borderRadius: '50px',
                            padding: '0.6rem 2rem',
                            marginBottom: '2.5rem',
                            fontSize: '0.95rem',
                            fontWeight: '700',
                            backgroundClip: 'text',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            animation: 'slideUp 0.6s ease-out',
                            boxShadow: '0 4px 15px rgba(210, 4, 45, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        🚀 AI-Powered Business Growth
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
                            color: '#1D1D1F',
                            lineHeight: '1.1',
                            letterSpacing: '-3px',
                            marginBottom: '2rem',
                            fontWeight: '900',
                            animation: 'slideUp 0.6s ease-out 0.1s backwards',
                        }}
                    >
                        Your Website Should{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #D2042D, #FF1744, #D2042D)',
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                animation: 'gradientShift 3s linear infinite',
                                filter: 'drop-shadow(0 4px 8px rgba(210, 4, 45, 0.3))',
                            }}
                        >
                            Work For You
                        </span>
                        , Not Against You.
                    </h1>
                    <p
                        style={{
                            fontSize: '1.4rem',
                            color: '#7a7a7a',
                            maxWidth: '750px',
                            margin: '0 auto 3.5rem auto',
                            lineHeight: '1.8',
                            fontWeight: '400',
                            animation: 'slideUp 0.6s ease-out 0.2s backwards',
                        }}
                    >
                        We design modern websites, build AI assistants that answer questions and book appointments, and deliver insights that improve your workflows. Practical solutions with clear pricing and measurable results.
                    </p>
                    <Link
                        to="/demo/live-experience"
                        style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #D2042D, #FF1744)',
                            color: '#FFFFFF',
                            padding: '1.4rem 3.5rem',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontFamily: "'Exo 2', sans-serif",
                            letterSpacing: '2px',
                            fontSize: '1.15rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            boxShadow: '0 20px 50px rgba(210, 4, 45, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            animation: 'slideUp 0.6s ease-out 0.3s backwards',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 25px 60px rgba(210, 4, 45, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 20px 50px rgba(210, 4, 45, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        }}
                    >
                        <span style={{ position: 'relative', zIndex: 2 }}>See It in Action</span>
                        <div
                            style={{
                                position: 'absolute',
                                top: '-50%',
                                left: '-50%',
                                width: '200%',
                                height: '200%',
                                background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                                animation: 'rotate360 3s linear infinite',
                                pointerEvents: 'none',
                            }}
                        />
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '7rem 2rem', maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2
                        style={{
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                            letterSpacing: '1px',
                            color: '#1D1D1F',
                            fontWeight: '800',
                            marginBottom: '1rem',
                        }}
                    >
                        Stop Losing Customers. Start Automating Growth.
                    </h2>
                    <div
                        style={{
                            width: '100px',
                            height: '4px',
                            background: 'linear-gradient(90deg, #D2042D, #FF1744)',
                            margin: '0 auto',
                            borderRadius: '2px',
                        }}
                    />
                </div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2.5rem',
                        alignItems: 'stretch',
                    }}
                >
                    <Link to="/services/ai" style={{ textDecoration: 'none' }}>
                        <Feature icon="📅" title="Automate Bookings 24/7" index={0} />
                    </Link>
                    <Link to="/services/ai" style={{ textDecoration: 'none' }}>
                        <Feature icon="🤖" title="Provide Instant Answers" index={1} />
                    </Link>
                    <Link to="/services/ai" style={{ textDecoration: 'none' }}>
                        <Feature icon="💡" title="Capture Every Opportunity" index={2} />
                    </Link>
                </div>
            </section>

            {/* Metrics Section */}
            <section
                style={{
                    padding: '6rem 2rem',
                    background: 'linear-gradient(135deg, rgba(245, 245, 247, 0.5), rgba(255, 255, 255, 0.5))',
                    backdropFilter: 'blur(10px)',
                    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '2rem 6rem',
                        maxWidth: '1200px',
                        margin: '0 auto',
                    }}
                >
                    <MetricItem end={45} suffix="%" label="Increase in Leads Captured" />
                    <MetricItem end={24} suffix="/7" label="Automated Availability" />
                    <MetricItem end={80} suffix="%" label="Reduction in Repetitive Questions" />
                </div>
            </section>

            {/* How It Works Section */}
            <section style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <h2
                        style={{
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                            letterSpacing: '1px',
                            color: '#1D1D1F',
                            fontWeight: '800',
                            marginBottom: '1rem',
                        }}
                    >
                        Get Your AI Assistant in 3 Simple Steps
                    </h2>
                    <div
                        style={{
                            width: '100px',
                            height: '4px',
                            background: 'linear-gradient(90deg, #D2042D, #FF1744)',
                            margin: '0 auto',
                            borderRadius: '2px',
                        }}
                    />
                </div>
                <div style={{ position: 'relative', maxWidth: '850px', margin: '0 auto' }}>
                    <div
                        className="timeline-center-line"
                        style={{

                            position: 'absolute',
                            width: '4px',
                            background: 'linear-gradient(to bottom, #FF1744, #D2042D)',
                            boxShadow: '0 0 15px rgba(210, 4, 45, 0.4)',
                            top: 0,
                            bottom: 0,
                            left: '50%',
                            marginLeft: '-2px',
                            borderRadius: '2px',
                        }}
                    />
                    <TimelineItem step="Step 1" title="Discovery & Analysis" description="We work with you to understand your services, pricing, and common customer questions to build a comprehensive knowledge base for the AI." side="left" index={0} />
                    <TimelineItem step="Step 2" title="Custom Build & Integration" description="Our team develops and trains your AI assistant, connecting it to your calendar and ensuring it represents your brand and voice perfectly." side="right" index={1} />
                    <TimelineItem step="Step 3" title="Launch & Support" description="We deploy the assistant to your website. You immediately start capturing more leads and providing better customer service, with our full support." side="left" index={2} />
                </div>
            </section>

            {/* Detailed Features Section */}
            <section style={{ padding: '8rem 2rem', background: 'linear-gradient(135deg, #F9F9F9, #FFFFFF)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2
                            style={{
                                fontFamily: "'Exo 2', sans-serif",
                                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                                letterSpacing: '1px',
                                color: '#1D1D1F',
                                fontWeight: '800',
                                marginBottom: '1rem',
                            }}
                        >
                            Full Feature Breakdown
                        </h2>
                        <div
                            style={{
                                width: '100px',
                                height: '4px',
                                background: 'linear-gradient(90deg, #D2042D, #FF1744)',
                                margin: '0 auto',
                                borderRadius: '2px',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                            gap: '2.5rem',
                        }}
                    >
                        {detailedFeatures.map((feature, index) => (
                            <DetailedFeature key={index} {...feature} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Commitment Section */}
            <section style={{ padding: '8rem 2rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2
                            style={{
                                fontFamily: "'Exo 2', sans-serif",
                                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                                letterSpacing: '1px',
                                color: '#1D1D1F',
                                fontWeight: '800',
                                marginBottom: '1rem',
                            }}
                        >
                            Our Commitment to You
                        </h2>
                        <div
                            style={{
                                width: '100px',
                                height: '4px',
                                background: 'linear-gradient(90deg, #D2042D, #FF1744)',
                                margin: '0 auto',
                                borderRadius: '2px',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(245, 245, 247, 0.8))',
                            backdropFilter: 'blur(15px)',
                            border: '2px solid rgba(234, 234, 234, 0.5)',
                            borderRadius: '30px',
                            padding: '4rem',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                        }}
                    >
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '3rem 4rem',
                            }}
                        >
                            {commitments.map((item, index) => (
                                <CommitmentItem key={index} {...item} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

