import Image from 'next/image';
import Link from 'next/link';
import HeroSlider from '@/components/home/HeroSlider';
import CoreValues from '@/components/home/CoreValues';
import { client } from '@/sanity/client';
import { SITE_SETTINGS_QUERY, FEATURED_CATEGORIES_QUERY, FEATURED_PRODUCTS_QUERY } from '@/sanity/queries';
import { urlFor } from '@/sanity/client';

export default async function HomePage({ params }) {
  const { locale } = await params;

  const [settings, categories, products] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(FEATURED_CATEGORIES_QUERY),
    client.fetch(FEATURED_PRODUCTS_QUERY),
  ]);

  return (
    <div>

      {/* ─── Section 1: Hero Slider ─── */}
      <HeroSlider slides={settings?.heroSlides} locale={locale} />

      {/* ─── Section 2: About Teaser ─── */}
      <section className="relative py-12 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Column 1: Content */}
            <div className="flex flex-col items-start text-start">
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                {settings?.aboutUsPreHeader?.[locale] || (locale === 'ar' ? 'من نحن' : 'About Us')}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#131b2f] mb-6 leading-tight">
                {settings?.aboutUsTitle?.[locale] || (locale === 'ar' 
                  ? 'رؤية رائدة لحلول زراعية مستدامة' 
                  : 'Pioneering Sustainable Agricultural Solutions')}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                {settings?.aboutUsText?.[locale] || (locale === 'ar' 
                  ? 'قم بإضافة نبذة عن الشركة من لوحة تحكم Sanity.' 
                  : 'Please add an About Us text in the Sanity Studio.')}
              </p>
              
              <ul className="space-y-3 mb-10 w-full">
                {(settings?.aboutUsBullets?.map(b => b?.[locale]) || [
                  locale === 'ar' ? 'منتجات عالية الجودة' : 'Premium Quality Products',
                  locale === 'ar' ? 'زراعة مستدامة' : 'Sustainable Farming',
                  locale === 'ar' ? 'موثوقة من قبل المزارعين' : 'Trusted by Growers'
                ]).map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/about`}
                className="hidden md:inline-flex items-center gap-2 bg-[#131b2f] hover:bg-[#131b2f]/90 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
              >
                {locale === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Column 2: Visuals */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] w-full border border-gray-100">
                <Image 
                  src={settings?.aboutUsImage ? urlFor(settings.aboutUsImage).width(1200).url() : "https://images.unsplash.com/photo-1592982537447-6f296d11f810?q=80&w=1200&auto=format&fit=crop"}
                  alt={settings?.aboutUsTitle?.[locale] || "Agriculture Farm"}
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-green-900/10 mix-blend-multiply" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -start-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 border border-gray-100 z-10 hidden sm:flex">
                <div className="bg-green-100 p-3 rounded-lg text-green-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#131b2f]">100%</p>
                  <p className="text-sm font-semibold text-gray-500">
                    {settings?.aboutUsBadgeText?.[locale] || (locale === 'ar' ? 'شركاء موثوقون' : 'Trusted Partners')}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Mobile-only Read More Button (Below Image) */}
          <div className="mt-8 flex md:hidden">
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center justify-center gap-2 bg-[#131b2f] hover:bg-[#131b2f]/90 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors w-full sm:w-auto"
            >
              {locale === 'ar' ? 'اقرأ المزيد' : 'Read More'}
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Featured Categories Grid ─── */}
      {categories && categories.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#131b2f] text-center mb-2">
              {settings?.categoriesTitle?.[locale] || (locale === 'ar' ? 'استكشف منتجاتنا' : 'Explore Our Products')}
            </h2>
            <p className="text-center text-gray-500 text-sm mb-10">
              {settings?.categoriesSubtitle?.[locale] || (locale === 'ar' ? 'منتجات زراعية متخصصة مصممة لدعم الزراعة المستدامة.' : 'Specialized agricultural products tailored for sustainable farming.')}
            </p>
            <div className={`grid gap-6 ${
              categories.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
              categories.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' :
              categories.length === 3 ? 'grid-cols-1 sm:grid-cols-3 max-w-5xl mx-auto' :
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}>
              {categories.map((cat) => {
                const imageUrl = cat.image ? urlFor(cat.image).width(600).height(400).url() : null;
                return (
                  <Link
                    key={cat._id}
                    href={`/${locale}/products/${cat.slug}`}
                    className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 aspect-[4/3]"
                  >
                    {imageUrl ? (
                      <Image src={imageUrl} alt={cat.title?.[locale] || ''} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-green-100 flex items-center justify-center">
                        <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg drop-shadow">
                        {cat.title?.[locale] || cat.title?.en || ''}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── Section 4: Core Values ─── */}
      <CoreValues locale={locale} settings={settings} />

      {/* ─── Welcome Section (shown only if no products/categories yet) ─── */}
      {(!categories || categories.length === 0) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center bg-white">
          <h1 className="text-3xl font-bold text-[#131b2f] mb-3">
            {locale === 'ar' ? 'مرحباً' : 'Welcome'}
          </h1>
          {settings?.welcomeText?.[locale] && (
            <p className="text-[#64748b] max-w-2xl mx-auto text-[15px]">
              {settings.welcomeText[locale]}
            </p>
          )}
        </div>
      )}

    </div>
  );
}
