// Objects
import { localeString } from './objects/localeString'
import { localeText } from './objects/localeText'

// Documents
import { siteSettings } from './documents/siteSettings'
import { category } from './documents/category'
import { subcategory } from './documents/subcategory'
import { product } from './documents/product'

export const schemaTypes = [
  // Shared objects
  localeString,
  localeText,
  // Documents
  siteSettings,
  category,
  subcategory,
  product,
]
