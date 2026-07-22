import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Messages } from './collections/Messages'
import { Feedbacks } from './collections/Feedbacks'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const mongoBase64Adapter = (): Adapter => ({ collection, prefix }) => ({
  name: 'mongo-base64',
  generateURL: ({ filename }: { filename: string }) => {
    return `/api/media/file/${filename}`
  },
  handleDelete: async () => {},
  handleUpload: async ({ data, file }: { data: any; file: any }) => {
    if (!file || !file.buffer) {
      return data
    }
    const buffer = Buffer.isBuffer(file.buffer)
      ? file.buffer
      : Buffer.from(file.buffer)
    const base64 = buffer.toString('base64')
    const mime = file.mimeType || 'image/png'

    data.url = `data:${mime};base64,${base64}`
    data.filename = file.filename
    data.filesize = file.filesize || buffer.length
    data.mimeType = mime
    return data
  },
  staticHandler: async (req, { params: { filename } }) => {
    try {
      const doc = await req.payload.find({
        collection: 'media',
        where: {
          filename: {
            equals: filename,
          },
        },
        limit: 1,
      })

      if (doc.docs && doc.docs.length > 0) {
        const item = doc.docs[0] as any
        if (item.url && item.url.startsWith('data:')) {
          const matches = item.url.match(/^data:(.+?);base64,(.+)$/)
          if (matches) {
            const mimeType = matches[1] || 'image/png'
            const buffer = Buffer.from(matches[2], 'base64')
            return new Response(buffer, {
              headers: {
                'Content-Type': mimeType,
                'Cache-Control': 'public, max-age=31536000, immutable',
              },
            })
          }
        }
      }
    } catch (err) {
      console.error('Static handler error serving media:', err)
    }
    return new Response('File not found', { status: 404 })
  },
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Pages, Media, Users, Messages, Feedbacks],
  globals: [Header, Footer],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: mongoBase64Adapter(),
          disableLocalStorage: true,
        },
      },
    }),
  ],
})
