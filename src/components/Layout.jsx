import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [location.pathname]);

    return (
        <div className="app-container">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};
export default Layout;