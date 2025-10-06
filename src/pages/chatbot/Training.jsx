import { useState } from 'react';
import { Link } from 'react-router-dom';

const Training = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [trainingData, setTrainingData] = useState({
        businessName: '',
        industry: '',
        targetAudience: '',
        keyServices: '',
        brandTone: '',
        commonQuestions: [],
        customInstructions: '',
        uploadedFiles: []
    });
    const [isLoading, setIsLoading] = useState(false);

    const trainingSteps = [
        {
            id: 'business-info',
            title: 'Business Information',
            description: 'Tell us about your business to personalize your chatbot',
            icon: '🏢'
        },
        {
            id: 'audience',
            title: 'Target Audience',
            description: 'Define who your chatbot will be helping',
            icon: '👥'
        },
        {
            id: 'services',
            title: 'Key Services',
            description: 'What services should your chatbot promote?',
            icon: '⚡'
        },
        {
            id: 'personality',
            title: 'Brand Personality',
            description: 'Set the tone and personality of your chatbot',
            icon: '🎭'
        },
        {
            id: 'knowledge',
            title: 'Knowledge Base',
            description: 'Add common questions and custom instructions',
            icon: '🧠'
        },
        {
            id: 'bulk-upload',
            title: 'Bulk Upload',
            description: 'Upload documents or data to enhance your chatbot\'s knowledge',
            icon: '📄'
        }
    ];

    const industries = [
        'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education',
        'Real Estate', 'Legal', 'Marketing', 'Manufacturing', 'Other'
    ];

    const brandTones = [
        { value: 'professional', label: 'Professional', description: 'Formal and business-focused' },
        { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
        { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
        { value: 'expert', label: 'Expert', description: 'Authoritative and knowledgeable' },
        { value: 'creative', label: 'Creative', description: 'Innovative and inspiring' }
    ];

    const handleInputChange = (field, value) => {
        setTrainingData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleQuestionAdd = () => {
        setTrainingData(prev => ({
            ...prev,
            commonQuestions: [...prev.commonQuestions, { question: '', answer: '' }]
        }));
    };

    const handleQuestionChange = (index, field, value) => {
        setTrainingData(prev => ({
            ...prev,
            commonQuestions: prev.commonQuestions.map((q, i) =>
                i === index ? { ...q, [field]: value } : q
            )
        }));
    };

    const handleQuestionRemove = (index) => {
        setTrainingData(prev => ({
            ...prev,
            commonQuestions: prev.commonQuestions.filter((_, i) => i !== index)
        }));
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
        }));

        setTrainingData(prev => ({
            ...prev,
            uploadedFiles: [...prev.uploadedFiles, ...newFiles]
        }));
    };

    const handleFileRemove = (fileId) => {
        setTrainingData(prev => ({
            ...prev,
            uploadedFiles: prev.uploadedFiles.filter(file => file.id !== fileId)
        }));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const nextStep = () => {
        if (currentStep < trainingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    //This is the handleSubmit function that is used to submit the training data to the backend
    const handleSubmit = async () => {
        setIsLoading(true);

        // The Test URL you copied from the n8n Webhook node
        const webhookUrl = 'http://localhost:5678/webhook-test/08de943d-850d-454a-974b-7cf3caaedd2b';

        // Use FormData to handle both text fields and file uploads
        const formData = new FormData();

        // Append all the text-based training data
        formData.append('businessName', trainingData.businessName);
        formData.append('industry', trainingData.industry);
        formData.append('targetAudience', trainingData.targetAudience);
        formData.append('keyServices', trainingData.keyServices);
        formData.append('brandTone', trainingData.brandTone);
        formData.append('customInstructions', trainingData.customInstructions);
        formData.append('additionalNotes', trainingData.additionalNotes || '');

        // Append common questions as a JSON string
        formData.append('commonQuestions', JSON.stringify(trainingData.commonQuestions));

        // Append each uploaded file
        trainingData.uploadedFiles.forEach(fileObject => {
            formData.append('uploadedFiles', fileObject.file, fileObject.name);
        });

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Training data submitted successfully!');
                // Redirect to dashboard or next step on success
                window.location.href = '/chatbot/dashboard';
            } else {
                console.error('Failed to submit training data.');
                // Handle error (e.g., show an error message to the user)
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="step-content">
                        <div className="form-group">
                            <label className="form-label">Business Name *</label>
                            <input
                                type="text"
                                value={trainingData.businessName}
                                onChange={(e) => handleInputChange('businessName', e.target.value)}
                                className="form-input"
                                placeholder="Enter your business name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Industry *</label>
                            <select
                                value={trainingData.industry}
                                onChange={(e) => handleInputChange('industry', e.target.value)}
                                className="form-input"
                            >
                                <option value="">Select your industry</option>
                                {industries.map(industry => (
                                    <option key={industry} value={industry}>{industry}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="step-content">
                        <div className="form-group">
                            <label className="form-label">Target Audience *</label>
                            <textarea
                                value={trainingData.targetAudience}
                                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                                className="form-input"
                                rows="4"
                                placeholder="Describe your ideal customers (e.g., small business owners, tech professionals, healthcare providers)"
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="step-content">
                        <div className="form-group">
                            <label className="form-label">Key Services/Products *</label>
                            <textarea
                                value={trainingData.keyServices}
                                onChange={(e) => handleInputChange('keyServices', e.target.value)}
                                className="form-input"
                                rows="4"
                                placeholder="List your main services or products (e.g., web development, consulting, software solutions)"
                            />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="step-content">
                        <div className="form-group">
                            <label className="form-label">Brand Tone *</label>
                            <div className="tone-options">
                                {brandTones.map(tone => (
                                    <label key={tone.value} className="tone-option">
                                        <input
                                            type="radio"
                                            name="brandTone"
                                            value={tone.value}
                                            checked={trainingData.brandTone === tone.value}
                                            onChange={(e) => handleInputChange('brandTone', e.target.value)}
                                            className="tone-radio"
                                        />
                                        <div className="tone-content">
                                            <div className="tone-label">{tone.label}</div>
                                            <div className="tone-description">{tone.description}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="step-content">
                        <div className="form-group">
                            <label className="form-label">Common Questions & Answers</label>
                            <p className="form-help">Add frequently asked questions and their answers to help your chatbot respond accurately.</p>

                            {trainingData.commonQuestions.map((qa, index) => (
                                <div key={index} className="question-item">
                                    <div className="question-row">
                                        <input
                                            type="text"
                                            value={qa.question}
                                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                            className="form-input"
                                            placeholder="Question"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleQuestionRemove(index)}
                                            className="remove-question-btn"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <textarea
                                        value={qa.answer}
                                        onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                                        className="form-input"
                                        rows="2"
                                        placeholder="Answer"
                                    />
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={handleQuestionAdd}
                                className="add-question-btn"
                            >
                                + Add Question
                            </button>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Custom Instructions</label>
                            <textarea
                                value={trainingData.customInstructions}
                                onChange={(e) => handleInputChange('customInstructions', e.target.value)}
                                className="form-input"
                                rows="4"
                                placeholder="Any specific instructions for your chatbot (e.g., always mention your 24/7 support, include pricing information when asked)"
                            />
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="step-content">
                        <div className="form-group">
                            <label className="form-label">Upload Business Documents</label>
                            <p className="form-help">
                                Upload documents like brochures, FAQs, product catalogs, or any other materials that contain information your chatbot should know about.
                            </p>

                            <div className="file-upload-area">
                                <input
                                    type="file"
                                    id="file-upload"
                                    multiple
                                    accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls"
                                    onChange={handleFileUpload}
                                    className="file-input"
                                />
                                <label htmlFor="file-upload" className="file-upload-label">
                                    <div className="upload-icon">📁</div>
                                    <div className="upload-text">
                                        <strong>Click to upload files</strong>
                                        <span>or drag and drop files here</span>
                                    </div>
                                    <div className="upload-formats">
                                        PDF, DOC, DOCX, TXT, CSV, XLSX, XLS
                                    </div>
                                </label>
                            </div>

                            {trainingData.uploadedFiles.length > 0 && (
                                <div className="uploaded-files">
                                    <h4 className="files-title">Uploaded Files</h4>
                                    {trainingData.uploadedFiles.map((file) => (
                                        <div key={file.id} className="file-item">
                                            <div className="file-info">
                                                <div className="file-name">{file.name}</div>
                                                <div className="file-size">{formatFileSize(file.size)}</div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleFileRemove(file.id)}
                                                className="remove-file-btn"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Additional Notes</label>
                            <textarea
                                value={trainingData.additionalNotes || ''}
                                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                                className="form-input"
                                rows="3"
                                placeholder="Any additional context or instructions about the uploaded files..."
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="training-container">
            <div className="training-card">
                <div className="training-header">
                    <h1 className="training-title">Train Your Chatbot</h1>
                    <p className="training-subtitle">
                        Let's personalize your AI chatbot to match your business perfectly
                    </p>
                </div>

                <div className="progress-section">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((currentStep + 1) / trainingSteps.length) * 100}%` }}
                        ></div>
                    </div>
                    <div className="progress-text">
                        Step {currentStep + 1} of {trainingSteps.length}
                    </div>
                </div>

                <div className="step-header">
                    <div className="step-icon">{trainingSteps[currentStep].icon}</div>
                    <div className="step-info">
                        <h2 className="step-title">{trainingSteps[currentStep].title}</h2>
                        <p className="step-description">{trainingSteps[currentStep].description}</p>
                    </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="training-form">
                    {renderStepContent()}

                    <div className="step-navigation">
                        <button
                            type="button"
                            onClick={prevStep}
                            className="nav-button prev-button"
                            disabled={currentStep === 0}
                        >
                            Previous
                        </button>

                        {currentStep < trainingSteps.length - 1 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="nav-button next-button"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className={`training-submit-button ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading-spinner"></span>
                                        Training Your Chatbot...
                                    </>
                                ) : (
                                    'Complete Training'
                                )}
                            </button>
                        )}
                    </div>
                </form>

                <div className="training-footer">
                    <p className="skip-text">
                        Need help? <Link to="/contact" className="help-link">Contact our support team</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Training;
