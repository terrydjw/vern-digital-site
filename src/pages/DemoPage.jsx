import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FaEnvelope } from 'react-icons/fa';

const DemoPage = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

    return (
        <div>
            <div className="page-header">
                <h1>Live AI Assistant Demo</h1>
            </div>

            <div ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''} section-container`}>
                <div className="demo-gated-message">
                    <FaEnvelope />
                    <h3>Live Demo Access</h3>
                    <p>
                        Our interactive AI demo is available upon request. Please email us to receive a private link and see it in action.
                    </p>
                    <a href="mailto:dylan@verndigital.com">dylan@verndigital.com</a>
                </div>
            </div>
        </div>
    );
};

export default DemoPage;