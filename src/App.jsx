import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import './App.css';
import Services from './pages/Services';
import Contact from './pages/Contact';
import DemoPage from './pages/DemoPage';
import WebServices from './pages/WebServices';
import AiServices from './pages/AiServices';
import Consultancy from './pages/Consultancy';
import ChatbotStart from './pages/chatbot/Start';
import ChatbotSignup from './pages/chatbot/Signup';
import ChatbotTraining from './pages/chatbot/Training';
import ChatbotInstall from './pages/chatbot/Install';
import ChatbotDashboard from './pages/chatbot/Dashboard';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/web" element={<WebServices />} />
                <Route path="/services/ai" element={<AiServices />} />
                <Route path="/services/consultancy" element={<Consultancy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/demo/live-experience" element={<DemoPage />} />
                {/* Free Chatbot Flow */}
                <Route path="/chatbot/Start" element={<ChatbotStart />} />
                <Route path="/chatbot/signup" element={<ChatbotSignup />} />
                <Route path="/chatbot/training" element={<ChatbotTraining />} />
                <Route path="/chatbot/install" element={<ChatbotInstall />} />
                <Route path="/chatbot/dashboard" element={<ChatbotDashboard />} />
            </Routes>
        </Layout>
    );
}
export default App;

