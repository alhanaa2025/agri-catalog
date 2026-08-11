import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
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
  ],
})
