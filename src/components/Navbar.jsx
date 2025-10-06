import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY;
            const height = document.body.scrollHeight - window.innerHeight;
            const pct = height > 0 ? Math.min(100, Math.max(0, (scrolled / height) * 100)) : 0;
            setProgress(pct);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className="navbar">
            {/* Ambient gradient beam */}
            <div className="nav-ambient" />

            <NavLink to="/" className="navbar-brand">
                <span className="logo-v">V</span>
                <span className="logo-text">ERN DIGITAL</span>
            </NavLink>
            {/* Mobile Menu Icon */}
            <div className="mobile-menu-icon" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Navigation Links */}
            <nav className={isMenuOpen ? "navbar-links mobile-open" : "navbar-links"}>
                <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link navbar-link-active" : "navbar-link"} onClick={toggleMenu}>Home</NavLink>
                <NavLink to="/services" className={({ isActive }) => isActive ? "navbar-link navbar-link-active" : "navbar-link"} onClick={toggleMenu}>Services</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "navbar-link navbar-link-active" : "navbar-link"} onClick={toggleMenu}>Contact</NavLink>
                <NavLink to="/demo/live-experience" className="navbar-cta-button" onClick={toggleMenu}>
                    Live Demo
                </NavLink>
            </nav>

            {/* Scroll progress bar */}
            <div className="nav-progress" style={{ width: `${progress}%` }} />
        </header>
    );
};
export default Navbar;