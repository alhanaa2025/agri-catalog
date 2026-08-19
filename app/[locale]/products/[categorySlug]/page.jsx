import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/sanity/client';
import {
  CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  SUBCATEGORIES_BY_CATEGORY_QUERY,
} from '@/sanity/queries';

export async function generateStaticParams() {
  const categories = await client.fetch(CATEGORIES_QUERY);
  const locales = ['en', 'ar'];
  const params = [];
  for (const locale of locales) {
    for (const cat of categories || []) {
      if (cat.slug) {
        params.push({ locale, categorySlug: cat.slug });
      }
    }
  }
  if (params.length === 0) {
    params.push({ locale: 'en', categorySlug: '_' });
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, categorySlug } = await params;
  const category = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug: categorySlug });
  const title = category?.title?.[locale] || category?.title?.en || categorySlug;
  return {
    title: `${title} | Al-Hanaa`,
    description:
      category?.description?.[locale] ||
      category?.description?.en ||
      (locale === 'ar' ? `استعرض منتجات فئة ${title}` : `Browse products in ${title}`),
  };
}

export default async function CategoryPage({ params }) {
  const { locale, categorySlug } = await params;

  const [category, subcategories] = await Promise.all([
    client.fetch(CATEGORY_BY_SLUG_QUERY, { slug: categorySlug }),
    client.fetch(SUBCATEGORIES_BY_CATEGORY_QUERY, { categorySlug }),
  ]);

  const categoryTitle = category?.title?.[locale] || category?.title?.en || categorySlug;
  const categoryDescription = '' || '';

  const bannerUrl = category?.image
    ? urlFor(category.image).width(1600).height(500).url()
    : null;

  return (
    <div className="bg-white min-h-screen">

      {/* Hero Banner */}
      <section className="relative h-56 md:h-72 flex items-center justify-center overflow-hidden bg-[#131b2f]">
        {bannerUrl && (
          <Image
            src={bannerUrl}
            alt={categoryTitle}
            fill
            className="object-cover opacity-40"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#131b2f]/60 to-[#131b2f]/90" />
        <div className="relative z-10 text-center px-4">
          <span className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            {locale === 'ar' ? 'فئة منتجات' : 'Product Category'}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {categoryTitle}
          </h1>
          {categoryDescription && (
            <p className="mt-3 text-gray-300 text-sm md:text-base max-w-xl mx-auto">
              {categoryDescription}
            </p>
          )}
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href={`/${locale}`} className="hover:text-green-600 transition-colors">
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href={`/${locale}/products`} className="hover:text-green-600 transition-colors">
            {locale === 'ar' ? 'المنتجات' : 'Products'}
          </Link>
          <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#131b2f] font-medium">{categoryTitle}</span>
        </div>
      </nav>

      {/* Subcategories Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="mb-10 text-start">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#131b2f] mb-2">
              {locale === 'ar' ? 'الفئات الفرعية' : 'Subcategories'}
            </h2>
            <p className="text-gray-500 text-sm">
              {locale === 'ar'
                ? `اختر فئة فرعية لاستعراض منتجات "${categoryTitle}"`
                : `Select a subcategory to browse products in "${categoryTitle}"`}
            </p>
          </div>

          {subcategories && subcategories.length > 0 ? (
            <div className={`grid gap-6 md:gap-8 ${
              subcategories.length === 1 ? 'grid-cols-1 max-w-sm' :
              subcategories.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl' :
              subcategories.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl' :
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {subcategories.map((sub) => {
                const imageUrl = sub.image
                  ? urlFor(sub.image).width(700).height(520).url()
                  : null;
                const title = sub.title?.[locale] || sub.title?.en || '';
                

                return (
                  <Link
                    key={sub._id}
                    href={`/${locale}/products/${categorySlug}/${sub.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100"
                  >
                    {/* Card Image */}
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
                          <svg className="w-14 h-14 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col flex-grow p-5">
                      <h3 className="text-base font-bold text-[#131b2f] mb-2 group-hover:text-green-700 transition-colors text-start">
                        {title}
                      </h3>
                      
                      <div className="mt-4 flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                        <span>{locale === 'ar' ? 'عرض المنتجات' : 'View Products'}</span>
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
            <div className="text-center py-20">
              <div className="inline-flex w-20 h-20 bg-green-50 rounded-full items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#131b2f] mb-2">
                {locale === 'ar' ? 'لا توجد فئات فرعية بعد' : 'No subcategories yet'}
              </h2>
              <p className="text-gray-500 text-sm">
                {locale === 'ar'
                  ? 'أضف فئات فرعية من لوحة تحكم Sanity لتظهر هنا.'
                  : 'Add subcategories from the Sanity Studio to see them here.'}
              </p>
              <Link
                href={`/${locale}/products`}
                className="mt-6 inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
              >
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {locale === 'ar' ? 'العودة إلى المنتجات' : 'Back to Products'}
              </Link>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}