import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export default function LocationSection({ location, quickActions }) {
  return (
    <section className="vcard-section location-section" id="location">
      <div className="section-header-compact">
        <h2 className="section-title">Our Location</h2>
      </div>

      <div className="location-card">
        <div className="location-info-block">
          <div className="location-title-row">
            <h3 className="company-loc-name">{location.companyName}</h3>
          </div>
          <p className="loc-address-line">{location.addressLine1}</p>
          <p className="loc-address-line">{location.addressLine2}</p>
        </div>

        {/* Mini Map Preview Graphic */}
        <div className="mini-map-preview">
          <iframe
            title="Google Map Location"
            src="https://maps.google.com/maps?q=232%2F3%2C+LF+Road%2C+Cumbum%2C+Tamil+Nadu+625516&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="120"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Dual Location Action Buttons */}
        <div className="location-actions-grid">
          <a
            href={quickActions.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-location-action btn-loc-outline"
          >
            <MapPin size={15} />
            <span>Open in Maps</span>
          </a>

          <a
            href={quickActions.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-location-action btn-loc-filled"
          >
            <Navigation size={15} />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
    </section>
  );
}
