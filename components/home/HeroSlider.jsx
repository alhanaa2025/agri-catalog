"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/client';

export default function HeroSlider({ slides, locale }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-[60vh] bg-gray-100 flex items-center justify-center">
        <h2 className="text-2xl text-gray-400 font-semibold opacity-50">
          No slides available
        </h2>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
      {slides.map((slide, index) => {
        const imageUrl = slide.image ? urlFor(slide.image).width(1920).height(1080).url() : '';
        const caption = slide.caption?.[locale] || '';
        
        return (
          <div 
            key={slide._key || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {imageUrl && (
              <Image 
                src={imageUrl}
                alt={caption || 'Hero slide'}
                fill
                priority={index === 0}
                className="object-cover"
              />
            )}
            
            {/* Subtle overlay for text readability */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Caption Content */}
            {caption && (
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] text-center max-w-4xl tracking-wide">
                  {caption}
                </h2>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
