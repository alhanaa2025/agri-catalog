# Rollback: Original Product Image Card

## Where this code belongs
File: `app/[locale]/products/[categorySlug]/[subcategorySlug]/[productSlug]/page.jsx`
Section: **TOP: Product Intro** → **Left Column (Image Card)**
Grid parent: `<div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start">`

This is the EXACT JSX that was replaced on 2026-08-26 by the client-requested vertical poster layout (4096×6144, `aspect-[2/3]`).
To revert, replace the new poster `{/* Image Card */}` block with the code below.

---

## Original Image Card JSX (copy-paste to revert)

```jsx
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
```

---

## Key classes to restore

| Element | Classes |
|---|---|
| Outer wrapper | `bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden` |
| Inner ratio box | `relative aspect-square w-full` |
| `<Image>` | `object-contain p-6` |
| Empty state wrapper | `w-full h-full flex items-center justify-center bg-gray-50` |

---

> **Note:** The grid column also needs restoring if you want the original fixed width.
> Grid parent class: `grid-cols-[320px_1fr]` — the left column was a fixed `320px`.
> For the poster layout this was changed to `lg:grid-cols-[420px_1fr]`.
