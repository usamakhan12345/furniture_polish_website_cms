import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap'
import config from '../../payload.config'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import '@payloadcms/next/css'
import React from 'react'

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RootLayout 
    config={config} 
    importMap={importMap} 
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
)

export default Layout
