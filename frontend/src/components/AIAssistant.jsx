import React, { useState, useEffect, useRef } from 'react';
import { 
  VscRobot, VscSend, VscClose, VscCode, VscLightbulb, VscWand,
  VscRefresh, VscSettings, VscCheck, VscError, VscLoading
} from 'react-icons/vsc';
import aiServiceClient from '../services/aiService';
import { useProject } from '../context/ProjectContext';
import './AIAssistant.css';

/**
 * AI Assistant - Chat interface for code help
 * Like GitHub Copilot Chat
 */
const AIAssistant = () => {
  const { currentFile } = useProject();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState({ available: false, provider: null });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check AI availability on mount
  useEffect(() => {
    checkAIStatus();
  }, []);

  const checkAIStatus = async () => {
    const status = await aiServiceClient.checkAvailability();
    setAiStatus(status);
    
    if (status.available) {
      // Add welcome message
      setMessages([{
        role: 'assistant',
        content: `👋 Hi! I'm your AI coding assistant powered by ${status.provider}. I can help you:\n\n• Explain code\n• Generate functions\n• Fix bugs\n• Refactor code\n• Answer coding questions\n\nHow can I help you today?`,
        timestamp: new Date()
      }]);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare code context if file is open
      let codeContext = null;
      if (currentFile) {
        codeContext = {
          filePath: currentFile.path || currentFile.name,
          language: currentFile.extension?.replace('.', '') || 'javascript',
          code: currentFile.content || ''
        };
      }

      // Get AI response
      const result = await aiServiceClient.chat({
        message: input,
        conversationHistory: messages.slice(-10), // Last 10 messages for context
        codeContext
      });

      const assistantMessage = {
        role: 'assistant',
        content: result.response,
        timestamp: new Date(),
        provider: result.provider
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: `❌ Sorry, I encountered an error: ${error.message}\n\nPlease check if AI service is configured correctly.`,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    checkAIStatus(); // Re-add welcome message
  };

  const insertQuickPrompt = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const quickPrompts = [
    { icon: VscCode, text: 'Explain this code', prompt: 'Explain the current code file' },
    { icon: VscLightbulb, text: 'Suggest improvements', prompt: 'Suggest improvements for this code' },
    { icon: VscWand, text: 'Fix bugs', prompt: 'Help me find and fix bugs in this code' },
    { icon: VscRefresh, text: 'Refactor', prompt: 'Suggest refactoring for better code quality' }
  ];

  if (!aiStatus.available) {
    return (
      <div className="ai-assistant-unavailable">
        <VscRobot size={48} />
        <h3>AI Assistant Not Configured</h3>
        <p>To enable AI features, configure one of these free options:</p>
        <div className="ai-setup-options">
          <div className="ai-option">
            <strong>🤗 Hugging Face</strong>
            <p>Free cloud API</p>
            <code>HUGGINGFACE_API_KEY=...</code>
          </div>
          <div className="ai-option">
            <strong>🦙 Ollama</strong>
            <p>Free local models</p>
            <code>ollama serve</code>
          </div>
          <div className="ai-option">
            <strong>⚡ Groq</strong>
            <p>Free fast API</p>
            <code>GROQ_API_KEY=...</code>
          </div>
        </div>
        <p className="ai-docs-link">
          See <code>docs/AI_SETUP_GUIDE.md</code> for setup instructions
        </p>
      </div>
    );
  }

  return (
    <div className="ai-assistant-container">
      {/* Header */}
      <div className="ai-assistant-header">
        <div className="ai-header-info">
          <VscRobot />
          <div>
            <h3>AI Assistant</h3>
            <span className="ai-provider-badge">
              {aiStatus.provider} • FREE
            </span>
          </div>
        </div>
        <div className="ai-header-actions">
          <button 
            className="ai-action-btn" 
            onClick={clearChat}
            title="Clear chat"
          >
            <VscRefresh />
          </button>
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="ai-quick-prompts">
          <p className="quick-prompts-label">Quick actions:</p>
          <div className="quick-prompts-grid">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                className="quick-prompt-btn"
                onClick={() => insertQuickPrompt(prompt.prompt)}
              >
                <prompt.icon />
                <span>{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="ai-messages-container">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`ai-message ${msg.role} ${msg.isError ? 'error' : ''}`}
          >
            <div className="ai-message-avatar">
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="ai-message-content">
              <div className="ai-message-text">
                {msg.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div className="ai-message-meta">
                {msg.timestamp?.toLocaleTimeString()}
                {msg.provider && ` • ${msg.provider}`}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="ai-message assistant loading">
            <div className="ai-message-avatar">🤖</div>
            <div className="ai-message-content">
              <div className="ai-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="ai-input-container">
        {currentFile && (
          <div className="ai-context-badge">
            <VscCode size={12} />
            <span>Context: {currentFile.name}</span>
          </div>
        )}
        <div className="ai-input-wrapper">
          <textarea
            ref={inputRef}
            className="ai-input"
            placeholder="Ask me anything about your code..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            disabled={isLoading}
          />
          <button
            className="ai-send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? <VscLoading className="spinning" /> : <VscSend />}
          </button>
        </div>
        <div className="ai-input-hint">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
