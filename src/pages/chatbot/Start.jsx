import { Link } from 'react-router-dom';

const Content = () => {
    return (
        <div style={{ padding: '6rem 2rem' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'Exo 2', sans-serif", marginBottom: '1rem' }}>Provide Your Content</h2>
                <p style={{ color: '#7a7a7a', marginBottom: '1rem' }}>Paste your FAQs/services or upload a single file. This is a placeholder; we will wire the backend ingestion later.</p>
                <textarea placeholder="Paste your FAQs, services, pricing, etc." rows={10} style={{ width: '100%', padding: '1rem', borderRadius: 8, border: '1px solid #EAEAEA', marginBottom: '1rem' }} />
                <div style={{ marginBottom: '1.5rem' }}>
                    <input type="file" />
                </div>
                <Link to="/chatbot/training" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #D2042D, #FF1744)', color: '#fff', padding: '0.9rem 1.6rem', borderRadius: 999, fontWeight: 700 }}>
                    Train My Bot (Bypass)
                </Link>
            </div>
        </div>
    );
};

export default Content;



