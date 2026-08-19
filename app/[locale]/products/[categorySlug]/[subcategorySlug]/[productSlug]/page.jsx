import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '@/sanity/client';
import {
  CATEGORIES_QUERY,
  SUBCATEGORIES_BY_CATEGORY_QUERY,
  PRODUCTS_BY_SUBCATEGORY_QUERY,
  PRODUCT_BY_SLUG_QUERY,
} from '@/sanity/queries';

// ─── Static Params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const categories = await client.fetch(CATEGORIES_QUERY);
  const locales = ['en', 'ar'];
  const params = [];
  for (const locale of locales) {
    for (const cat of categories || []) {
      if (!cat.slug) continue;
      const subcategories = await client.fetch(SUBCATEGORIES_BY_CATEGORY_QUERY, { categorySlug: cat.slug });
      for (const sub of subcategories || []) {
        if (!sub.slug) continue;
        const products = await client.fetch(PRODUCTS_BY_SUBCATEGORY_QUERY, { subcategorySlug: sub.slug });
        for (const p of products || []) {
          if (p.slug) params.push({ locale, categorySlug: cat.slug, subcategorySlug: sub.slug, productSlug: p.slug });
        }
      }
    }
  }
  // Static export requires at least one param — add a placeholder so the
  // build never fails when Sanity has no products yet.
  if (params.length === 0) {
    params.push({ locale: 'en', categorySlug: '_', subcategorySlug: '_', productSlug: '_' });
  }
  return params;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { locale, productSlug } = await params;
  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug: productSlug });
  const title = product?.title?.[locale] || product?.title?.en || productSlug;
  return {
    title: `${title} | Al-Hanaa`,
    description: title,
  };
}

// ─── Breadcrumb Chevron ───────────────────────────────────────────────────────
function Chevron() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      className="flex-shrink-0 rtl:rotate-180 text-gray-400"
      aria-hidden="true"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
      <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <h2 className="text-lg font-extrabold text-[#131b2f] text-start">{title}</h2>
    </div>
  );
}

// ─── Portable Text Components ─────────────────────────────────────────────────
const ptComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 text-[15px] leading-relaxed mb-3 text-start">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-bold text-[#131b2f] mb-2 mt-5 text-start">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-sm font-semibold text-[#131b2f] mb-1.5 mt-4 text-start">{children}</h4>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ps-5 mb-4 space-y-2 text-start">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ps-5 mb-4 space-y-2 text-start">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-700 text-[15px] leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-gray-700 text-[15px] leading-relaxed">{children}</li>
    ),
  },
  types: {
    table: ({ value }) => {
      if (!value?.rows?.length) return null;
      const [headerRow, ...bodyRows] = value.rows;
      return (
        <div className="overflow-x-auto my-5 rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm border-collapse">
            {headerRow?.cells?.length > 0 && (
              <thead>
                <tr className="bg-green-700/10 border-b-2 border-green-700/20">
                  {headerRow.cells.map((cell, i) => (
                    <th key={i} className="px-4 py-3 text-start font-semibold text-green-900 whitespace-nowrap text-sm">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-gray-100">
              {bodyRows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}>
                  {row.cells?.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-gray-700 text-[14px] text-start align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductPage({ params }) {
  const { locale, categorySlug, subcategorySlug, productSlug } = await params;
  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug: productSlug });

  const title             = product?.title?.[locale]              || product?.title?.en              || productSlug;
  const categoryTitle     = product?.categoryTitle?.[locale]      || product?.categoryTitle?.en      || categorySlug.replace(/-/g, ' ');
  const subcategoryTitle  = product?.subcategoryTitle?.[locale]   || product?.subcategoryTitle?.en   || subcategorySlug.replace(/-/g, ' ');

  const bannerUrl         = product?.bannerImage ? urlFor(product.bannerImage).width(1600).height(600).url() : null;
  const productImageUrl   = product?.image       ? urlFor(product.image).width(800).height(800).url()        : null;

  const featuresContent   = product?.featuresAndBenefits?.[locale] || product?.featuresAndBenefits?.en || null;
  const compositionContent = product?.description?.[locale]        || product?.description?.en        || null;
  const appRateContent    = product?.applicationRate?.[locale]     || product?.applicationRate?.en    || null;

  const hasFeatures       = featuresContent && featuresContent.length > 0;
  const hasComposition    = compositionContent && compositionContent.length > 0;
  const hasAppRate        = appRateContent && appRateContent.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ─── Banner ─── */}
      <section className="relative h-56 md:h-72 lg:h-80 flex items-end overflow-hidden bg-[#131b2f]">
        {bannerUrl ? (
          <Image src={bannerUrl} alt={title} fill className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -start-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -end-20 w-80 h-80 bg-green-600/10 rounded-full blur-3xl" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-7 md:pb-10">
          <span className="inline-block bg-green-500/25 text-green-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2">
            {locale === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white drop-shadow-lg leading-tight text-start">
            {title}
          </h1>
        </div>
      </section>

      {/* ─── Breadcrumb ─── */}
      <nav className="bg-white border-b border-gray-200 py-3 px-4 sticky top-[72px] z-30" aria-label="Breadcrumb">
        <ol className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-gray-500">
          <li>
            <Link href={`/${locale}`} className="hover:text-green-600 transition-colors whitespace-nowrap">
              {locale === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
          </li>
          <li className="flex items-center"><Chevron /></li>
          <li>
            <Link href={`/${locale}/products`} className="hover:text-green-600 transition-colors whitespace-nowrap">
              {locale === 'ar' ? 'المنتجات' : 'Products'}
            </Link>
          </li>
          <li className="flex items-center"><Chevron /></li>
          <li>
            <Link href={`/${locale}/products/${categorySlug}`} className="hover:text-green-600 transition-colors whitespace-nowrap capitalize">
              {categoryTitle}
            </Link>
          </li>
          <li className="flex items-center"><Chevron /></li>
          <li>
            <Link href={`/${locale}/products/${categorySlug}/${subcategorySlug}`} className="hover:text-green-600 transition-colors whitespace-nowrap">
              {subcategoryTitle}
            </Link>
          </li>
          <li className="flex items-center"><Chevron /></li>
          <li aria-current="page">
            <span className="text-[#131b2f] font-semibold line-clamp-1 max-w-[200px] inline-block align-bottom">{title}</span>
          </li>
        </ol>
      </nav>

      {/* ─── Page Body ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">

        {/* ━━━ TOP: Product Intro ━━━ */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start">

          {/* Image Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="relative aspect-square w-full">
              {productImageUrl ? (
                <Image src={productImageUrl} alt={title} fill className="object-contain p-6" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-200">
                    <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 flex flex-col text-start h-full">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#131b2f] leading-tight mb-4">{title}</h2>

            {/* Taxonomy Tags */}
            <div className="flex flex-wrap gap-2">
              {subcategoryTitle && (
                <Link
                  href={`/${locale}/products/${categorySlug}/${subcategorySlug}`}
                  className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200 hover:bg-green-100 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  {subcategoryTitle}
                </Link>
              )}
              {categoryTitle && (
                <Link
                  href={`/${locale}/products/${categorySlug}`}
                  className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-200 transition-colors"
                >
                  {categoryTitle}
                </Link>
              )}
            </div>

            {/* Subtle Divider */}
            {hasFeatures && <hr className="my-6 border-gray-200" />}

            {/* Features & Benefits */}
            {hasFeatures && (
              <div className="mt-1 text-start">
                <PortableText value={featuresContent} components={ptComponents} />
              </div>
            )}
          </div>
        </div>

        {/* ━━━ BOTTOM: Technical Data (2 Columns) ━━━ */}
        {(hasComposition || hasAppRate) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* Composition */}
            {hasComposition && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <SectionHeader
                  title={locale === 'ar' ? 'التركيبة والمواد الفعالة' : 'Composition & Active Ingredients'}
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  }
                />
                <div className="text-start">
                  <PortableText value={compositionContent} components={ptComponents} />
                </div>
              </div>
            )}

            {/* Application Rate */}
            {hasAppRate && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <SectionHeader
                  title={locale === 'ar' ? 'معدل الاستخدام' : 'Application Rate'}
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  }
                />
                <div className="text-start">
                  <PortableText value={appRateContent} components={ptComponents} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state when no content at all */}
        {!hasFeatures && !hasComposition && !hasAppRate && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 mx-auto mb-4">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-400 text-sm">
              {locale === 'ar'
                ? 'أضف محتوى المنتج من لوحة تحكم Sanity.'
                : 'Add product content from the Sanity Studio.'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}