import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection({ faqs }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="vcard-section faq-section" id="faq">
      <div className="section-header-compact">
        <h2 className="section-title">Frequently Asked Questions</h2>
      </div>

      <div className="faq-accordion-list">
        {faqs.map((faq, index) => {
          const isOpen = openIdx === index;
          return (
            <div key={index} className={`faq-item-card ${isOpen ? 'open' : ''}`}>
              <button 
                className="faq-question-btn"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <div className="faq-q-left">
                  <HelpCircle size={17} className="faq-icon" />
                  <span className="faq-q-text">{faq.question}</span>
                </div>
                <ChevronDown size={17} className={`faq-arrow ${isOpen ? 'rotated' : ''}`} />
              </button>

              {isOpen && (
                <div className="faq-answer-panel animate-fade-in">
                  <p className="faq-answer-text">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
