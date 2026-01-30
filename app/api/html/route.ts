import { NextRequest, NextResponse } from 'next/server'

// Import the obfuscator from the web-obfuscator package
const obfuscator = require('../../../web-obfuscator/src/index.js')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, preset = 'medium' } = body

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing code parameter' },
        { status: 400 }
      )
    }

    if (!['light', 'medium', 'high'].includes(preset)) {
      return NextResponse.json(
        { error: 'Invalid preset. Must be: light, medium, or high' },
        { status: 400 }
      )
    }

    // Obfuscate HTML with embedded scripts
    const obfuscated = obfuscator.obfuscateHTML(code, {
      preset: preset,
      excludeStrings: false,
      escapeUnicode: false,
      minify: true,
    })

    return NextResponse.json({
      success: true,
      obfuscated: obfuscated.code || obfuscated,
      originalSize: code.length,
      obfuscatedSize: (obfuscated.code || obfuscated).length,
      reduction: Math.round(
        (1 - (obfuscated.code || obfuscated).length / code.length) * 100
      ),
    })
  } catch (error) {
    console.error('HTML obfuscation error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to obfuscate HTML',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}
