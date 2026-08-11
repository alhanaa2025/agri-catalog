import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Title', 
      type: 'string', 
      validation: (Rule) => Rule.required() 
    }),
    defineField({ 
      name: 'slug', 
      title: 'Slug',
      type: 'slug', 
      options: { source: 'title' } 
    }),
    defineField({ 
      name: 'description', 
      title: 'Description', 
      type: 'text' 
    }),
    defineField({ 
      name: 'image', 
      title: 'Image', 
      type: 'image',
      options: { hotspot: true }
    }),
  ],
})
