import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/sanity/client';
import {
  CATEGORIES_QUERY,
  SUBCATEGORIES_BY_CATEGORY_QUERY,
  SUBCATEGORY_BY_SLUG_QUERY,
  PRODUCTS_BY_SUBCATEGORY_QUERY,
} from '@/sanity/queries';

export async function generateStaticParams() {
  const categories = await client.fetch(CATEGORIES_QUERY);
  const locales = ['en', 'ar'];
  const params = [];
  for (const locale of locales) {
    for (const cat of categories || []) {
      if (!cat.slug) continue;
      const subcategories = await client.fetch(SUBCATEGORIES_BY_CATEGORY_QUERY, {
        categorySlug: cat.slug,
      });
      for (const sub of subcategories || []) {
        if (sub.slug) {
          params.push({ locale, categorySlug: cat.slug, subcategorySlug: sub.slug });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, subcategorySlug } = await params;
  const sub = await client.fetch(SUBCATEGORY_BY_SLUG_QUERY, { slug: subcategorySlug });
  const title = sub?.title?.[locale] || sub?.title?.en || subcategorySlug;
  return {
    title: `${title} | Al-Hanaa`,
    description:
      locale === 'ar'
        ? `استعرض منتجات فئة ${title}`
        : `Browse products in the ${title} subcategory.`,
  };
}

export default async function SubcategoryPage({ params }) {
  const { locale, categorySlug, subcategorySlug } = await params;

  const [subcategory, products] = await Promise.all([
    client.fetch(SUBCATEGORY_BY_SLUG_QUERY, { slug: subcategorySlug }),
    client.fetch(PRODUCTS_BY_SUBCATEGORY_QUERY, { subcategorySlug }),
  ]);

  const subTitle = subcategory?.title?.[locale] || subcategory?.title?.en || subcategorySlug;
  const hasProducts = products && products.length > 0;

  const gridClass =
    !hasProducts ? '' :
    products.length === 1 ? 'grid grid-cols-1 max-w-xs gap-6' :
    products.length === 2 ? 'grid grid-cols-1 sm:grid-cols-2 max-w-2xl gap-6 md:gap-8' :
    products.length === 3 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl gap-6 md:gap-8' :
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8';

  return (
    <div className="bg-white min-h-screen">

      {/* Hero Banner */}
      <section className="relative bg-[#131b2f] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -start-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -end-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            {locale === 'ar' ? 'فئة فرعية' : 'Subcategory'}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {subTitle}
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href={`/${locale}`} className="hover:text-green-600 transition-colors">
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <svg className="w-4 h-4 flex-shrink-0 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href={`/${locale}/products`} className="hover:text-green-600 transition-colors">
            {locale === 'ar' ? 'المنتجات' : 'Products'}
          </Link>
          <svg className="w-4 h-4 flex-shrink-0 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href={`/${locale}/products/${categorySlug}`} className="hover:text-green-600 transition-colors capitalize">
            {categorySlug.replace(/-/g, ' ')}
          </Link>
          <svg className="w-4 h-4 flex-shrink-0 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#131b2f] font-medium">{subTitle}</span>
        </div>
      </nav>

      {/* Products Grid */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10 text-start">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#131b2f] mb-2">
              {locale === 'ar' ? 'المنتجات' : 'Products'}
            </h2>
            <p className="text-gray-500 text-sm">
              {locale === 'ar'
                ? `${products?.length || 0} منتج في هذه الفئة الفرعية`
                : `${products?.length || 0} product(s) in this subcategory`}
            </p>
          </div>

          {hasProducts ? (
            <div className={gridClass}>
              {products.map((product) => {
                const imageUrl = product.image
                  ? urlFor(product.image).width(600).height(600).url()
                  : null;
                const title = product.title?.[locale] || product.title?.en || '';

                return (
                  <Link
                    key={product._id}
                    href={`/${locale}/products/${categorySlug}/${subcategorySlug}/${product.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                          <svg className="w-14 h-14 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col flex-grow p-5 border-t border-gray-100">
                      <h3 className="text-base font-bold text-[#131b2f] group-hover:text-green-700 transition-colors text-start leading-tight">
                        {title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">{locale === 'ar' ? 'لا توجد منتجات بعد.' : 'No products yet.'}</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}