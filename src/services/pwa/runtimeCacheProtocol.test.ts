import {
  getRuntimeCacheName,
  getRuntimeCacheNames,
  isOutdatedRuntimeCacheName,
  normalizeRuntimeCacheGroups
} from './runtimeCacheProtocol'

describe('runtimeCacheProtocol', () => {
  beforeEach(() => {
    vi.stubGlobal('__COMFYUI_SW_CACHE_VERSION__', 'test-cache-version')
    vi.stubGlobal(
      '__COMFYUI_EXTENSION_CACHE_VERSION__',
      'test-extension-cache-version'
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('builds versioned runtime cache names', () => {
    expect(getRuntimeCacheName('static')).toBe(
      'comfyui-frontend-static-test-cache-version'
    )
    expect(getRuntimeCacheNames()).toEqual([
      'comfyui-frontend-pages-test-cache-version',
      'comfyui-frontend-static-test-cache-version',
      'comfyui-frontend-data-test-cache-version',
      'comfyui-frontend-extension-js-test-extension-cache-version'
    ])
  })

  it('normalizes requested purge groups', () => {
    expect(normalizeRuntimeCacheGroups(['static', 'data'])).toEqual([
      'static',
      'data'
    ])
    expect(normalizeRuntimeCacheGroups(['invalid'])).toEqual([
      'pages',
      'static',
      'data',
      'extension-js'
    ])
    expect(normalizeRuntimeCacheGroups()).toEqual([
      'pages',
      'static',
      'data',
      'extension-js'
    ])
  })

  it('detects outdated runtime caches', () => {
    expect(
      isOutdatedRuntimeCacheName('comfyui-frontend-static-old-version')
    ).toBe(true)
    expect(
      isOutdatedRuntimeCacheName('comfyui-frontend-static-test-cache-version')
    ).toBe(false)
    expect(
      isOutdatedRuntimeCacheName(
        'comfyui-frontend-extension-js-test-extension-cache-version'
      )
    ).toBe(false)
    expect(isOutdatedRuntimeCacheName('workbox-precache-v2-123')).toBe(false)
  })
})
