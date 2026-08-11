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
      <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center">
        <h2 className="text-2xl text-gray-400 font-semibold opacity-50">
          No slides available
        </h2>
      </div>
    );
  }

  const getSlideState = (index, current, total) => {
    if (index === current) return 'active';
    if (index === (current - 1 + total) % total) return 'prev';
    return 'next';
  };

  const slideStyles = {
    active: { left: '0%', opacity: 1, zIndex: 10 },
    prev: { left: '-100%', opacity: 0, zIndex: 0 },
    next: { left: '100%', opacity: 0, zIndex: 0 },
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {slides.map((slide, index) => {
        const imageUrl = slide.image ? urlFor(slide.image).width(1920).height(1080).url() : '';
        const caption = slide.caption?.[locale] || '';
        const state = getSlideState(index, currentIndex, slides.length);
        const currentStyle = slideStyles[state];
        
        return (
          <div 
            key={slide._key || index}
            className="absolute w-full h-full"
            style={{
              ...currentStyle,
              transition: 'left 2s ease-in-out, opacity 2s ease-in-out'
            }}
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
              <div 
                className="absolute left-1/2 bottom-[45%] bg-black/20 text-white text-center font-bold rounded-[5px] px-3 py-2 min-w-[90%] md:min-w-[50%] text-2xl md:text-4xl"
                style={{
                  transform: state === 'active' ? 'translate(-50%, 0)' : 'translate(-50%, 30px)',
                  opacity: state === 'active' ? 1 : 0,
                  transition: 'opacity 1s ease-in-out 1s, transform 1s ease-in-out 1s'
                }}
              >
                {caption}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
