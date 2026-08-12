"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/client';

export default function Navbar({ settings, locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const siteTitle = settings?.siteTitle?.[locale] || 'AgriCatalog';
  const logoUrl = settings?.logo ? urlFor(settings.logo).height(80).url() : null;

  const handleLanguageSwitch = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const navLinks = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', href: `/${locale}` },
    { name: locale === 'ar' ? 'من نحن' : 'About Us', href: `/${locale}/about` },
    { name: locale === 'ar' ? 'المنتجات' : 'Products', href: `/${locale}/products` },
    { name: locale === 'ar' ? 'اتصل بنا' : 'Contact Us', href: `/${locale}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#131b2f] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            {logoUrl ? (
              <Image src={logoUrl} alt={siteTitle} width={200} height={60} className="object-contain h-12 w-auto" />
            ) : (
              <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            )}
            <span className="font-bold text-[19px] text-white tracking-wide">{siteTitle}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-semibold px-5 py-2 rounded-[4px] transition-colors ${
                    isActive ? 'bg-[#f43f5e] text-white' : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <button
              onClick={handleLanguageSwitch}
              className="ms-3 px-5 py-1.5 rounded-[4px] border border-[#f43f5e] text-[13px] font-semibold text-[#f43f5e] hover:bg-[#f43f5e]/10 transition-colors"
            >
              {locale === 'ar' ? 'English' : 'عربى'}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-72' : 'max-h-0'}`}>
        <div className="bg-[#0e1525] border-t border-white/10 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-[14px] font-medium ${
                  isActive ? 'bg-[#f43f5e] text-white' : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <button
            onClick={() => { handleLanguageSwitch(); setIsOpen(false); }}
            className="w-full text-start px-3 py-2.5 rounded-md text-[14px] font-medium text-[#f43f5e] hover:bg-[#f43f5e]/10"
          >
            {locale === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
          </button>
        </div>
      </div>
    </header>
  );
}
