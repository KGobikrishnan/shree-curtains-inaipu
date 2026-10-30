import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

export default function AppointmentBanner({ onOpenBookingModal }) {
  return (
    <section className="vcard-section appointment-banner-section" id="appointment">
      <div className="appointment-card-gradient">
        <div className="appointment-left">
          <div className="calendar-icon-box">
            <Calendar size={22} className="cal-icon" />
          </div>
          <div className="appointment-text">
            <h3 className="appointment-heading">Book an Appointment</h3>
            <p className="appointment-sub">Schedule a meeting or consultation at your convenient time.</p>
          </div>
        </div>

        <button 
          className="btn-book-now" 
          onClick={onOpenBookingModal}
          id="btn-trigger-appointment"
        >
          <Calendar size={14} />
          <span>Book Now</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </section>
  );
}
