import { useScrollAnimation } from '../hooks/useScrollAnimation';

const DemoPage = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

    return (
        <div>
            <div className="page-header">
                <h1>Live AI Assistant Demo</h1>
                <p>
                    This is a fully functional demonstration of our AI Assistant, integrated with a sample website for "Coventry Motors." Interact with the chatbot in the bottom-right corner to get a price estimate or book an appointment.
                </p>
            </div>

            <div ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''} demo-container`}>
                <div className="iframe-container">
                    <iframe
                        src="https://demo.verndigital.com"
                        title="Live AI Assistant Demo for Coventry Motors"
                        className="demo-frame"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default DemoPage;