process.env.PAYLOAD_SECRET = 'usamakhan'
process.env.DATABASE_URI = 'mongodb+srv://usamakhan:usama123@cluster0.zau8mk3.mongodb.net/payloadpractice'

import { getPayload } from 'payload'
import config from '../payload.config.ts'

async function debugData() {
  try {
    const payload = await getPayload({ config })

    console.log('--- Checking Header Global ---')
    const header = await payload.findGlobal({ slug: 'header' })
    console.log('Header Logo:', JSON.stringify(header.logo, null, 2))

    console.log('\n--- Checking Media Documents ---')
    const media = await payload.find({ collection: 'media', limit: 5 })
    console.log(`Total Media Docs: ${media.totalDocs}`)
    media.docs.forEach((m, i) => {
      console.log(`Media #${i + 1}:`, {
        id: m.id,
        filename: m.filename,
        url: m.url ? (m.url.length > 60 ? m.url.substring(0, 60) + '...' : m.url) : 'NULL',
        mimeType: m.mimeType,
      })
    })

    console.log('\n--- Checking Pages ---')
    const pages = await payload.find({ collection: 'pages' })
    console.log(`Total Pages: ${pages.totalDocs}`)
    pages.docs.forEach((p) => {
      console.log(`Page: ${p.title} (${p.slug})`)
      if (p.layout) {
        console.log('  Blocks count:', p.layout.length)
        p.layout.forEach((block, bIdx) => {
          console.log(`  Block #${bIdx + 1} (${block.blockType}):`)
          if (block.blockType === 'homeBanner') {
            console.log('    backgroundImage:', block.backgroundImage)
          } else if (block.blockType === 'workSlider') {
            console.log('    slides images count:', block.slides?.length)
            block.slides?.forEach((s, sIdx) => {
              console.log(`      Slide #${sIdx + 1} image:`, s.image)
            })
          } else if (block.blockType === 'projectGallery') {
            console.log('    mainImage:', block.mainImage)
          }
        })
      }
    })

    process.exit(0)
  } catch (err) {
    console.error('Debug script error:', err)
    process.exit(1)
  }
}

debugData()
