import React from 'react';
import { Laptop, Rocket, Palette, Search, Camera } from 'lucide-react';

export default function CategoriesSection({ categories, onSelectCategory }) {
  const getCatIcon = (iconName) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop size={20} />;
      case 'Rocket':
        return <Rocket size={20} />;
      case 'Palette':
        return <Palette size={20} />;
      case 'Search':
        return <Search size={20} />;
      case 'Camera':
        return <Camera size={20} />;
      default:
        return <Rocket size={20} />;
    }
  };

  const colors = [
    { bg: '#eff6ff', text: '#2563eb' },
    { bg: '#ecfdf5', text: '#059669' },
    { bg: '#fff7ed', text: '#ea580c' },
    { bg: '#f0fdf4', text: '#16a34a' },
    { bg: '#f5f3ff', text: '#7c3aed' },
  ];

  return (
    <section className="vcard-section categories-section" id="categories">
      <div className="section-header-compact">
        <h2 className="section-title">Categories</h2>
      </div>

      <div className="categories-grid-scroll">
        {categories.map((cat, idx) => {
          const theme = colors[idx % colors.length];
          return (
            <button
              key={cat.id}
              className="category-circle-item"
              onClick={() => onSelectCategory?.(cat)}
            >
              <div 
                className="category-icon-wrapper"
                style={{ backgroundColor: theme.bg, color: theme.text }}
              >
                {getCatIcon(cat.icon)}
              </div>
              <span className="category-item-label">{cat.name}</span>
            </button>
          );
        })}
      </div>

      <div className="slider-indicator-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </section>
  );
}
