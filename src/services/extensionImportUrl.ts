export function appendExtensionCacheVersion(
  rawUrl: string,
  cacheVersion: string,
  origin: string
): string {
  const url = new URL(rawUrl, origin)
  url.searchParams.set('t', cacheVersion)
  return url.href
}
