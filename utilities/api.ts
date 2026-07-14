import { getPayload } from 'payload'
import configPromise from '../payload.config'

// Cache payload instance across server reloads
let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

export const getPayloadClient = async () => {
  if (!cached.client) {
    if (!cached.promise) {
      cached.promise = getPayload({ config: configPromise })
    }
    cached.client = await cached.promise
  }
  return cached.client
}

/**
 * Fetch page configuration from local database.
 */
export const getPageBySlug = async (slug: string) => {
  try {
    const payload = await getPayloadClient()
    
    // For homepage query, check for 'home', '/' or empty string slug
    const slugFilter = slug === 'home'
      ? { or: [{ slug: { equals: 'home' } }, { slug: { equals: '/' } }, { slug: { equals: '' } }] }
      : { slug: { equals: slug } }

    const result = await payload.find({
      collection: 'pages',
      where: slugFilter,
      limit: 1,
    })
    return result.docs[0] || null
  } catch (error) {
    console.error(`Error in getPageBySlug for slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch global Header data from local database.
 */
export const getHeader = async () => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.findGlobal({
      slug: 'header',
    })
    return result
  } catch (error) {
    console.error('Error fetching global Header:', error)
    return null
  }
}

/**
 * Fetch global Footer data from local database.
 */
export const getFooter = async () => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.findGlobal({
      slug: 'footer',
    })
    return result
  } catch (error) {
    console.error('Error fetching global Footer:', error)
    return null
  }
}
