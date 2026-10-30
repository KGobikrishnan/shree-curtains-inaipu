import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

export default function ProductsSection({ products, onSelectProduct }) {
  const scrollRef = useRef(null);

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
    <section className="vcard-section products-section" id="products">
      <div className="section-header-row">
        <h2 className="section-title">Products</h2>
        <div className="carousel-nav-arrows">
          <button 
            className="nav-arrow-btn" 
            onClick={() => scroll('left')}
            aria-label="Previous Products"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            className="nav-arrow-btn" 
            onClick={() => scroll('right')}
            aria-label="Next Products"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="cards-slider-container" ref={scrollRef}>
        {products.map((item) => (
          <div 
            key={item.id} 
            className="product-card"
            onClick={() => onSelectProduct?.(item)}
          >
            <div className="product-image-wrap">
              <img src={item.image} alt={item.title} className="product-thumb" loading="lazy" />
              <div className="product-badge-overlay">
                <ShoppingBag size={12} />
              </div>
            </div>
            
            <div className="product-card-body">
              <h3 className="product-card-title">{item.title}</h3>
              <div className="product-pricing">
                <span className="price-tag-sub">Starting From</span>
                <span className="price-tag-value">
                  {item.startingPrice} <small>{item.priceSub}</small>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination indicator dots */}
      <div className="slider-indicator-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </section>
  );
}
