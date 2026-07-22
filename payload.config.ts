import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { v2 as cloudinary } from 'cloudinary'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Messages } from './collections/Messages'
import { Feedbacks } from './collections/Feedbacks'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
)

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

const customCloudinaryAdapter = () => ({
  name: 'cloudinary',
  generateURL: ({ filename }: { filename: string }) => {
    const cleanName = filename ? filename.replace(/\.[^/.]+$/, '') : ''
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1/furniture_polish/${cleanName}`
  },
  handleDelete: async ({ filename }: { filename: string }) => {
    try {
      const publicId = `furniture_polish/${filename.replace(/\.[^/.]+$/, '')}`
      await cloudinary.uploader.destroy(publicId)
    } catch (err) {
      console.error('Cloudinary delete error:', err)
    }
  },
  handleUpload: async ({ data, file }: { data: any; file: any }) => {
    if (!file || !file.buffer) {
      return data
    }
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'furniture_polish',
          public_id: file.filename.replace(/\.[^/.]+$/, ''),
          resource_type: 'auto',
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload_stream error:', error)
            return reject(error)
          }
          if (result) {
            data.url = result.secure_url
            data.filename = file.filename
            data.filesize = result.bytes || file.filesize
            data.mimeType = file.mimeType
            if (result.width) data.width = result.width
            if (result.height) data.height = result.height
          }
          resolve(data)
        }
      )
      uploadStream.end(file.buffer)
    })
  },
  staticHandler: () => {},
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
    ...(isCloudinaryConfigured
      ? [
          cloudStoragePlugin({
            collections: {
              media: {
                adapter: customCloudinaryAdapter(),
                disableLocalStorage: true,
              },
            },
          }),
        ]
      : []),
  ],
})
