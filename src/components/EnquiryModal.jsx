import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EnquiryModal({ isOpen, onClose, defaultItem, onShowNotification }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    setSent(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    onShowNotification?.(`Thank you ${name}! Your enquiry for "${defaultItem?.title || 'Services'}" was sent.`);
    setTimeout(() => {
      setSent(false);
      setName('');
      setPhone('');
      setMessage('');
      onClose();
    }, 2500);
  };

  return (
    <div className="appointment-drawer-backdrop" onClick={onClose}>
      <div 
        className="appointment-bottom-sheet animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-header">
          <h3 className="sheet-title">Send an Enquiry</h3>
          <button className="sheet-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {sent ? (
          <div className="booking-success-view">
            <Sparkles size={52} color="#6366f1" />
            <h4>Enquiry Sent!</h4>
            <p>We will get back to you via WhatsApp / Call in less than 30 minutes.</p>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            {defaultItem && (
              <div className="enquiry-item-preview">
                <span className="enquiry-badge">Inquiring about:</span>
                <strong>{defaultItem.title}</strong>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone / WhatsApp</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message / Requirements</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Tell us what you need..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn-confirm-booking">
              <Send size={15} />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
