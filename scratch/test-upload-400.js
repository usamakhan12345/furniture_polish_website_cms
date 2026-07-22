process.env.PAYLOAD_SECRET = 'usamakhan'
process.env.DATABASE_URI = 'mongodb+srv://usamakhan:usama123@cluster0.zau8mk3.mongodb.net/payloadpractice'

import { getPayload } from 'payload'
import config from '../payload.config.ts'

async function testUpload() {
  try {
    const payload = await getPayload({ config })

    // Valid PNG header + padding
    const pngHeader = Buffer.from(
      '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d4944415478da6364000000060001577c99350000000049454e44ae426082',
      'hex'
    )
    const padding = Buffer.alloc(100000, 0)
    const validPngBuffer = Buffer.concat([pngHeader, padding])

    console.log('--- Attempting Valid Large PNG Media Upload (100KB Buffer) ---')
    const doc = await payload.create({
      collection: 'media',
      data: {
        alt: 'Valid PNG Image',
      },
      file: {
        data: validPngBuffer,
        name: 'valid_test_image.png',
        mimetype: 'image/png',
        size: validPngBuffer.length,
      },
    })

    console.log('SUCCESSFULLY CREATED LARGE MEDIA DOC ID:', doc.id)
    console.log('Base64 String Length:', doc.base64Data ? doc.base64Data.length : 0)
    process.exit(0)
  } catch (err) {
    console.error('--- UPLOAD FAILED ---')
    console.error('Error:', err)
    process.exit(1)
  }
}

testUpload()
