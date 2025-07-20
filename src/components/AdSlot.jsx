import React, { useState } from 'react';

const AD_SIZES = {
  header: { width: '100%', height: 90, minWidth: 320, minHeight: 60 },
  rectangle: { width: 336, height: 280, minWidth: 200, minHeight: 100 },
  footer: { width: '100%', height: 90, minWidth: 320, minHeight: 60 },
};

const AD_LABELS = {
  header: 'Üst Reklam Alanı',
  rectangle: 'İçerik Arası Reklam',
  footer: 'Alt Reklam Alanı',
  default: 'Reklam Alanı',
};

export default function AdSlot({ slot = 'default', type = 'header', sticky = false, dismissible = false, style = {}, className = '' }) {
  const [visible, setVisible] = useState(true);
  const size = AD_SIZES[type] || AD_SIZES.header;
  const label = AD_LABELS[slot] || AD_LABELS[type] || AD_LABELS.default;

  if (!visible) return null;

  // Sticky ve dismissible özellikleri
  const stickyStyle = sticky
    ? { position: 'sticky', bottom: 0, zIndex: 1200, boxShadow: '0 -2px 8px rgba(0,0,0,0.08)' }
    : {};

  // Geliştirme ortamında dummy reklam kutusu
  if (import.meta.env.DEV) {
    return (
      <div
        className={className}
        style={{
          ...size,
          ...stickyStyle,
          background: 'repeating-linear-gradient(45deg, #f3f3f3, #f3f3f3 10px, #e0e0e0 10px, #e0e0e0 20px)',
          color: '#888',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          fontSize: 16,
          margin: '18px 0',
          minHeight: size.minHeight,
          minWidth: size.minWidth,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          position: sticky ? 'sticky' : 'relative',
          transition: 'opacity 0.3s',
          ...style,
        }}
      >
        {dismissible && (
          <button onClick={() => setVisible(false)} style={{ position: 'absolute', top: 6, right: 10, background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#aaa' }}>×</button>
        )}
        <span style={{ opacity: 0.7 }}>{label}</span>
      </div>
    );
  }
  // Prod ortamında gerçek reklam scripti eklenebilir
  return (
    <div className={className} style={{ ...size, ...stickyStyle, ...style, minHeight: size.minHeight, minWidth: size.minWidth }}>
      {/* Google AdSense kodunu buraya ekleyebilirsin */}
      {/* <ins className="adsbygoogle" ... /> */}
      {dismissible && (
        <button onClick={() => setVisible(false)} style={{ position: 'absolute', top: 6, right: 10, background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#aaa' }}>×</button>
      )}
    </div>
  );
} 