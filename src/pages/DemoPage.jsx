import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useWindowSize } from '../hooks/useWindowSize'; // Import our new hook
import { FaDesktop } from 'react-icons/fa';

const DemoPage = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
    const { width } = useWindowSize(); // Get the current window width
    const isDesktop = width > 768; // Define our breakpoint

    return (
        <div>
            <div className="page-header">
                <h1>Live AI Assistant Demo</h1>
                <p>
                    This is a fully functional demonstration of our AI Assistant, integrated with a sample website for "Coventry Motors."
                </p>
            </div>

            <div ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''} demo-container`}>
                {isDesktop ? (
                    // If on desktop, show the iframe
                    <div className="iframe-container">
                        <iframe
                            src="https://demo.verndigital.com"
                            title="Live AI Assistant Demo for Coventry Motors"
                            className="demo-frame"
                        ></iframe>
                    </div>
                ) : (
                    // If on mobile, show this message instead
                    <div className="desktop-only-message">
                        <FaDesktop />
                        <h3>This interactive demo is best viewed on a desktop.</h3>
                        <p>Please switch to a larger screen to experience the full functionality of the AI Assistant.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemoPage;