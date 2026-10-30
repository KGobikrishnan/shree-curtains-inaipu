import React from 'react';
import { Sparkles, Phone, MessageCircle } from 'lucide-react';

export default function Header({ onContactClick }) {
  return (
    <header className="inaiqu-header">
      <div className="inaiqu-header-container">
        {/* Left: Brand Logo & Name */}
        <div className="inaiqu-brand">
          <div className="inaiqu-logo-icon">
            <span className="inaiqu-symbol">i</span>
            <span className="inaiqu-dot"></span>
          </div>
          <div className="inaiqu-brand-text">
            <span className="inaiqu-brand-name">inaiqu</span>
            <span className="inaiqu-brand-badge">NFC Smart Card</span>
          </div>
        </div>

        {/* Right: Quick Action CTAs */}
        <div className="inaiqu-actions">
          <a
            href="tel:+919865860076"
            className="inaiqu-btn inaiqu-btn-call"
            aria-label="Call A. Raja"
            title="Call"
          >
            <Phone size={14} />
            <span className="inaiqu-btn-text">Call</span>
          </a>
          <a
            href="https://wa.me/919865860076?text=Hi%20Shree%20Curtains,%20I%20found%20your%20digital%20card!"
            target="_blank"
            rel="noopener noreferrer"
            className="inaiqu-btn inaiqu-btn-whatsapp"
            aria-label="WhatsApp A. Raja"
            title="WhatsApp"
          >
            <MessageCircle size={14} />
            <span className="inaiqu-btn-text">Chat</span>
          </a>
        </div>
      </div>
    </header>
  );
}
