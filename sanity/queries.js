import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    siteTitle,
    logo,
    heroSlides,
    aboutUsText,
    contactEmail,
    phoneNumbers,
    location,
    aboutUsPreHeader,
    aboutUsTitle,
    aboutUsBullets,
    aboutUsImage,
    aboutUsBadgeText,
    categoriesTitle,
    corePrinciplesTitle,
    corePrinciplesSubtitle,
    corePrinciplesCards,
    aboutPageBanner,
    aboutPageStoryTitle,
    aboutPageStory,
    aboutPageStats,
    aboutPageCertificatesTitle,
    aboutPageCertificatesSubtitle,
    certificates[]{
      title,
      "imageUrl": image.asset->url
    }
  }
`);

export const FEATURED_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(_createdAt asc) [0..3] {
    _id,
    title,
    "slug": slug.current,
    image
  }
`);

export const FEATURED_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] | order(_createdAt desc) [0..7] {
    _id,
    title,
    "slug": slug.current,
    image,
    "categorySlug": subcategory->category->slug.current,
    "subcategorySlug": subcategory->slug.current
  }
`);

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    image
  }
`);

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    image
  }
`);

export const SUBCATEGORIES_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "subcategory" && category->slug.current == $categorySlug] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    image
  }
`);

export const SUBCATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "subcategory" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "categorySlug": category->slug.current
  }
`);

export const PRODUCTS_BY_SUBCATEGORY_QUERY = defineQuery(`
  *[_type == "product" && subcategory->slug.current == $subcategorySlug] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    image,
    "categorySlug": subcategory->category->slug.current
  }
`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    bannerImage,
    image,
    featuresAndBenefits,
    description,
    applicationRate,
    "subcategorySlug": subcategory->slug.current,
    "subcategoryTitle": subcategory->title,
    "categorySlug": subcategory->category->slug.current,
    "categoryTitle": subcategory->category->title
  }
`);