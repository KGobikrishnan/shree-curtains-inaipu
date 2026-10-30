import React from 'react';

export default function BusinessDetailsSection({ businessDetails }) {
  return (
    <section className="vcard-section business-details-section" id="business-details">
      <div className="section-header-compact">
        <h2 className="section-title">Business Details</h2>
      </div>

      <div className="business-details-card">
        <div className="business-grid">
          {businessDetails.map((item) => (
            <div key={item.label} className="business-stat-cell">
              <span className="b-stat-value">{item.value}</span>
              <span className="b-stat-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
