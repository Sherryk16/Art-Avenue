'use client';

import { useEffect } from 'react';

export default function FaviconComponent() {
  useEffect(() => {
    // Remove any existing favicons
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach(favicon => favicon.remove());

    // Create and append new favicon links
    const favicon32 = document.createElement('link');
    favicon32.rel = 'icon';
    favicon32.type = 'image/x-icon';
    favicon32.href = '/favicon.ico';
    document.head.appendChild(favicon32);

    const favicon16 = document.createElement('link');
    favicon16.rel = 'icon';
    favicon16.type = 'image/png';
    favicon16.sizes = '16x16';
    favicon16.href = '/favicon-16x16.png';
    document.head.appendChild(favicon16);

    const favicon32png = document.createElement('link');
    favicon32png.rel = 'icon';
    favicon32png.type = 'image/png';
    favicon32png.sizes = '32x32';
    favicon32png.href = '/favicon-32x32.png';
    document.head.appendChild(favicon32png);

    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.sizes = '180x180';
    appleTouchIcon.href = '/apple-touch-icon.png';
    document.head.appendChild(appleTouchIcon);
  }, []);

  return null;
}