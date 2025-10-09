import React, { useState } from 'react';

const FloatingParticle = ({ delay, duration, size }) => (
    <div
        style={{
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: 'rgba(210, 4, 45, 0.3)',
            animation: `particleFloat ${duration}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            filter: 'blur(2px)',
        }}
    />
);

const ServiceOffering = ({ title, description, bestFor, price, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateXValue = ((y - centerY) / centerY) * -10;
        const rotateYValue = ((x - centerX) / centerX) * 10;
        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); handleMouseLeave(); }}
            onMouseMove={handleMouseMove}
            style={{
                position: 'relative',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,245,247,0.9))',
                backdropFilter: 'blur(20px)',
                border: isHovered ? '2px solid rgba(210, 4, 45, 0.3)' : '2px solid rgba(234, 234, 234, 0.5)',
                borderRadius: '24px',
                padding: '2.5rem',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered
                    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
                    : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
                boxShadow: isHovered
                    ? '0 30px 60px rgba(210, 4, 45, 0.2), 0 0 0 1px rgba(210, 4, 45, 0.1)'
                    : '0 10px 30px rgba(0, 0, 0, 0.08)',
                animation: `slideInUp 0.6s ease-out ${index * 0.15}s backwards`,
                cursor: 'pointer',
                overflow: 'hidden',
            }}
        >
            {/* Animated shimmer overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(210, 4, 45, 0.1), transparent)',
                    animation: isHovered ? 'shimmerSlide 1.5s ease-in-out' : 'none',
                    pointerEvents: 'none',
                }}
            />

            {/* Top accent bar */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #D2042D, #FF1744, #D2042D)',
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s',
                }}
            />

            {/* Price badge */}
            <div
                style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'linear-gradient(135deg, #D2042D, #FF1744)',
                    color: '#FFFFFF',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    letterSpacing: '0.5px',
                    boxShadow: '0 5px 15px rgba(210, 4, 45, 0.3)',
                    transform: isHovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1) rotate(0)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {price}
            </div>

            <h3
                style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: '1.8rem',
                    color: '#1D1D1F',
                    marginBottom: '1.2rem',
                    marginTop: '0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: '700',
                    paddingRight: '120px',
                }}
            >
                {title}
            </h3>

            <p
                style={{
                    fontSize: '1.05rem',
                    lineHeight: '1.8',
                    color: '#7a7a7a',
                    marginBottom: '1.5rem',
                }}
            >
                {description}
            </p>

            <div
                style={{
                    background: 'rgba(210, 4, 45, 0.05)',
                    padding: '1rem 1.2rem',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    border: '1px solid rgba(210, 4, 45, 0.1)',
                }}
            >
                <strong style={{ color: '#D2042D', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
                    BEST FOR:
                </strong>
                <p style={{ margin: '0.5rem 0 0 0', color: '#1D1D1F', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {bestFor}
                </p>
            </div>

            <button
                style={{
                    width: '100%',
                    background: isHovered ? 'linear-gradient(135deg, #D2042D, #FF1744)' : '#D2042D',
                    color: '#FFFFFF',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: '1rem',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: isHovered ? '0 10px 25px rgba(210, 4, 45, 0.4)' : '0 5px 15px rgba(210, 4, 45, 0.2)',
                }}
            >
                Start Your Project
            </button>

            {/* Corner glow effect */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle at bottom right, rgba(210, 4, 45, 0.1), transparent 70%)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.5s',
                    borderBottomRightRadius: '24px',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

const WebServices = () => {
    const services = [
        {
            title: 'Website Remaster',
            description: 'Remaster your existing website using your current web files. A fast two-step process: you provide the files, we modernize and return an upgraded site. Hosting not included.',
            bestFor: 'Businesses with an existing site that needs a visual and performance refresh.',
            price: '£150 Flat Fee',
        },
        {
            title: 'Website Creation',
            description: 'We create a brand-new website from a bulk document of your business info. We build it, show a preview, and once approved we hand over all access.',
            bestFor: 'New businesses or teams without an existing site who want a clean launch.',
            price: '£250 Flat Fee',
        },
        {
            title: 'Website Hosting + SEO',
            description: 'Reliable hosting plus ongoing SEO improvements to lift rankings and visibility on Google.',
            bestFor: 'Owners who want a low‑maintenance site that steadily climbs search results.',
            price: '£30 P/M',
        },
    ];

    return (
        <div style={{ position: 'relative', background: '#FFFFFF', minHeight: '100vh', overflow: 'hidden' }}>
            <style>
                {`
          @keyframes particleFloat {
            0%, 100% { transform: translate(0, 0); opacity: 0.3; }
            25% { transform: translate(30px, -40px); opacity: 0.6; }
            50% { transform: translate(-20px, -70px); opacity: 0.4; }
            75% { transform: translate(40px, -30px); opacity: 0.5; }
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shimmerSlide {
            0% { left: -100%; }
            100% { left: 200%; }
          }

          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @media (max-width: 768px) {
            .service-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
            </style>

            {/* Header Section */}
            <div
                style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #1D1D1F 0%, #2D2D2F 50%, #1D1D1F 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 8s ease infinite',
                    padding: '5rem 2rem',
                    textAlign: 'center',
                    overflow: 'hidden',
                    borderBottom: '3px solid #D2042D',
                }}
            >
                {/* Floating particles */}
                <div style={{ position: 'absolute', top: '20%', left: '10%' }}>
                    <FloatingParticle delay={0} duration={8} size={6} />
                </div>
                <div style={{ position: 'absolute', top: '60%', left: '25%' }}>
                    <FloatingParticle delay={2} duration={10} size={4} />
                </div>
                <div style={{ position: 'absolute', top: '40%', right: '15%' }}>
                    <FloatingParticle delay={4} duration={9} size={5} />
                </div>
                <div style={{ position: 'absolute', top: '70%', right: '30%' }}>
                    <FloatingParticle delay={6} duration={11} size={7} />
                </div>

                <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
                    {/* Icon */}
                    <div
                        style={{
                            display: 'inline-block',
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #D2042D, #FF1744)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.5rem',
                            marginBottom: '2rem',
                            boxShadow: '0 15px 40px rgba(210, 4, 45, 0.4)',
                            animation: 'slideInUp 0.6s ease-out',
                        }}
                    >
                        🌐
                    </div>

                    <h1
                        style={{
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            color: '#FFFFFF',
                            marginBottom: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontWeight: '800',
                            animation: 'slideInUp 0.6s ease-out 0.1s backwards',
                        }}
                    >
                        Web Services
                    </h1>

                    <p
                        style={{
                            fontSize: '1.3rem',
                            color: 'rgba(255, 255, 255, 0.85)',
                            lineHeight: '1.7',
                            maxWidth: '600px',
                            margin: '0 auto',
                            animation: 'slideInUp 0.6s ease-out 0.2s backwards',
                        }}
                    >
                        Crafting beautiful, high-performing websites that captivate your audience and drive growth.
                    </p>
                </div>

                {/* Bottom glow */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%',
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, #D2042D, #FF1744, #D2042D, transparent)',
                        filter: 'blur(8px)',
                    }}
                />
            </div>

            {/* Services Grid */}
            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '6rem 2rem',
                }}
            >
                <div
                    className="service-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2.5rem',
                    }}
                >
                    {services.map((service, index) => (
                        <a
                            key={index}
                            href="mailto:dylan@verndigital.com?subject=Web Services Inquiry"
                            style={{
                                textDecoration: 'none',
                                position: 'relative'
                            }}
                        >
                            <ServiceOffering {...service} index={index} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div
                style={{
                    background: 'linear-gradient(135deg, #F5F5F7 0%, #FFFFFF 100%)',
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    borderTop: '1px solid #EAEAEA',
                }}
            >
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2
                        style={{
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                            color: '#1D1D1F',
                            marginBottom: '1rem',
                            fontWeight: '700',
                        }}
                    >
                        Not Sure Which Service You Need?
                    </h2>
                    <p
                        style={{
                            fontSize: '1.1rem',
                            color: '#7a7a7a',
                            marginBottom: '2rem',
                            lineHeight: '1.7',
                        }}
                    >
                        Let's discuss your goals and find the perfect solution for your business.
                    </p>
                    <button
                        style={{
                            background: 'linear-gradient(135deg, #D2042D, #FF1744)',
                            color: '#FFFFFF',
                            padding: '1rem 2.5rem',
                            borderRadius: '50px',
                            border: 'none',
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: '1rem',
                            fontWeight: '700',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(210, 4, 45, 0.3)',
                            transition: 'all 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 15px 40px rgba(210, 4, 45, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 10px 30px rgba(210, 4, 45, 0.3)';
                        }}
                    >
                        Schedule a Consultation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WebServices;