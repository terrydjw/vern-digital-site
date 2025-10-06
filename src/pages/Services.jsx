import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FloatingOrb = ({ delay = 0, duration = 20 }) => {
    return (
        <div
            style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(210, 4, 45, 0.15), transparent 70%)',
                filter: 'blur(40px)',
                animation: `float ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                pointerEvents: 'none',
            }}
        />
    );
};

const ServicePillar = ({ icon, title, description, cta, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            style={{
                position: 'relative',
                background: 'rgba(245, 245, 247, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(234, 234, 234, 0.5)',
                borderRadius: '20px',
                padding: '3rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: isHovered
                    ? '0 30px 60px rgba(210, 4, 45, 0.15), 0 0 0 1px rgba(210, 4, 45, 0.1)'
                    : '0 10px 30px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s backwards`,
                cursor: 'pointer',
            }}
        >
            {isHovered && (
                <div
                    style={{
                        position: 'absolute',
                        top: mousePosition.y - 150,
                        left: mousePosition.x - 150,
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(210, 4, 45, 0.1), transparent 70%)',
                        pointerEvents: 'none',
                        transition: 'opacity 0.3s',
                    }}
                />
            )}

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '20px',
                    padding: '2px',
                    background: isHovered
                        ? 'linear-gradient(135deg, rgba(210, 4, 45, 0.5), transparent, rgba(210, 4, 45, 0.5))'
                        : 'transparent',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                    transition: 'background 0.4s',
                }}
            />

            <div
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    background: isHovered
                        ? 'linear-gradient(135deg, #D2042D, #FF1744)'
                        : 'rgba(210, 4, 45, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    fontSize: '2.5rem',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)',
                    boxShadow: isHovered ? '0 15px 35px rgba(210, 4, 45, 0.3)' : 'none',
                }}
            >
                {icon}
            </div>

            <h3
                style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: '1.8rem',
                    color: '#1D1D1F',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    fontWeight: '700',
                }}
            >
                {title}
            </h3>

            <p
                style={{
                    fontSize: '1.05rem',
                    lineHeight: '1.8',
                    color: '#7a7a7a',
                    marginBottom: '2rem',
                }}
            >
                {description}
            </p>

            <div
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#D2042D',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    transition: 'all 0.3s',
                    transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                }}
            >
                {cta}
                <span
                    style={{
                        transition: 'transform 0.3s',
                        transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                    }}
                >
                    →
                </span>
            </div>

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, transparent 50%, rgba(210, 4, 45, 0.05) 50%)',
                    borderTopRightRadius: '20px',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s',
                }}
            />
        </div>
    );
};

const Services = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const services = [
        {
            icon: '🌐',
            title: 'Web Services',
            description: 'Crafting beautiful, high-performing websites that captivate your audience and rank higher on Google. From new builds to modernization and SEO optimization.',
            link: "/services/web",
            cta: 'Explore Web Services',
        },
        {
            icon: '🤖',
            title: 'AI Services',
            description: 'Automate customer interactions and streamline operations with intelligent chatbots. We deliver solutions from simple FAQ bots to advanced booking systems.',
            link: "/services/ai",
            cta: 'Discover AI Solutions',
        },
        {
            icon: '💡',
            title: 'Consultancy',
            description: 'Get expert analysis of your digital and operational workflows. We identify opportunities for growth and efficiency with a clear roadmap for integration.',
            link: "/services/consultancy",
            cta: 'Get Expert Insights',
        },
    ];

    return (
        <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
            <style>
                {`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(50px, -50px) scale(1.1); }
            50% { transform: translate(-30px, -80px) scale(0.9); }
            75% { transform: translate(70px, -40px) scale(1.05); }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }

          @media (max-width: 768px) {
            .services-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
            </style>

            <div
                style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #F5F5F7 0%, #FFFFFF 50%, #F5F5F7 100%)',
                    padding: '6rem 2rem',
                    textAlign: 'center',
                    overflow: 'hidden',
                    borderBottom: '1px solid #EAEAEA',
                }}
            >
                <div style={{ position: 'absolute', top: '10%', left: '10%' }}>
                    <FloatingOrb delay={0} duration={15} />
                </div>
                <div style={{ position: 'absolute', bottom: '20%', right: '15%' }}>
                    <FloatingOrb delay={5} duration={20} />
                </div>
                <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
                    <FloatingOrb delay={10} duration={18} />
                </div>

                <div
                    style={{
                        position: 'relative',
                        zIndex: 2,
                        maxWidth: '900px',
                        margin: '0 auto',
                    }}
                >
                    <div
                        style={{
                            display: 'inline-block',
                            background: 'rgba(210, 4, 45, 0.1)',
                            border: '1px solid rgba(210, 4, 45, 0.3)',
                            borderRadius: '50px',
                            padding: '0.5rem 1.5rem',
                            marginBottom: '2rem',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            color: '#D2042D',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            animation: 'fadeInUp 0.6s ease-out, pulse 3s ease-in-out infinite',
                        }}
                    >
                        ✨ Next-Gen Solutions
                    </div>

                    <h1
                        style={{
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            color: '#1D1D1F',
                            lineHeight: '1.1',
                            letterSpacing: '-2px',
                            marginBottom: '1.5rem',
                            fontWeight: '800',
                            animation: 'fadeInUp 0.6s ease-out 0.1s backwards',
                        }}
                    >
                        Digital Solutions to{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #D2042D, #FF1744)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Grow
                        </span>{' '}
                        Your Business
                    </h1>

                    <h2
                        style={{
                            fontSize: '1.3rem',
                            color: '#7a7a7a',
                            fontWeight: '400',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.7',
                            animation: 'fadeInUp 0.6s ease-out 0.2s backwards',
                        }}
                    >
                        We build powerful web presences, integrate intelligent automation, and
                        provide expert insights to help you succeed in the digital age.
                    </h2>
                </div>

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
                    }}
                />
            </div>

            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '6rem 2rem',
                }}
            >
                <div
                    className="services-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2.5rem',
                        position: 'relative',
                    }}
                >
                    {services.map((service, index) => (
                        // Wrap the ServicePillar with a Link
                        <Link
                            key={index}
                            to={service.link}
                            style={{ textDecoration: 'none' }} // Style to remove underline
                        >
                            <ServicePillar {...service} index={index} />
                        </Link>
                    ))}
                </div>
            </div>

            <div
                style={{
                    background: 'linear-gradient(135deg, #1D1D1F 0%, #2D2D2F 100%)',
                    padding: '5rem 2rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(210, 4, 45, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, rgba(210, 4, 45, 0.1) 0%, transparent 50%)`,
                        animation: 'float 20s ease-in-out infinite',
                    }}
                />

                <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
                    <h2
                        style={{
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            color: '#FFFFFF',
                            marginBottom: '1.5rem',
                            fontWeight: '700',
                            letterSpacing: '1px',
                        }}
                    >
                        Ready to Transform Your Business?
                    </h2>
                    <p
                        style={{
                            fontSize: '1.2rem',
                            color: 'rgba(255, 255, 255, 0.8)',
                            marginBottom: '2.5rem',
                            lineHeight: '1.7',
                        }}
                    >
                        Let's discuss how we can help you achieve your digital goals with cutting-edge solutions.
                    </p>
                    <button
                        style={{
                            background: 'linear-gradient(135deg, #D2042D, #FF1744)',
                            color: '#FFFFFF',
                            padding: '1.2rem 3rem',
                            borderRadius: '50px',
                            border: 'none',
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 10px 30px rgba(210, 4, 45, 0.3)',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-5px) scale(1.05)';
                            e.target.style.boxShadow = '0 20px 40px rgba(210, 4, 45, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = '0 10px 30px rgba(210, 4, 45, 0.3)';
                        }}
                    >
                        Get Started Today
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Services;