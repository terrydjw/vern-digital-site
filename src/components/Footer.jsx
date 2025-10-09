import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <h3>VERN DIGITAL</h3>
                    <p>Empowering local businesses with intelligent automation and professional web design.</p>
                </div>
                <div className="footer-links">
                    <h4>Navigate</h4>
                    <Link to="/">Home</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact</Link>
                    <div
                        style={{
                            position: 'relative',
                            cursor: 'not-allowed',
                            opacity: '0.7',
                            pointerEvents: 'none',
                            display: 'inline-block'
                        }}
                    >
                        {/* Testing Banner */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                                color: 'white',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '0.7rem',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                zIndex: 10,
                                boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
                                animation: 'pulse 2s infinite'
                            }}
                        >
                            Testing
                        </div>
                        Live Demo
                    </div>
                </div>
                <div className="footer-links">
                    <h4>Contact</h4>
                    <a href="mailto:dylan@verndigital.com">dylan@verndigital.com</a>
                    <p>07935 712911</p>
                    <p>Coventry, UK</p>
                </div>
            </div>
            <div className="copyright">
                &copy; {currentYear} Vern Digital. All Rights Reserved.
            </div>
        </footer>
    );
};
export default Footer;