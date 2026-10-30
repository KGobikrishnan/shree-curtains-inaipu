import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function AboutSection({ about }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="vcard-section about-section" id="about">
      <div className="section-header-compact">
        <h2 className="section-title">About Us</h2>
      </div>

      <div className="about-card">
        <div className="about-text-content">
          <p className="about-paragraph">
            {about.description}
          </p>
          
          {isExpanded && (
            <p className="about-paragraph extended animate-fade-in">
              {about.extendedDescription}
            </p>
          )}

          <button 
            className="read-more-toggle" 
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <div className="about-brand-badge">
          <div className="brand-logo-glow">
            <img src="/curtain-logo.png" alt="Shree Curtains Logo" className="about-brand-logo-img" />
          </div>
        </div>

      </div>
    </section>
  );
}
