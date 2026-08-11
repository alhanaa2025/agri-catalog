import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/client';

export default function Footer({ settings, locale }) {
  const siteTitle = settings?.siteTitle?.[locale] || 'AgriCatalog';
  const logoUrl = settings?.logo ? urlFor(settings.logo).height(80).url() : null;
  const email = settings?.contactEmail || '';
  const phones = settings?.phoneNumbers || [];
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', href: `/${locale}` },
    { name: locale === 'ar' ? 'من نحن' : 'About Us', href: `/${locale}/about` },
    { name: locale === 'ar' ? 'المنتجات' : 'Products', href: `/${locale}/products` },
    { name: locale === 'ar' ? 'اتصل بنا' : 'Contact Us', href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-[#131b2f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">

          {/* Column 1: Logo & Tagline */}
          <div>
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              {logoUrl ? (
                <Image src={logoUrl} alt={siteTitle} width={40} height={40} className="object-contain" />
              ) : (
                <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              )}
              <span className="font-bold text-lg text-white">{siteTitle}</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {locale === 'ar'
                ? 'نوفر أفضل المنتجات الزراعية بجودة عالية وأسعار تنافسية لدعم المزارعين.'
                : 'Providing high-quality agricultural products at competitive prices to support farmers.'}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-5 text-white/90 uppercase tracking-wider text-sm">
              {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-green-400 text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="text-green-500">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-bold text-base mb-5 text-white/90 uppercase tracking-wider text-sm">
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <ul className="space-y-4">
              {phones.length > 0 && (
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="flex flex-col gap-1">
                    {phones.map((phone, i) => (
                      <a key={i} href={`tel:${phone}`} className="text-white/60 hover:text-green-400 text-sm transition-colors" dir="ltr">
                        {phone}
                      </a>
                    ))}
                  </div>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${email}`} className="text-white/60 hover:text-green-400 text-sm transition-colors break-all">
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 text-center">
          <p className="text-white/40 text-[13px]">
            &copy; {currentYear} {siteTitle}.{' '}
            {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
