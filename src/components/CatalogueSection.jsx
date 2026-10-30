import React, { useState } from 'react';
import { Download, FileText, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CatalogueSection({ onShowNotification }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    // Create a brochure download for Shree Curtains
    const dummyPdfContent = `%PDF-1.4\n1 0 obj\n<< /Title (Shree Curtains - Product & Services Brochure) /Author (A. Raja) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
    const blob = new Blob([dummyPdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Shree_Curtains_Catalogue.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onShowNotification?.('Catalogue downloaded successfully!');
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <section className="vcard-section catalogue-section" id="catalogue">
      <div className="catalogue-gradient-banner">
        <div className="catalogue-left-content">
          <div className="catalogue-icon-wrap">
            <FileText size={22} className="cat-icon" />
          </div>
          <div className="catalogue-text">
            <h3 className="catalogue-title">Download Catalogue</h3>
            <p className="catalogue-sub">Company Profile, Services, Price List &amp; More</p>
          </div>
        </div>

        <button 
          className="btn-download-cat"
          onClick={handleDownload}
          id="btn-catalogue-download"
        >
          {downloading ? <Check size={15} /> : <Download size={15} />}
          <span>{downloading ? 'Downloaded' : 'Download'}</span>
        </button>
      </div>
    </section>
  );
}
