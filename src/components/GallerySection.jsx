import React, { useState } from 'react';

export default function GallerySection({ gallery, onPreviewImage }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Projects', 'Office', 'Events', 'Team'];

  const filteredItems = activeFilter === 'All'
    ? gallery
    : gallery.filter((item) => item.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section className="vcard-section gallery-section" id="gallery">
      <div className="section-header-compact">
        <h2 className="section-title">Gallery</h2>
      </div>

      {/* Filter Tabs */}
      <div className="gallery-filter-tabs">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-tab-pill ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid / Horizontal Slider */}
      <div className="gallery-grid-track">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="gallery-thumb-card"
            onClick={() => onPreviewImage?.(item)}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="gallery-img" 
              loading="lazy" 
            />
            <div className="gallery-hover-caption">
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="slider-indicator-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </section>
  );
}
