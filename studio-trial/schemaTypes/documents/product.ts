import { defineType, defineField, defineArrayMember, type SanityDocument } from 'sanity'
import { DocumentIcon } from '@sanity/icons/Document'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: DocumentIcon,
  fields: [
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
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'activeIngredient',
      title: 'Active Ingredient',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        // 'table' type is registered by the @sanity/table plugin in sanity.config.ts
        defineArrayMember({ type: 'table' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'reference',
      to: [{ type: 'subcategory' }],
      validation: (rule) => rule.required(),
    }),
  ],
})
