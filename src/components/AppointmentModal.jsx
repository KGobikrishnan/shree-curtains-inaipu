import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AppointmentModal({ isOpen, onClose, onShowNotification }) {
  const [formData, setFormData] = useState({
    service: 'Designer Window & Door Curtains',
    date: '2025-06-01',
    time: '10:00 AM',
    name: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const timeSlots = ['10:00 AM', '11:30 AM', '01:00 PM', '04:00 PM', '06:00 PM'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    onShowNotification?.(`Measurement appointment booked for ${formData.name} on ${formData.date} at ${formData.time}!`);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="appointment-drawer-backdrop" onClick={onClose}>
      <div 
        className="appointment-bottom-sheet animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sheet-header">
          <h3 className="sheet-title">Book a Free Measurement Visit</h3>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="booking-success-view">
            <CheckCircle size={52} color="#16a34a" />
            <h4>Visit Confirmed!</h4>
            <p>We have received your appointment request for <strong>{formData.time}</strong> on <strong>{formData.date}</strong>. A. Raja / Shree Curtains team will contact you shortly.</p>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            {/* Select Service */}
            <div className="form-group">
              <label className="form-label">Select Requirement</label>
              <select 
                className="form-select"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="Designer Window & Door Curtains">Designer Window &amp; Door Curtains</option>
                <option value="Mosquito Mesh Doors & Windows">Mosquito Mesh Doors &amp; Windows</option>
                <option value="Roller, Zebra & Venetian Blinds">Roller, Zebra &amp; Venetian Blinds</option>
                <option value="Netlon Insect Screen">Netlon Insect Screen</option>
                <option value="Complete Home Furnishing">Complete Home Furnishing</option>
              </select>
            </div>

            {/* Select Date */}
            <div className="form-group">
              <label className="form-label">Select Date</label>
              <div className="input-with-icon">
                <Calendar size={16} className="input-icon" />
                <input 
                  type="date" 
                  className="form-input icon-indent"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Select Time */}
            <div className="form-group">
              <label className="form-label">Select Time</label>
              <div className="time-chips-row">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className={`time-chip-btn ${formData.time === slot ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, time: slot })}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  className="form-input icon-indent"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">WhatsApp / Phone</label>
              <div className="input-with-icon">
                <Phone size={16} className="input-icon" />
                <input 
                  type="tel" 
                  className="form-input icon-indent"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-confirm-booking">
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
