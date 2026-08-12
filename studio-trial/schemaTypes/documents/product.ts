import { defineType, defineField, defineArrayMember, type SanityDocument } from 'sanity'
import { DocumentIcon } from '@sanity/icons/Document'

// Reusable Portable Text definition (blocks + tables)
const portableTextMembers = [
  defineArrayMember({ type: 'block' }),
  defineArrayMember({ type: 'table' }),
]

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    // ── Identity ──────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: SanityDocument) =>
          ((doc.title as { en?: string } | undefined)?.en) ?? '',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'reference',
      to: [{ type: 'subcategory' }],
      validation: (rule) => rule.required(),
    }),

    // ── Images ────────────────────────────────────────────────
    defineField({
      name: 'bannerImage',
      title: 'Banner Image (Page Header)',
      description: 'Full-width background image shown at the top of the product page.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'image',
      title: 'Product Image (Packaging)',
      description: 'Main product packaging / bottle shot shown in the detail layout.',
      type: 'image',
      options: { hotspot: true },
    }),

    // ── Features & Benefits (Portable Text) ──────────────────
    defineField({
      name: 'featuresAndBenefits',
      title: 'Features & Benefits',
      description: 'Bilingual Portable Text — full-width section for detailed feature lists and bullet points.',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'array',
          of: portableTextMembers,
        }),
        defineField({
          name: 'ar',
          title: 'Arabic (عربي)',
          type: 'array',
          of: portableTextMembers,
        }),
      ],
    }),

    // ── Composition & Active Ingredients (Portable Text) ─────
    defineField({
      name: 'description',
      title: 'Composition & Active Ingredients',
      description: 'Bilingual Portable Text — supports paragraphs, bullet lists, and tables.',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'array',
          of: portableTextMembers,
        }),
        defineField({
          name: 'ar',
          title: 'Arabic (عربي)',
          type: 'array',
          of: portableTextMembers,
        }),
      ],
    }),

    // ── Application Rate (Portable Text) ─────────────────────
    defineField({
      name: 'applicationRate',
      title: 'Application Rate',
      description: 'Bilingual Portable Text — supports paragraphs, bullet lists, and tables.',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'array',
          of: portableTextMembers,
        }),
        defineField({
          name: 'ar',
          title: 'Arabic (عربي)',
          type: 'array',
          of: portableTextMembers,
        }),
      ],
    }),
  ],
})