import React, { useState } from 'react';
import { UserPlus, MessageCircle, Phone, Mail, Globe, MapPin, Check } from 'lucide-react';
import { downloadVcfContact } from '../utils/vcfHelper';
import confetti from 'canvas-confetti';

export default function QuickActionsSection({ profile, quickActions, onShowNotification }) {
  const [saved, setSaved] = useState(false);

  const handleSaveContact = () => {
    downloadVcfContact(profile, quickActions);
    setSaved(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
    onShowNotification?.('Contact file downloaded (VCF)');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${profile.name}, I found your digital card for Shree Curtains! I would like to enquire about your services.`);
    window.open(`https://wa.me/${quickActions.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="quick-actions-container">
      {/* Primary 2 Big Pill CTA Buttons */}
      <div className="primary-actions-row">
        <button 
          className="btn-primary-purple ripple-hover"
          onClick={handleSaveContact}
          id="btn-save-contact"
        >
          {saved ? <Check size={18} /> : <UserPlus size={18} />}
          <span>{saved ? 'Saved!' : 'Save Contact'}</span>
        </button>

        <button 
          className="btn-primary-green ripple-hover"
          onClick={handleWhatsApp}
          id="btn-whatsapp-primary"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </button>
      </div>

      {/* 5 Circular Icon Buttons */}
      <div className="icon-actions-row">
        <a 
          href={`tel:${quickActions.phone}`} 
          className="action-icon-pill pill-call"
          title="Call Now"
          aria-label="Call"
        >
          <div className="icon-circle">
            <Phone size={18} />
          </div>
          <span className="icon-label">Call</span>
        </a>

        <button 
          onClick={handleWhatsApp}
          className="action-icon-pill pill-whatsapp"
          title="Chat on WhatsApp"
          aria-label="WhatsApp"
        >
          <div className="icon-circle">
            <MessageCircle size={18} />
          </div>
          <span className="icon-label">WhatsApp</span>
        </button>

        <a 
          href={`mailto:${quickActions.email}`} 
          className="action-icon-pill pill-email"
          title="Send Email"
          aria-label="Email"
        >
          <div className="icon-circle">
            <Mail size={18} />
          </div>
          <span className="icon-label">Email</span>
        </a>

        <a 
          href={quickActions.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="action-icon-pill pill-web"
          title="Visit Website"
          aria-label="Website"
        >
          <div className="icon-circle">
            <Globe size={18} />
          </div>
          <span className="icon-label">Website</span>
        </a>

        <a 
          href={quickActions.directionsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="action-icon-pill pill-directions"
          title="Get Directions"
          aria-label="Directions"
        >
          <div className="icon-circle">
            <MapPin size={18} />
          </div>
          <span className="icon-label">Directions</span>
        </a>
      </div>
    </div>
  );
}
