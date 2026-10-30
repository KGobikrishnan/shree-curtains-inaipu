import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Megaphone, Laptop, Palette, TrendingUp, Users } from 'lucide-react';

export default function ServicesSection({ services, onSelectService }) {
  const scrollRef = useRef(null);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Megaphone':
        return <Megaphone size={20} className="service-icon" />;
      case 'Laptop':
        return <Laptop size={20} className="service-icon" />;
      case 'Palette':
        return <Palette size={20} className="service-icon" />;
      case 'TrendingUp':
        return <TrendingUp size={20} className="service-icon" />;
      case 'Users':
        return <Users size={20} className="service-icon" />;
      default:
        return <Laptop size={20} className="service-icon" />;
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="vcard-section services-section" id="services">
      <div className="section-header-row">
        <h2 className="section-title">Services</h2>
        <div className="carousel-nav-arrows">
          <button 
            className="nav-arrow-btn" 
            onClick={() => scroll('left')}
            aria-label="Previous Services"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            className="nav-arrow-btn" 
            onClick={() => scroll('right')}
            aria-label="Next Services"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="cards-slider-container services-track" ref={scrollRef}>
        {services.map((item) => (
          <div 
            key={item.id} 
            className="service-card"
            onClick={() => onSelectService?.(item)}
          >
            <div className="service-icon-box">
              {getServiceIcon(item.icon)}
            </div>
            <div className="service-details">
              <h3 className="service-title">{item.title}</h3>
              <p className="service-subtitle">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
