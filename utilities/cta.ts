interface CTA {
  text: string
  isExternal?: boolean | null
  link?: string | null
  page?: string | { slug: string } | null
}

/**
 * Resolves a Call to Action object into a target URL.
 * Handles both external absolute/relative links and internal Page relationship slug paths.
 */
export const getCtaHref = (cta?: CTA | null): string => {
  if (!cta) return '#'
  if (cta.isExternal) {
    return cta.link || '#'
  }
  if (cta.page) {
    if (typeof cta.page === 'object' && cta.page.slug) {
      return cta.page.slug === 'home' ? '/' : `/${cta.page.slug}`
    }
  }
  return '#'
}
