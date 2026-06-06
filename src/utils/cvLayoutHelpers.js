/** Layout families used by CVPreviewDocument / header / sidebar blocks */
export const SIDEBAR_LAYOUTS = new Set(['sidebar-left'])

export const INVERTED_HEADER_LAYOUTS = new Set(['executive'])

export const COMPACT_FOOTER_LAYOUTS = new Set(['simple', 'stacked'])

export const isSidebarLayout = (layoutVariant) => SIDEBAR_LAYOUTS.has(layoutVariant)

export const isInvertedHeader = (layoutVariant) => INVERTED_HEADER_LAYOUTS.has(layoutVariant)

export const isSidebarLeft = (layoutVariant) => layoutVariant === 'sidebar-left'

export const isCompactFooterLayout = (layoutVariant) => COMPACT_FOOTER_LAYOUTS.has(layoutVariant)
