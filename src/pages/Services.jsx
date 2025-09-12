import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FaRobot, FaDesktop, FaCheckCircle } from 'react-icons/fa';

const ServiceCard = ({ icon, title, description, features, imageFirst = false }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

    const content = (
        <div className="service-content">
            <h2>{title}</h2>
            <p className="description">{description}</p>
            <ul className="service-features">
                {features.map((feature, index) => (
                    <li key={index}><FaCheckCircle /> <span>{feature}</span></li>
                ))}
            </ul>
        </div>
    );

    const image = (
        <div className="service-image">
            {icon}
        </div>
    );

    return (
        <div ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''} service-card`}>
            {imageFirst ? [image, content] : [content, image]}
        </div>
    );
};

const Services = () => {
    const aiFeatures = [
        "24/7 Automated Booking & Quotes",
        "Integration with Google Calendar",
        "Custom-Trained on Your Business Data",
        "Reduces Staff Workload & Saves Time"
    ];

    const webFeatures = [
        "Mobile-First, Responsive Design",
        "Fast, Modern & Performant",
        "Professional & Clean Aesthetics",
        "Clear Calls-to-Action to Boost Conversions"
    ];

    return (
        <div>
            <div className="page-header">
                <h1>Our Services</h1>
                <p>We provide modern digital solutions to help local businesses thrive online.</p>
            </div>

            <div className="services-container section-container">
                <ServiceCard
                    icon={<FaRobot size={100} color="var(--color-accent-red)" />}
                    title="AI-Powered Assistants"
                    description="We build and integrate custom-trained AI chatbots directly into your website. Our assistants learn from your business information to provide instant, accurate quotes, answer frequently asked questions, and book appointments directly into your calendar."
                    features={aiFeatures}
                />

                <ServiceCard
                    icon={<FaDesktop size={100} color="var(--color-accent-red)" />}
                    title="Modern Website Remastering"
                    description="An outdated website can turn away potential customers. We remaster existing websites, giving them a clean, modern, and professional design that works perfectly on all devices. We focus on fast loading times and a clear user experience to help you convert more visitors into paying customers."
                    features={webFeatures}
                    imageFirst={true}
                />
            </div>
        </div>
    );
};

export default Services;