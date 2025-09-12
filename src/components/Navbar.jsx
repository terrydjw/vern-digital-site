import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="navbar">
            <NavLink to="/" className="navbar-brand">
                <span className="logo-v">V</span>
                <span className="logo-text">ERN DIGITAL</span>
            </NavLink>
            <nav className="navbar-links">
                <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link navbar-link-active" : "navbar-link"}>Home</NavLink>
                <NavLink to="/services" className={({ isActive }) => isActive ? "navbar-link navbar-link-active" : "navbar-link"}>Services</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "navbar-link navbar-link-active" : "navbar-link"}>Contact</NavLink>
                <NavLink to="/demo/live-experience" className="navbar-cta-button">
                    Live Demo
                </NavLink>
            </nav>
        </header>
    );
};
export default Navbar;