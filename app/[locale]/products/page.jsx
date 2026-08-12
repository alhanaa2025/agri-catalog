import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/sanity/client';
import { CATEGORIES_QUERY } from '@/sanity/queries';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'منتجاتنا | الهناء' : 'Our Products | Al-Hanaa',
    description:
      locale === 'ar'
        ? 'استعرض جميع فئات منتجاتنا الزراعية.'
        : 'Browse all categories of our agricultural products.',
  };
}

export default async function ProductsPage({ params }) {
  const { locale } = await params;
  const categories = await client.fetch(CATEGORIES_QUERY);

  return (
    <div className="bg-white min-h-screen">

      {/* Hero Banner */}
      <section className="relative bg-[#131b2f] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -start-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -end-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            {locale === 'ar' ? 'الكتالوج الزراعي' : 'Agricultural Catalog'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
            {locale === 'ar' ? 'منتجاتنا' : 'Our Products'}
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'اختر الفئة التي تبحث عنها لاستعراض منتجاتنا الزراعية المتخصصة.'
              : 'Choose a category to browse our specialized agricultural products.'}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href={`/${locale}`} className="hover:text-green-600 transition-colors">
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#131b2f] font-medium">
            {locale === 'ar' ? 'المنتجات' : 'Products'}
          </span>
        </div>
      </nav>

      {/* Categories Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories && categories.length > 0 ? (
            <div className={`grid gap-6 md:gap-8 ${
              categories.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
              categories.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' :
              categories.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto' :
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {categories.map((cat) => {
                const imageUrl = cat.image
                  ? urlFor(cat.image).width(700).height(520).url()
                  : null;
                const title = cat.title?.[locale] || cat.title?.en || '';
                

                return (
                  <Link
                    key={cat._id}
                    href={`/${locale}/products/${cat.slug}`}
                    className="group relative flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                          <svg className="w-16 h-16 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="flex flex-col flex-grow p-5">
                      <h2 className="text-lg font-bold text-[#131b2f] mb-2 group-hover:text-green-700 transition-colors text-start">
                        {title}
                      </h2>
                      
                      <div className="mt-4 flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                        <span>{locale === 'ar' ? 'استعرض الفئة' : 'Browse Category'}</span>
                        <svg className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="inline-flex w-20 h-20 bg-green-50 rounded-full items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#131b2f] mb-2">
                {locale === 'ar' ? 'لا توجد فئات بعد' : 'No categories yet'}
              </h2>
              <p className="text-gray-500 text-sm">
                {locale === 'ar'
                  ? 'أضف فئات من لوحة تحكم Sanity لتظهر هنا.'
                  : 'Add categories from the Sanity Studio to see them here.'}
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}