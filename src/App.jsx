import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import QuickActionsSection from './components/QuickActionsSection';
import AboutSection from './components/AboutSection';
import ContactSocialSection from './components/ContactSocialSection';
import ProductsSection from './components/ProductsSection';
import ServicesSection from './components/ServicesSection';
import CategoriesSection from './components/CategoriesSection';
import AppointmentBanner from './components/AppointmentBanner';
import GallerySection from './components/GallerySection';
import CatalogueSection from './components/CatalogueSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import LocationSection from './components/LocationSection';
import TestimonialsSection from './components/TestimonialsSection';
import BusinessDetailsSection from './components/BusinessDetailsSection';
import FAQSection from './components/FAQSection';
import FinalCTASection from './components/FinalCTASection';
import FooterSection from './components/FooterSection';
import AppointmentModal from './components/AppointmentModal';
import EnquiryModal from './components/EnquiryModal';

import { vCardData } from './data/vCardData';
import { Sparkles, X } from 'lucide-react';
import './App.css';

export default function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [notification, setNotification] = useState(null);

  // Section visibility states
  const [visibleSections, setVisibleSections] = useState({

    hero: true,
    quickActions: true,
    about: true,
    contact: true,
    products: true,
    services: true,
    categories: true,
    appointment: true,
    gallery: true,
    catalogue: true,
    payments: true,
    location: true,
    testimonials: true,
    businessDetails: true,
    faq: true,
    finalCTA: true,
    footer: true,
  });

  const toggleSection = (sec) => {
    setVisibleSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const handleOpenProductEnquiry = (prod) => {
    setSelectedProduct(prod);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="app-root theme-orange">
      {/* Toast Notification */}

      {notification && (
        <div className="floating-toast animate-slide-down">
          <Sparkles size={16} color="#4ade80" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top inaiqu Brand Header */}
      <Header />

      {/* Main Responsive Page Container */}
      <main className="vcard-page-wrapper">
        <div className="vcard-card-container">
          {visibleSections.hero && (
            <HeroSection 
              profile={vCardData.profile} 
              onOpenMenu={() => {}}
              onShowNotification={showToast}
            />
          )}

          {visibleSections.quickActions && (
            <QuickActionsSection 
              profile={vCardData.profile}
              quickActions={vCardData.quickActions}
              onShowNotification={showToast}
            />
          )}

          {visibleSections.about && (
            <AboutSection about={vCardData.about} />
          )}

          {visibleSections.contact && (
            <ContactSocialSection 
              quickActions={vCardData.quickActions}
              socialLinks={vCardData.socialLinks}
            />
          )}

          {visibleSections.products && (
            <ProductsSection 
              products={vCardData.products} 
              onSelectProduct={handleOpenProductEnquiry}
            />
          )}

          {visibleSections.services && (
            <ServicesSection 
              services={vCardData.services} 
              onSelectService={(srv) => handleOpenProductEnquiry(srv)}
            />
          )}

          {visibleSections.categories && (
            <CategoriesSection 
              categories={vCardData.categories}
              onSelectCategory={(cat) => showToast(`Selected Category: ${cat.name}`)}
            />
          )}

          {visibleSections.appointment && (
            <AppointmentBanner 
              onOpenBookingModal={() => setIsAppointmentOpen(true)}
            />
          )}

          {visibleSections.gallery && (
            <GallerySection 
              gallery={vCardData.gallery} 
              onPreviewImage={(img) => setPreviewImage(img)}
            />
          )}

          {visibleSections.catalogue && (
            <CatalogueSection onShowNotification={showToast} />
          )}

          {visibleSections.payments && (
            <PaymentMethodsSection 
              paymentMethods={vCardData.paymentMethods}
              bankDetails={vCardData.bankDetails}
              onShowNotification={showToast}
            />
          )}

          {visibleSections.location && (
            <LocationSection 
              location={vCardData.location}
              quickActions={vCardData.quickActions}
            />
          )}

          {visibleSections.testimonials && (
            <TestimonialsSection testimonials={vCardData.testimonials} />
          )}

          {visibleSections.businessDetails && (
            <BusinessDetailsSection businessDetails={vCardData.businessDetails} />
          )}

          {visibleSections.faq && (
            <FAQSection faqs={vCardData.faqs} />
          )}

          {visibleSections.finalCTA && (
            <FinalCTASection 
              profile={vCardData.profile}
              quickActions={vCardData.quickActions}
              onOpenEnquiryModal={() => setIsEnquiryOpen(true)}
            />
          )}

          {visibleSections.footer && (
            <FooterSection 
              profile={vCardData.profile}
              socialLinks={vCardData.socialLinks}
            />
          )}
        </div>
      </main>


      {/* Appointment Bottom Sheet Modal */}
      <AppointmentModal 
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        onShowNotification={showToast}
      />

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquiryOpen}
        onClose={() => {
          setIsEnquiryOpen(false);
          setSelectedProduct(null);
        }}
        defaultItem={selectedProduct}
        onShowNotification={showToast}
      />

      {/* Gallery Image Preview Lightbox */}
      {previewImage && (
        <div className="lightbox-backdrop" onClick={() => setPreviewImage(null)}>
          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setPreviewImage(null)}>
              <X size={20} />
            </button>
            <img src={previewImage.image} alt={previewImage.title} className="lightbox-img" />
            <div className="lightbox-caption">
              <h3>{previewImage.title}</h3>
              <span>{previewImage.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
