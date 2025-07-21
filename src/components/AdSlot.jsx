import React, { useEffect, useRef } from 'react';

const AdSlot = ({ slot = 'default', height = 90 }) => {
  const adRef = useRef(null);

  useEffect(() => {
    // Scripti sadece bir kez ekle
    if (!window.adsbygoogle && !document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement('script');
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9292802772908311";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    }
    // Her renderda reklamı yükle
    setTimeout(() => {
      try {
        if (window.adsbygoogle && adRef.current) {
          window.adsbygoogle.push({});
        }
      } catch (e) {}
    }, 500);
  }, [slot]);

  return (
    <div style={{ width: '100%', textAlign: 'center', margin: '16px 0' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: height }}
        data-ad-client="ca-pub-9292802772908311"
        data-ad-slot="9173108350"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSlot; 