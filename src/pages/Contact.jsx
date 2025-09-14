import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

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
            e.target.reset(); // Reset the form after successful submission
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div>
            {/* Separate Grey Header */}
            <div className="page-header">
                <h1>Get in Touch</h1>
                <p>Have a question or want to discuss a project? We'd love to hear from you.</p>
            </div>

            {/* Centered Content Card */}
            <div ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''} contact-page-container`}>
                <div className="contact-card">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h2>Contact Information</h2>
                            <div className="info-item">
                                <FaEnvelope size={20} />
                                <a href="mailto:dylan@verndigital.com">dylan@verndigital.com</a>
                            </div>
                            <div className="info-item">
                                <FaPhone size={20} />
                                <span>07935 712911</span>
                            </div>
                            <div className="info-item">
                                <FaMapMarkerAlt size={20} />
                                <span>Coventry, United Kingdom</span>
                            </div>
                        </div>

                        <div className="contact-form">
                            <h2>Send a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input type="text" id="name" name="name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Your Email</label>
                                    <input type="email" id="email" name="email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" rows="5" required></textarea>
                                </div>
                                <button type="submit" className="cta-button">Send Message</button>
                            </form>
                            {/* This will display the success or error message to the user */}
                            {result && <p className="form-result-message">{result}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;