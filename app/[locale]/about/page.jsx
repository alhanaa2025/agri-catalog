import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/sanity/client';
import { SITE_SETTINGS_QUERY } from '@/sanity/queries';

// ─── Static params for output: 'export' ────────────────────────────────────
export async function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

// ─── Placeholder certificates (shown until real ones are added in Sanity) ──
const PLACEHOLDER_CERTS = [
  {
    title: { en: 'Quality Assurance Certificate', ar: 'شهادة ضمان الجودة' },
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: { en: 'Agricultural Accreditation', ar: 'اعتماد زراعي' },
    imageUrl: 'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=800&auto=format&fit=crop&q=80',
  },
];

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  const story =
    settings?.aboutPageStory?.[locale] ||
    (locale === 'ar'
      ? 'الشركة الهناء للمبيدات والأسمدة الزراعية هي شركة رائدة في مجال الحلول الزراعية المتكاملة. نسعى دائماً إلى تقديم أفضل المنتجات الزراعية التي تلبي احتياجات المزارعين وتدعم استدامة الأراضي الزراعية.\n\nتأسست الشركة بهدف واضح: ربط أحدث الابتكارات في علم الزراعة بالمزارعين على أرض الواقع، مما يساهم في رفع الإنتاجية وتحقيق التنمية الزراعية المستدامة.'
      : 'Al-Hanaa Agricultural Pesticides & Fertilizers is a pioneering company in the field of integrated agricultural solutions. We are always striving to provide the best agricultural products that meet farmers\' needs and support the sustainability of agricultural land.\n\nThe company was founded with a clear purpose: to bridge the latest innovations in agricultural science to farmers in the field, contributing to increased productivity and achieving sustainable agricultural development.');

  const certificates =
    settings?.certificates?.length > 0 ? settings.certificates : PLACEHOLDER_CERTS;

  const bannerImageUrl = settings?.aboutPageBanner 
    ? urlFor(settings.aboutPageBanner).width(1600).url() 
    : "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4e7?q=80&w=1600&auto=format&fit=crop";

  const stats = settings?.aboutPageStats?.length > 0 
    ? settings.aboutPageStats 
    : [
        { value: '15+', label: { ar: 'سنة من الخبرة', en: 'Years of Experience' } },
        { value: '500+', label: { ar: 'منتج زراعي', en: 'Agricultural Products' } },
        { value: '1000+', label: { ar: 'عميل موثوق', en: 'Trusted Customers' } },
        { value: '100%', label: { ar: 'جودة مضمونة', en: 'Guaranteed Quality' } },
      ];

  return (
    <div className="bg-white">

      {/* ─── Hero Banner ─────────────────────────────────────────────────── */}
      <section className="relative h-[360px] md:h-[460px] flex items-center justify-center overflow-hidden">
        <Image
          src={bannerImageUrl}
          alt="About Us Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#131b2f]/70" />
        <div className="relative z-10 text-center px-4">
          <span className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            {locale === 'ar' ? 'شركة الهناء' : 'Al-Hanaa Company'}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            {locale === 'ar' ? 'من نحن' : 'About Us'}
          </h1>
        </div>
      </section>

      {/* ─── Breadcrumb ──────────────────────────────────────────────────── */}
      <nav className="bg-gray-50 border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href={`/${locale}`} className="hover:text-green-600 transition-colors">
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#131b2f] font-medium">
            {locale === 'ar' ? 'من نحن' : 'About Us'}
          </span>
        </div>
      </nav>

      {/* ─── Company Story ───────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Content */}
            <div className="text-start">
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                {locale === 'ar' ? 'قصتنا' : 'Our Story'}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#131b2f] mb-6 leading-tight">
                {settings?.aboutPageStoryTitle?.[locale] || (locale === 'ar'
                  ? 'شراكة موثوقة في كل موسم'
                  : 'A Trusted Partner, Every Season')}
              </h2>
              {story.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-600 text-base md:text-lg leading-relaxed mb-5">
                  {para}
                </p>
              ))}
            </div>

            {/* Stats / Highlight Cards */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:border-green-200 hover:shadow-md transition-all duration-300"
                >
                  <p className="text-4xl font-black text-green-600 mb-2">{stat.value}</p>
                  <p className="text-sm font-semibold text-gray-500 leading-tight">
                    {stat.label?.[locale] || stat.label?.en || ''}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── Divider ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-200" />
      </div>

      {/* ─── Certificates & Accreditations ───────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              {locale === 'ar' ? 'الجودة والامتثال' : 'Quality & Compliance'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#131b2f] mb-4">
              {settings?.aboutPageCertificatesTitle?.[locale] || (locale === 'ar' ? 'شهاداتنا واعتماداتنا' : 'Our Accreditations & Certificates')}
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              {settings?.aboutPageCertificatesSubtitle?.[locale] || (locale === 'ar'
                ? 'نلتزم بأعلى معايير الجودة والسلامة الزراعية الدولية.'
                : 'We are committed to the highest international standards of agricultural quality and safety.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {certificates.map((cert, i) => {
              const title = cert.title?.[locale] || cert.title?.en || `Certificate ${i + 1}`;
              const imgUrl = cert.imageUrl;

              return (
                <div key={i} className="flex flex-col items-center gap-4">
                  <a
                    href={imgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full group"
                    title={title}
                  >
                    <div className="relative w-full aspect-[1/1.4] bg-gray-50 border border-gray-200 rounded-xl shadow-lg overflow-hidden group-hover:scale-[1.02] group-hover:shadow-2xl transition-all duration-300">
                      <Image
                        src={imgUrl}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                      {/* Overlay with "view" hint */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="bg-white/90 text-[#131b2f] text-sm font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {locale === 'ar' ? 'عرض بالحجم الكامل' : 'View Full Size'}
                        </div>
                      </div>
                    </div>
                  </a>
                  <p className="text-center font-semibold text-[#131b2f] text-base">{title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
