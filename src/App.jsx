import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import './App.css';
import Services from './pages/Services';
import Contact from './pages/Contact';
import DemoPage from './pages/DemoPage';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* We will add other pages like Services and Contact here later */}
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/demo/live-experience" element={<DemoPage />} />
            </Routes>
        </Layout>
    );
}
export default App;