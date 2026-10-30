import React from 'react';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import { SocialIcons } from './SocialIcons';

export default function ContactSocialSection({ quickActions, socialLinks }) {
  const getSocialIcon = (iconName) => {
    switch (iconName.toLowerCase()) {
      case 'instagram':
        return <SocialIcons.Instagram size={17} />;
      case 'facebook':
        return <SocialIcons.Facebook size={17} />;
      case 'linkedin':
        return <SocialIcons.Linkedin size={17} />;
      case 'twitter':
        return <SocialIcons.Twitter size={16} />;
      case 'youtube':
        return <SocialIcons.Youtube size={17} />;
      case 'pinterest':
        return <SocialIcons.Pinterest size={17} />;
      default:
        return <SocialIcons.Instagram size={17} />;
    }
  };


  return (
    <section className="vcard-section contact-social-section" id="contact">
      <div className="section-header-compact">
        <h2 className="section-title">Contact &amp; Social</h2>
      </div>

      <div className="contact-social-card">
        {/* Left Column: Direct Contact Info List */}
        <div className="contact-items-list">
          <a href={`tel:${quickActions.phone}`} className="contact-row-item">
            <div className="contact-icon-circle green-circle">
              <Phone size={15} />
            </div>
            <span className="contact-item-value">{quickActions.phone}</span>
          </a>

          {quickActions.phoneSecondary && (
            <a href={`tel:${quickActions.phoneSecondary}`} className="contact-row-item">
              <div className="contact-icon-circle green-circle">
                <Phone size={15} />
              </div>
              <span className="contact-item-value">{quickActions.phoneSecondary}</span>
            </a>
          )}

          <a href={`mailto:${quickActions.email}`} className="contact-row-item">
            <div className="contact-icon-circle blue-circle">
              <Mail size={15} />
            </div>
            <span className="contact-item-value">{quickActions.email}</span>
          </a>

          <a href={`mailto:${quickActions.email}`} className="contact-row-item">
            <div className="contact-icon-circle purple-circle">
              <Globe size={15} />
            </div>
            <span className="contact-item-value">{quickActions.email}</span>
          </a>
        </div>

        {/* Right Column: Social Icon Grid */}
        <div className="social-grid-wrapper">
          <div className="social-icon-grid">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-icon-btn social-${item.name.toLowerCase()}`}
                title={item.name}
                aria-label={item.name}
              >
                {getSocialIcon(item.name)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
