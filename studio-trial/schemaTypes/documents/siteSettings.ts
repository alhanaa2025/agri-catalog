import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fieldsets: [
    { name: 'aboutSection', title: 'About Us Section (Home Page)' },
    { name: 'categoriesSection', title: 'Categories Section (Home Page)' },
    { name: 'corePrinciplesSection', title: 'Core Principles Section (Home Page)' },
    { name: 'aboutPage', title: 'About Us Page Content' },
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'localeString',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroSlides',
      title: 'Home Page Slider',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'localeString',
            }),
          ],
          preview: {
            select: {
              title: 'caption.en',
              media: 'image',
            },
          },
        },
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'welcomeText',
      title: 'Home Page Welcome Text',
      type: 'localeText',
    }),
    defineField({
      name: 'aboutUsText',
      title: 'About Us Text',
      type: 'localeText',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phoneNumbers',
      title: 'Phone Numbers',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // --- About Section ---
    defineField({
      name: 'aboutUsPreHeader',
      title: 'About Us Pre-Header',
      type: 'localeString',
      fieldset: 'aboutSection',
    }),
    defineField({
      name: 'aboutUsTitle',
      title: 'About Us Title',
      type: 'localeString',
      fieldset: 'aboutSection',
    }),
    defineField({
      name: 'aboutUsBullets',
      title: 'About Us Bullet Points',
      type: 'array',
      of: [{ type: 'localeString' }],
      fieldset: 'aboutSection',
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'aboutUsImage',
      title: 'About Us Image',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'aboutSection',
    }),
    defineField({
      name: 'aboutUsBadgeValue',
      title: 'Badge Value (e.g. 100%)',
      type: 'string',
      fieldset: 'aboutSection',
    }),
    defineField({
      name: 'aboutUsBadgeText',
      title: 'Badge Text',
      type: 'localeString',
      fieldset: 'aboutSection',
    }),

    // --- Categories Section ---
    defineField({
      name: 'categoriesTitle',
      title: 'Categories Section Title',
      type: 'localeString',
      fieldset: 'categoriesSection',
    }),
    defineField({
      name: 'categoriesSubtitle',
      title: 'Categories Section Subtitle',
      type: 'localeString',
      fieldset: 'categoriesSection',
    }),

    // --- Core Principles Section ---
    defineField({
      name: 'corePrinciplesTitle',
      title: 'Core Principles Section Title',
      type: 'localeString',
      fieldset: 'corePrinciplesSection',
    }),
    defineField({
      name: 'corePrinciplesSubtitle',
      title: 'Core Principles Section Subtitle',
      type: 'localeString',
      fieldset: 'corePrinciplesSection',
    }),
    defineField({
      name: 'corePrinciplesCards',
      title: 'Core Principles Cards (Vision, Mission, Values)',
      type: 'array',
      fieldset: 'corePrinciplesSection',
      of: [
        {
          type: 'object',
          name: 'card',
          title: 'Card',
          fields: [
            defineField({ name: 'title', title: 'Card Title', type: 'localeString' }),
            defineField({ name: 'text', title: 'Card Text', type: 'localeText' }),
          ],
          preview: { select: { title: 'title.en' } },
        }
      ],
      validation: (rule) => rule.max(3),
    }),

    // --- About Us Page ---
    defineField({
      name: 'aboutPageBanner',
      title: 'About Page Banner Image',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'aboutPage',
    }),
    defineField({
      name: 'aboutPageStoryTitle',
      title: 'Company Story Title',
      type: 'localeString',
      fieldset: 'aboutPage',
    }),
    defineField({
      name: 'aboutPageStory',
      title: 'Company Story / Overview',
      type: 'localeText',
      fieldset: 'aboutPage',
    }),
    defineField({
      name: 'aboutPageStats',
      title: 'About Page Statistics Cards',
      type: 'array',
      fieldset: 'aboutPage',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Stat',
          fields: [
            defineField({ name: 'value', title: 'Value (e.g., 15+)', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'localeString' }),
          ],
          preview: { select: { title: 'label.en', subtitle: 'value' } },
        }
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'aboutPageCertificatesTitle',
      title: 'Certificates Section Title',
      type: 'localeString',
      fieldset: 'aboutPage',
    }),
    defineField({
      name: 'aboutPageCertificatesSubtitle',
      title: 'Certificates Section Subtitle',
      type: 'localeString',
      fieldset: 'aboutPage',
    }),
    defineField({
      name: 'certificates',
      title: 'Certificates & Accreditations',
      type: 'array',
      fieldset: 'aboutPage',
      of: [
        {
          type: 'object',
          name: 'certificate',
          title: 'Certificate',
          fields: [
            defineField({ name: 'title', title: 'Certificate Title', type: 'localeString' }),
            defineField({ name: 'image', title: 'Certificate Image', type: 'image', options: { hotspot: false } }),
          ],
          preview: { select: { title: 'title.en', media: 'image' } },
        },
      ],
    }),
  ],
})
