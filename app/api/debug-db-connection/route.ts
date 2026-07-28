import { NextResponse } from 'next/server'
import { getPayloadClient } from '../../../utilities/api'
import mongoose from 'mongoose'

export async function GET() {
  const info: any = {
    hasDatabaseUri: !!process.env.DATABASE_URI,
    hasPayloadSecret: !!process.env.PAYLOAD_SECRET,
    nodeEnv: process.env.NODE_ENV,
  }

  // Obfuscate database URI for safety
  if (process.env.DATABASE_URI) {
    try {
      const parsed = new URL(process.env.DATABASE_URI)
      parsed.password = '****'
      if (parsed.username) parsed.username = '****'
      info.databaseUriObfuscated = parsed.toString()
    } catch {
      info.databaseUriObfuscated = 'Invalid URL format: ' + process.env.DATABASE_URI.substring(0, 15) + '...'
    }
  }

  try {
    // 1. Try to connect with Mongoose directly to see if the network layer works
    if (process.env.DATABASE_URI) {
      info.mongooseConnectionStateBefore = mongoose.connection.readyState
      await mongoose.connect(process.env.DATABASE_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout fast if IP is blocked
      })
      info.mongooseConnectionStateAfter = mongoose.connection.readyState
      info.mongoosePing = 'Success'
    } else {
      info.mongoosePing = 'Skipped (no URI)'
    }
  } catch (err: any) {
    info.mongooseError = {
      message: err.message,
      name: err.name,
      stack: err.stack,
    }
  }

  try {
    // 2. Try to initialize Payload client
    const payload = await getPayloadClient()
    info.payloadInitialized = !!payload

    // 3. Try to fetch collections
    const pages = await payload.find({
      collection: 'pages',
      limit: 1,
    })
    info.pagesCollectionFind = {
      docsFound: pages.docs.length,
      totalDocs: pages.totalDocs,
    }
  } catch (err: any) {
    info.payloadError = {
      message: err.message,
      name: err.name,
      stack: err.stack,
    }
  }

  return NextResponse.json(info)
}
