'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function ProductImageLightbox({ src, alt }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll while modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* ─── Poster Trigger ─── */}
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-sm cursor-zoom-in group"
        onClick={() => src && setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="View full-size image"
        onKeyDown={(e) => e.key === 'Enter' && src && setIsOpen(true)}
      >
        {src ? (
          <div className="relative w-full aspect-[2/3] overflow-hidden rounded-2xl bg-transparent">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain object-top w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 420px"
            />
            {/* Zoom hint overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center pointer-events-none">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-auto">
                Click to enlarge
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-[2/3] overflow-hidden rounded-2xl flex items-center justify-center bg-gray-50 cursor-default">
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-200">
              <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        )}
      </div>

      {/* ─── Lightbox Modal ─── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}  // click outside → close
          role="dialog"
          aria-modal="true"
          aria-label="Full-size product image"
        >
          {/* Close button */}
          <button
            className="absolute top-4 end-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors duration-200"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            aria-label="Close image"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image — stops click from bubbling to overlay */}
          <div
            className="relative w-full h-full p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              quality={95}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
