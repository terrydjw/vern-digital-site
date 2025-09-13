import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import useCountUp from '../hooks/useCountUp';
import {
    FaRobot,
    FaCalendarCheck,
    FaLightbulb,
    FaBook,
    FaChartPie,
    FaGlobe
} from 'react-icons/fa';

// --- Reusable Sub-components ---
const Feature = ({ icon, title }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
    return (
        <div ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''} feature-card`}>
            <div className="icon-wrapper">{icon}</div>
            <h3>{title}</h3>
        </div>
    );
};

const AnimatedSection = ({ children, className = '' }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
    return (
        <section ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}>
            {children}
        </section>
    );
};

const MetricItem = ({ end, label, suffix = '' }) => {
    const [ref, count] = useCountUp(end, 2000, true);
    return (
        <div ref={ref} className="metric-item">
            <div className="metric-number">{count}{suffix}</div>
            <div className="metric-label">{label}</div>
        </div>
    );
};

// --- Main Home Page Component ---
const Home = () => {
    const detailedFeatures = [
        { icon: <FaCalendarCheck />, title: "Google Calendar Integration", text: "Automatically checks for availability and books confirmed appointments directly into your calendar." },
        { icon: <FaBook />, title: "Custom Knowledge Base", text: "Trained on your specific services, prices, and FAQs to provide instant, accurate answers." },
        { icon: <FaLightbulb />, title: "24/7 Lead Capture", text: "Never miss a customer. Our AI captures contact details and booking requests even when you're closed." },
        { icon: <FaRobot />, title: "Natural Conversations", text: "Powered by advanced language models to understand and respond to users in a friendly, human-like way." },
        { icon: <FaChartPie />, title: "Monthly Performance Report", text: "Receive a simple report detailing how many inquiries were handled and appointments were booked." },
        { icon: <FaGlobe />, title: "Multi-Language Support", text: "Can be configured to understand and respond in multiple languages to serve a wider customer base." }
    ];

    return (
        <div>
            {/* --- Hero Section --- */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-headline">
                        Your Website Should <span className="highlight">Work For You</span>, Not Against You.
                    </h1>
                    <p className="hero-subheading">
                        We build 24/7 AI Assistants that capture leads, book appointments, and delight your customers—turning your website into your most valuable employee.
                    </p>
                    <Link to="/demo/live-experience" className="cta-button">See It in Action</Link>
                </div>
            </section>

            {/* --- Social Proof Section --- */}
            <AnimatedSection className="social-proof-section">
                <div className="social-proof-content">
                    <h2 className="social-proof-title">Trusted by Leading Local Businesses</h2>
                    <div className="logos-grid">
                        <span className="logo-item">Coventry Back Motors</span>
                        <span className="logo-item">Turntle Auto Care</span>
                        <span className="logo-item">City Centre Salon</span>
                        <span className="logo-item">Eastside Clinic</span>
                    </div>
                </div>
            </AnimatedSection>

            {/* --- High-Level Features Section --- */}
            <AnimatedSection className="features-section">
                <div className="section-header">
                    <h2>Stop Losing Customers. Start Automating Growth.</h2>
                </div>
                <div className="features-grid">
                    <Feature icon={<FaCalendarCheck />} title="Automate Bookings 24/7" />
                    <Feature icon={<FaRobot />} title="Provide Instant Answers" />
                    <Feature icon={<FaLightbulb />} title="Capture Every Opportunity" />
                </div>
            </AnimatedSection>

            {/* --- Key Metrics Section --- */}
            <AnimatedSection className="metrics-section">
                <div className="metrics-grid">
                    <MetricItem end={45} suffix="%" label="Increase in Leads Captured" />
                    <MetricItem end={24} suffix="/7" label="Automated Availability" />
                    <MetricItem end={80} suffix="%" label="Reduction in Repetitive Questions" />
                </div>
            </AnimatedSection>

            {/* --- How It Works Section --- */}
            <AnimatedSection className="section-container how-it-works-section">
                <div className="section-header">
                    <h2>Get Your AI Assistant in 3 Simple Steps</h2>
                </div>
                <div className="timeline-container">
                    <div className="timeline-item left">
                        <div className="timeline-content">
                            <div className="timeline-step">Step 1</div>
                            <h3>Discovery & Analysis</h3>
                            <p>We work with you to understand your services, pricing, and common customer questions to build a comprehensive knowledge base for the AI.</p>
                        </div>
                    </div>
                    <div className="timeline-item right">
                        <div className="timeline-content">
                            <div className="timeline-step">Step 2</div>
                            <h3>Custom Build & Integration</h3>
                            <p>Our team develops and trains your AI assistant, connecting it to your calendar and ensuring it represents your brand and voice perfectly.</p>
                        </div>
                    </div>
                    <div className="timeline-item left">
                        <div className="timeline-content">
                            <div className="timeline-step">Step 3</div>
                            <h3>Launch & Support</h3>
                            <p>We deploy the assistant to your website. You immediately start capturing more leads and providing better customer service, with our full support.</p>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* --- Detailed Features Section --- */}
            <AnimatedSection className="section-container features-breakdown-section">
                <div className="section-header">
                    <h2>Full Feature Breakdown</h2>
                </div>
                <div className="features-breakdown-grid">
                    {detailedFeatures.map((feature, index) => (
                        <div key={index} className="feature-item">
                            <div className="feature-item-icon">{feature.icon}</div>
                            <div className="feature-item-content">
                                <h4>{feature.title}</h4>
                                <p>{feature.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </AnimatedSection>
        </div>
    );
};

export default Home;