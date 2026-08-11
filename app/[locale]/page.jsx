import Image from 'next/image';
import Link from 'next/link';
import HeroSlider from '@/components/home/HeroSlider';
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

      {/* ─── Section 2: Featured Categories Grid ─── */}
      {categories && categories.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#131b2f] text-center mb-2">
              {locale === 'ar' ? 'تصفح الأقسام' : 'Browse Categories'}
            </h2>
            <p className="text-center text-gray-500 text-sm mb-10">
              {locale === 'ar' ? 'اختر القسم الذي يناسبك' : 'Find the right category for your needs'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* ─── Section 3: About Teaser ─── */}
      {settings?.aboutUsText?.[locale] && (
        <section className="relative py-20 bg-[#131b2f] overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -start-20 w-72 h-72 rounded-full bg-green-900/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -end-20 w-72 h-72 rounded-full bg-green-800/20 blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-green-600/20 text-green-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              {locale === 'ar' ? 'من نحن' : 'About Us'}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-snug">
              {settings?.siteTitle?.[locale] || ''}
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10">
              {settings.aboutUsText[locale]}
            </p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {locale === 'ar' ? 'اقرأ المزيد' : 'Read More'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={locale === 'ar' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* ─── Section 4: Featured Products Grid ─── */}
      {products && products.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#131b2f] text-center mb-2">
              {locale === 'ar' ? 'أحدث المنتجات' : 'Featured Products'}
            </h2>
            <p className="text-center text-gray-500 text-sm mb-10">
              {locale === 'ar' ? 'اكتشف أحدث منتجاتنا الزراعية' : 'Discover our latest agricultural products'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product) => {
                const imageUrl = product.image ? urlFor(product.image).width(400).height(400).url() : null;
                const productPath = product.categorySlug && product.subcategorySlug
                  ? `/${locale}/products/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`
                  : `/${locale}/products`;

                return (
                  <Link
                    key={product._id}
                    href={productPath}
                    className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {imageUrl ? (
                        <Image src={imageUrl} alt={product.title?.[locale] || ''} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex-grow flex flex-col">
                      <h3 className="font-semibold text-[#131b2f] text-sm leading-tight mb-1 line-clamp-2">
                        {product.title?.[locale] || product.title?.en || ''}
                      </h3>
                      {product.activeIngredient?.[locale] && (
                        <p className="text-xs text-gray-400 mt-auto line-clamp-1">
                          {product.activeIngredient[locale]}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 border-2 border-[#131b2f] text-[#131b2f] hover:bg-[#131b2f] hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                {locale === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── Welcome Section (shown only if no products/categories yet) ─── */}
      {(!products || products.length === 0) && (!categories || categories.length === 0) && (
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
