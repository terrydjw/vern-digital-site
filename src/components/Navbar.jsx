import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="navbar">
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
        </header>
    );
};
export default Navbar;