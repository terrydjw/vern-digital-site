import { useState } from 'react';
import { Link } from 'react-router-dom';

const Install = () => {
    const [activeMethod, setActiveMethod] = useState('html');
    const [copied, setCopied] = useState(false);

    const snippet = `<script>
  (function(){
    // Vern Digital AI Chatbot Widget
    window.VernChatbot = {
      apiKey: 'YOUR_API_KEY_HERE',
      position: 'bottom-right',
      theme: 'light'
    };
    
    // Load chatbot script
    var script = document.createElement('script');
    script.src = 'https://cdn.verndigital.com/chatbot/v1/widget.js';
    script.async = true;
    document.head.appendChild(script);
  })();
</script>`;

    const wordpressSnippet = `<!-- Add this to your theme's functions.php file -->
<?php
function add_vern_chatbot() {
    ?>
    <script>
      (function(){
        window.VernChatbot = {
          apiKey: 'YOUR_API_KEY_HERE',
          position: 'bottom-right',
          theme: 'light'
        };
        
        var script = document.createElement('script');
        script.src = 'https://cdn.verndigital.com/chatbot/v1/widget.js';
        script.async = true;
        document.head.appendChild(script);
      })();
    </script>
    <?php
}
add_action('wp_footer', 'add_vern_chatbot');
?>`;

    const shopifySnippet = `<!-- Add this to your theme.liquid file before </body> -->
<script>
  (function(){
    window.VernChatbot = {
      apiKey: 'YOUR_API_KEY_HERE',
      position: 'bottom-right',
      theme: 'light'
    };
    
    var script = document.createElement('script');
    script.src = 'https://cdn.verndigital.com/chatbot/v1/widget.js';
    script.async = true;
    document.head.appendChild(script);
  })();
</script>`;

    const installationMethods = [
        {
            id: 'html',
            title: 'HTML/JavaScript',
            description: 'For any website with HTML access',
            icon: '🌐',
            code: snippet
        },
        {
            id: 'wordpress',
            title: 'WordPress',
            description: 'For WordPress websites',
            icon: '📝',
            code: wordpressSnippet
        },
        {
            id: 'shopify',
            title: 'Shopify',
            description: 'For Shopify stores',
            icon: '🛒',
            code: shopifySnippet
        }
    ];

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const getCurrentCode = () => {
        const method = installationMethods.find(m => m.id === activeMethod);
        return method ? method.code : snippet;
    };

    const steps = [
        {
            number: 1,
            title: 'Copy the Code',
            description: 'Click the copy button below to copy the installation code to your clipboard'
        },
        {
            number: 2,
            title: 'Paste in Your Website',
            description: 'Paste the code just before the closing </body> tag of your website'
        },
        {
            number: 3,
            title: 'Test Your Chatbot',
            description: 'Visit your website to see your AI chatbot in action'
        }
    ];

    return (
        <div className="install-container">
            <div className="install-card">
                <div className="install-header">
                    <h1 className="install-title">Install Your Chatbot</h1>
                    <p className="install-subtitle">
                        Get your AI assistant live on your website in just a few minutes
                    </p>
                </div>

                <div className="installation-methods">
                    <h3 className="methods-title">Choose Your Platform</h3>
                    <div className="methods-grid">
                        {installationMethods.map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setActiveMethod(method.id)}
                                className={`method-button ${activeMethod === method.id ? 'active' : ''}`}
                            >
                                <div className="method-icon">{method.icon}</div>
                                <div className="method-content">
                                    <div className="method-title">{method.title}</div>
                                    <div className="method-description">{method.description}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="code-section">
                    <div className="code-header">
                        <h3 className="code-title">Installation Code</h3>
                        <button
                            onClick={() => copyToClipboard(getCurrentCode())}
                            className={`copy-button ${copied ? 'copied' : ''}`}
                        >
                            {copied ? '✓ Copied!' : '📋 Copy Code'}
                        </button>
                    </div>

                    <div className="code-container">
                        <pre className="code-block">
                            <code>{getCurrentCode()}</code>
                        </pre>
                    </div>
                </div>

                <div className="installation-steps">
                    <h3 className="steps-title">Installation Steps</h3>
                    <div className="steps-grid">
                        {steps.map((step) => (
                            <div key={step.number} className="step-item">
                                <div className="step-number">{step.number}</div>
                                <div className="step-content">
                                    <h4 className="step-title">{step.title}</h4>
                                    <p className="step-description">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="customization-section">
                    <h3 className="customization-title">Customization Options</h3>
                    <div className="customization-grid">
                        <div className="customization-item">
                            <div className="customization-icon">🎨</div>
                            <div className="customization-content">
                                <h4>Theme & Colors</h4>
                                <p>Match your chatbot to your brand colors and style</p>
                            </div>
                        </div>
                        <div className="customization-item">
                            <div className="customization-icon">📍</div>
                            <div className="customization-content">
                                <h4>Position</h4>
                                <p>Choose where your chatbot appears on the page</p>
                            </div>
                        </div>
                        <div className="customization-item">
                            <div className="customization-icon">💬</div>
                            <div className="customization-content">
                                <h4>Greeting Message</h4>
                                <p>Set a custom welcome message for visitors</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="install-actions">
                    <Link to="/chatbot/dashboard" className="install-button primary">
                        <span className="button-icon">📊</span>
                        Go to Dashboard
                    </Link>
                    <a href="mailto:dylan@verndigital.com" className="install-button secondary">
                        <span className="button-icon">💬</span>
                        Need Help?
                    </a>
                </div>

                <div className="install-footer">
                    <p className="footer-text">
                        Having trouble? Our support team is here to help you get your chatbot up and running.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Install;



