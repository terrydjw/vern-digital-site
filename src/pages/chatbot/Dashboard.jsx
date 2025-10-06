import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({
        inquiries: 0,
        leads: 0,
        bookings: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => {
            setStats({
                inquiries: 127,
                leads: 43,
                bookings: 12
            });
            setIsLoading(false);
        }, 1500);
    }, []);

    const statCards = [
        {
            title: 'Inquiries Handled',
            value: stats.inquiries,
            icon: '💬',
            color: 'blue',
            description: 'Total customer inquiries processed'
        },
        {
            title: 'Leads Captured',
            value: stats.leads,
            icon: '🎯',
            color: 'green',
            description: 'Qualified leads generated'
        },
        {
            title: 'Bookings Made',
            value: stats.bookings,
            icon: '📅',
            color: 'purple',
            description: 'Appointments scheduled'
        }
    ];

    const recentActivity = [
        { type: 'inquiry', message: 'Customer asked about pricing', time: '2 minutes ago' },
        { type: 'lead', message: 'New lead captured from website', time: '15 minutes ago' },
        { type: 'booking', message: 'Appointment scheduled for tomorrow', time: '1 hour ago' },
        { type: 'inquiry', message: 'Customer requested demo', time: '2 hours ago' }
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Your Chatbot Dashboard</h1>
                    <p className="dashboard-subtitle">
                        Monitor your AI assistant's performance and track business growth
                    </p>
                </div>

                <div className="stats-grid">
                    {statCards.map((card, index) => (
                        <div key={index} className={`stat-card stat-card-${card.color}`}>
                            <div className="stat-icon">{card.icon}</div>
                            <div className="stat-content">
                                <div className="stat-title">{card.title}</div>
                                <div className="stat-value">
                                    {isLoading ? (
                                        <div className="stat-loading">
                                            <span className="loading-dots"></span>
                                        </div>
                                    ) : (
                                        card.value.toLocaleString()
                                    )}
                                </div>
                                <div className="stat-description">{card.description}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-sections">
                    <div className="section-card">
                        <div className="section-header">
                            <h3 className="section-title">Recent Activity</h3>
                            <span className="section-badge">Live</span>
                        </div>
                        <div className="activity-list">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className={`activity-item activity-${activity.type}`}>
                                    <div className="activity-icon">
                                        {activity.type === 'inquiry' && '💬'}
                                        {activity.type === 'lead' && '🎯'}
                                        {activity.type === 'booking' && '📅'}
                                    </div>
                                    <div className="activity-content">
                                        <div className="activity-message">{activity.message}</div>
                                        <div className="activity-time">{activity.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="section-card">
                        <div className="section-header">
                            <h3 className="section-title">Quick Actions</h3>
                        </div>
                        <div className="quick-actions">
                            <Link to="/chatbot/training" className="action-button primary">
                                <span className="action-icon">⚙️</span>
                                <span className="action-text">Update Training</span>
                            </Link>
                            <Link to="/chatbot/install" className="action-button secondary">
                                <span className="action-icon">🔗</span>
                                <span className="action-text">Install Widget</span>
                            </Link>
                            <button className="action-button secondary">
                                <span className="action-icon">📊</span>
                                <span className="action-text">View Analytics</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="upgrade-section">
                    <div className="upgrade-card">
                        <div className="upgrade-icon">🚀</div>
                        <div className="upgrade-content">
                            <h3 className="upgrade-title">Upgrade to Booking</h3>
                            <p className="upgrade-description">
                                Enable calendar integration to let your assistant check availability and book appointments automatically.
                            </p>
                            <div className="upgrade-features">
                                <div className="feature-item">✓ Calendar Integration</div>
                                <div className="feature-item">✓ Automatic Scheduling</div>
                                <div className="feature-item">✓ Email Notifications</div>
                            </div>
                        </div>
                        <div className="upgrade-action">
                            <a
                                href="mailto:dylan@verndigital.com"
                                className="upgrade-button"
                            >
                                Contact to Upgrade
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;



