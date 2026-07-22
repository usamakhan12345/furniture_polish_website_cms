export function resolveMediaUrl(media: any): string {
  if (!media) return ''
  if (typeof media === 'string') return media
  if (typeof media === 'object') {
    return media.url || media.secure_url || media.cloudinaryUrl || ''
  }
  return ''
}

export function resolveMediaAlt(media: any, fallbackAlt: string = ''): string {
  if (!media) return fallbackAlt
  if (typeof media === 'object' && media.alt) return media.alt
  return fallbackAlt
}
