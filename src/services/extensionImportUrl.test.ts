import { describe, expect, it } from 'vitest'

import { appendExtensionCacheVersion } from '@/services/extensionImportUrl'

describe('extensionImportUrl', () => {
  it('appends the build-time cache version to extension entry urls', () => {
    const url = appendExtensionCacheVersion(
      '/ComfyUI/extensions/foo/index.js',
      'build-123',
      'https://example.com'
    )

    expect(url).toBe(
      'https://example.com/ComfyUI/extensions/foo/index.js?t=build-123'
    )
  })

  it('preserves existing query params while overwriting the cache version', () => {
    const url = appendExtensionCacheVersion(
      '/ComfyUI/extensions/foo/index.js?lang=en&t=old',
      'build-456',
      'https://example.com'
    )

    expect(url).toBe(
      'https://example.com/ComfyUI/extensions/foo/index.js?lang=en&t=build-456'
    )
  })
})
