import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons/Cog'

// Types excluded from the generic auto-generated list
const SINGLETON_TYPES = ['siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // 1. Singleton: Site Settings at the top
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),

      S.divider(),

      // 2. Content document lists
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('subcategory').title('Subcategories'),
      S.documentTypeListItem('product').title('Products'),

      S.divider(),

      // 3. Any remaining document types (e.g. added in future), excluding singletons
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings', 'category', 'subcategory', 'product'].includes(listItem.getId() as string),
      ),
    ])
