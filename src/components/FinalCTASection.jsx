import React from 'react';
import { Phone, MessageCircle, Send } from 'lucide-react';

export default function FinalCTASection({ profile, quickActions, onOpenEnquiryModal }) {
  const handleCall = () => {
    window.location.href = `tel:${quickActions.phone}`;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${profile.name}, I want to discuss curtains / blinds requirements with Shree Curtains!`);
    window.open(`https://wa.me/${quickActions.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section className="vcard-section final-cta-section" id="cta">
      <div className="final-cta-banner">
        <h3 className="cta-headline">Let's Work Together</h3>
        <p className="cta-subtext">We are ready to help you grow your business</p>

        {/* 3 Action Buttons */}
        <div className="cta-buttons-row">
          <button className="cta-btn cta-btn-white" onClick={handleCall}>
            <Phone size={14} />
            <span>Call Now</span>
          </button>

          <button className="cta-btn cta-btn-whatsapp" onClick={handleWhatsApp}>
            <MessageCircle size={14} />
            <span>WhatsApp Us</span>
          </button>

          <button className="cta-btn cta-btn-enquiry" onClick={onOpenEnquiryModal}>
            <Send size={14} />
            <span>Send an Enquiry</span>
          </button>
        </div>
      </div>
    </section>
  );
}
