import config from '@payload-config'
import { NotFoundPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'
import { importMap } from '../importMap.js'

export const metadata: Metadata = {
    title: '404 - Not Found',
}

type Args = {
    params: Promise<{
        segments: string[]
    }>
    searchParams: Promise<{
        [key: string]: string | string[]
    }>
}

export default async function NotFound({ params, searchParams }: Args) {
    return <NotFoundPage config={config} importMap={importMap} params={params} searchParams={searchParams} />
}
