import { notFound } from 'next/navigation'
import { getPageBySlug } from '../../../utilities/api'
import { BlockRenderer } from '../components/common/BlockRenderer'
import Link from 'next/link'
import { ArrowRight, Settings } from 'lucide-react'

interface Props {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const slugPath = slug && slug.length > 0 ? slug.join('/') : 'home'
  const page = await getPageBySlug(slugPath)

  if (!page) {
    if (slugPath === 'home') {
      return {
        title: 'Welcome | Payload CMS Starter',
        description: 'Get started by configuring your homepage in Payload CMS.',
      }
    }
    return {
      title: 'Page Not Found',
    }
  }

  const title = page.seo?.title || page.title
  const description = page.seo?.description || 'A dynamic page managed by Payload CMS'
  const ogImageUrl =
    page.seo?.image && typeof page.seo.image === 'object' && page.seo.image.url
      ? page.seo.image.url
      : ''
  const ogImageAlt =
    page.seo?.image && typeof page.seo.image === 'object' && page.seo.image.alt
      ? page.seo.image.alt
      : title

  return {
    title: `${title} | Payload CMS Site`,
    description,
    openGraph: {
      title,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl, alt: ogImageAlt }] : [],
    },
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const slugPath = slug && slug.length > 0 ? slug.join('/') : 'home'
  const page = await getPageBySlug(slugPath)

  if (!page) {
    if (slugPath === 'home') {
      return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-xl text-center flex flex-col items-center">
            <div className="p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-8 animate-bounce">
              <Settings className="w-12 h-12" />
            </div>

            <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-6">
              Welcome to your Payload Starter
            </h1>

            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              The frontend is set up, but the homepage has not been created yet in the CMS. 
              Connect to your MongoDB database, log in to the admin panel, and create a page with the slug <code className="text-indigo-400 font-semibold bg-slate-900 px-1.5 py-0.5 rounded">home</code>.
            </p>

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Go to Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )
    }
    notFound()
  }

  return (
    <article className="animate-fade-in">
      <BlockRenderer blocks={page.layout} />
    </article>
  )
}
