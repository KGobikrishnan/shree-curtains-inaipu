import React, { useState } from 'react';
import { Smartphone, CreditCard, Building2, Copy, Check } from 'lucide-react';

export default function PaymentMethodsSection({ paymentMethods, bankDetails, onShowNotification }) {
  const [copiedField, setCopiedField] = useState(null);
  const [showBankModal, setShowBankModal] = useState(false);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    onShowNotification?.(`Copied ${fieldName} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handlePaymentClick = (pm) => {
    const upiId = bankDetails.upiId;
    const payeeName = encodeURIComponent(bankDetails.accountName || 'Navi Promotions');
    const transactionNote = encodeURIComponent('Payment to Navi Promotions');
    
    // Standard UPI URI format supported by all NPCI apps
    const baseUpiUri = `upi://pay?pa=${upiId}&pn=${payeeName}&tn=${transactionNote}&cu=INR`;

    if (pm.name === 'Bank Transfer') {
      setShowBankModal(true);
      return;
    }

    if (pm.name === 'Card') {
      setShowBankModal(true);
      return;
    }

    // Handle mobile app deep linking
    let deepLink = baseUpiUri;
    
    if (pm.name === 'Google Pay') {
      // Google Pay UPI deep link / intent
      deepLink = `tez://upi/pay?pa=${upiId}&pn=${payeeName}&tn=${transactionNote}&cu=INR`;
    } else if (pm.name === 'PhonePe') {
      // PhonePe UPI deep link
      deepLink = `phonepe://pay?pa=${upiId}&pn=${payeeName}&tn=${transactionNote}&cu=INR`;
    } else if (pm.name === 'Paytm') {
      // Paytm UPI deep link
      deepLink = `paytmmp://pay?pa=${upiId}&pn=${payeeName}&tn=${transactionNote}&cu=INR`;
    } else {
      // General UPI app intent (shows chooser on mobile: GPay, PhonePe, BHIM, etc.)
      deepLink = baseUpiUri;
    }

    // Copy UPI ID to clipboard as immediate backup for user convenience
    navigator.clipboard.writeText(upiId);
    onShowNotification?.(`Opening ${pm.name}... (UPI ID copied)`);

    // Trigger app opening
    // We try the specific app scheme, and if not supported or on desktop, window.location opens intent or falls back
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = deepLink;
      
      // Fallback timeout to general upi URI if app-specific custom protocol wasn't installed
      setTimeout(() => {
        window.location.href = baseUpiUri;
      }, 1000);
    } else {
      // On desktop, copy UPI ID & prompt user
      onShowNotification?.(`UPI ID (${upiId}) copied! Pay via ${pm.name} on your mobile.`);
    }
  };

  return (
    <section className="vcard-section payments-section" id="payments">
      <div className="section-header-compact">
        <h2 className="section-title">Payment Methods</h2>
      </div>

      {/* Payment Badges Grid */}
      <div className="payment-badges-grid">
        {paymentMethods.map((pm) => (
          <div 
            key={pm.name} 
            className="payment-badge-pill"
            onClick={() => handlePaymentClick(pm)}
            title={`Pay via ${pm.name}`}
          >
            <div className="pm-icon-wrap">
              {pm.name === 'Bank Transfer' ? (
                <Building2 size={16} />
              ) : pm.name === 'Card' ? (
                <CreditCard size={16} />
              ) : (
                <Smartphone size={16} />
              )}
            </div>
            <span className="pm-name">{pm.name}</span>
          </div>
        ))}
      </div>

      {/* Quick UPI Copy strip */}
      <div className="upi-quick-strip">
        <span className="upi-label">UPI ID: <strong>{bankDetails.upiId}</strong></span>
        <button 
          className="btn-copy-upi" 
          onClick={() => copyToClipboard(bankDetails.upiId, 'UPI ID')}
          title="Copy UPI ID"
        >
          {copiedField === 'UPI ID' ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
          <span>{copiedField === 'UPI ID' ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Bank Account Details Drawer / Modal */}
      {showBankModal && (
        <div className="modal-backdrop" onClick={() => setShowBankModal(false)}>
          <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Bank Account Details</h3>
              <button className="modal-close-btn" onClick={() => setShowBankModal(false)}>✕</button>
            </div>
            <div className="bank-details-body">
              <div className="bank-info-row">
                <span className="info-key">Bank:</span>
                <span className="info-val">{bankDetails.bank}</span>
              </div>
              <div className="bank-info-row">
                <span className="info-key">Account Name:</span>
                <span className="info-val">{bankDetails.accountName}</span>
              </div>
              <div className="bank-info-row">
                <span className="info-key">Account Number:</span>
                <span className="info-val copyable" onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account Number')}>
                  {bankDetails.accountNumber} <Copy size={13} />
                </span>
              </div>
              <div className="bank-info-row">
                <span className="info-key">IFSC Code:</span>
                <span className="info-val copyable" onClick={() => copyToClipboard(bankDetails.ifsc, 'IFSC Code')}>
                  {bankDetails.ifsc} <Copy size={13} />
                </span>
              </div>
              <div className="bank-info-row">
                <span className="info-key">UPI ID:</span>
                <span className="info-val copyable" onClick={() => copyToClipboard(bankDetails.upiId, 'UPI ID')}>
                  {bankDetails.upiId} <Copy size={13} />
                </span>
              </div>
            </div>
            <button className="btn-modal-primary" onClick={() => setShowBankModal(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
