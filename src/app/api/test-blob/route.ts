import { NextResponse } from 'next/server'
import { put, list } from '@vercel/blob'

export async function GET() {
    const diagnostics: Record<string, unknown> = {
        tokenExists: !!process.env.BLOB_READ_WRITE_TOKEN,
        tokenPrefix: process.env.BLOB_READ_WRITE_TOKEN?.substring(0, 20) + '...',
        nodeEnv: process.env.NODE_ENV,
    }

    // Test 1: Try to list blobs
    try {
        const blobs = await list({ token: process.env.BLOB_READ_WRITE_TOKEN })
        diagnostics.listSuccess = true
        diagnostics.blobCount = blobs.blobs.length
    } catch (err: unknown) {
        diagnostics.listSuccess = false
        diagnostics.listError = err instanceof Error ? err.message : String(err)
    }

    // Test 2: Try to upload a tiny test file
    try {
        const testContent = new Uint8Array([137, 80, 78, 71]) // PNG header bytes
        const blob = await put('_test_diagnostic.txt', testContent, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
        })
        diagnostics.uploadSuccess = true
        diagnostics.uploadUrl = blob.url
    } catch (err: unknown) {
        diagnostics.uploadSuccess = false
        diagnostics.uploadError = err instanceof Error ? err.message : String(err)
        diagnostics.uploadErrorStack = err instanceof Error ? err.stack : undefined
    }

    return NextResponse.json(diagnostics, { status: 200 })
}
