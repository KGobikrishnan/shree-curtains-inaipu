import React from 'react';
import { Share2, CheckCircle2 } from 'lucide-react';
import { shareCard } from '../utils/vcfHelper';

export default function HeroSection({ profile, onShowNotification }) {
  const handleShare = async () => {
    const res = await shareCard(
      `${profile.name} - ${profile.company}`,
      `${profile.tagline}`,
      window.location.href
    );
    if (res?.method === 'clipboard') {
      onShowNotification?.('Link copied to clipboard!');
    }
  };

  return (
    <div className="hero-container">
      {/* Top Header Bar */}
      <div className="hero-top-bar hero-top-bar-single">
        <button 
          className="icon-glass-btn" 
          onClick={handleShare}
          aria-label="Share Profile"
        >
          <Share2 size={20} />
        </button>
      </div>

      {/* Cover Backdrop */}
      <div className="hero-cover-wrap">
        <img 
          src={profile.coverImage} 
          alt="Profile cover banner" 
          className="hero-cover-img" 
        />
        <div className="hero-cover-gradient"></div>
      </div>

      {/* Profile Card Body with Curved Mask */}
      <div className="hero-card-body">
        <div className="avatar-wrapper">
          <div className="avatar-ring">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="avatar-img" 
            />
          </div>
          <div className="status-indicator" title="Online & Available"></div>
        </div>

        <div className="profile-info">
          <div className="name-wrapper">
            <h1 className="person-name">{profile.name}</h1>
            {profile.verified && (
              <CheckCircle2 size={20} className="verified-badge" fill="#2563eb" color="#ffffff" />
            )}
          </div>
          <p className="person-role">{profile.title}</p>
          
          <div className="company-badge-wrap">
            <div className="company-logo-pill">
              <img 
                src={profile.companyLogo || "/logo.png"} 
                alt={profile.company} 
                className="company-logo-img" 
              />
              <span className="company-text">{profile.company}</span>
            </div>
          </div>


          <p className="company-tagline">“{profile.tagline}”</p>
          <p className="company-subtagline">{profile.subTagline}</p>
        </div>
      </div>
    </div>
  );
}
