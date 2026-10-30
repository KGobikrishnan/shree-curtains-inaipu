import React, { useState } from 'react';
import { Star, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const item = testimonials[currentIndex];

  return (
    <section className="vcard-section testimonials-section" id="testimonials">
      <div className="section-header-compact">
        <h2 className="section-title">Testimonials</h2>
      </div>

      <div className="testimonial-card" onClick={nextTestimonial} title="Click to see next review">
        <div className="quote-mark-icon">
          <Quote size={20} className="quote-svg" />
        </div>

        <p className="testimonial-quote-text">
          “{item.quote}”
        </p>

        <div className="testimonial-footer-row">
          <div className="author-meta-block">
            <img src={item.avatar} alt={item.author} className="author-avatar-img" />
            <div className="author-text-info">
              <h4 className="author-name">{item.author}</h4>
              <p className="author-role">{item.role}</p>
              <div className="star-rating-row">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
            </div>
          </div>

          <button className="next-testimonial-btn" aria-label="Next Review">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Carousel indicators */}
        <div className="slider-indicator-dots">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
