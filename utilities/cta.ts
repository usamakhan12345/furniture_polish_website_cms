interface CTA {
  text: string
  isExternal?: boolean | null
  link?: string | null
  page?: string | { slug: string } | null
}

/**
 * Resolves a Call to Action object into a target URL.
 * Handles both external absolute/relative links and internal Page relationship slug paths.
 * Dynamically resolves same-page anchors (starting with '#') depending on the active pathname.
 */
export const getCtaHref = (cta?: CTA | null, pathname: string = '/'): string => {
  if (!cta) return '#'
  
  let href = '#'
  if (cta.isExternal) {
    href = cta.link || '#'
  } else if (cta.page) {
    if (typeof cta.page === 'object' && cta.page.slug) {
      href = cta.page.slug === 'home' ? '/' : `/${cta.page.slug}`
    }
  }

  // Resolve same-page anchors back to homepage when on subpages
  if (href.startsWith('#')) {
    return pathname === '/' ? href : `/${href}`
  }
  
  return href
}
