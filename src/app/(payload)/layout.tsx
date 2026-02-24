/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'
import React from 'react'
import { importMap } from './admin/importMap.js'

const serverFunction: any = async function (args: any) {
    'use server'
    return handleServerFunctions({
        ...args,
        config,
        importMap,
    })
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
            {children}
        </RootLayout>
    )
}
