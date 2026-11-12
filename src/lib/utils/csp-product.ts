/**
 * Salesforce Experience Cloud (CSP storefront) settings shared by the next.config rewrites and the course
 * components. Kept free of path aliases so next.config.ts can import it directly.
 */

// Product page base url. Defaults to the dev sandbox.
export const CSP_PRODUCT_URL = (
  process.env.CSP_PRODUCT_URL ||
  "https://stanforduniversity3--devmain.sandbox.my.site.com/StanfordContinuingStudies/product"
).replace(/\/+$/, "")

const productUrl = new URL(CSP_PRODUCT_URL)

// Salesforce host, e.g. `https://stanforduniversity3--devmain.sandbox.my.site.com`.
export const CSP_ORIGIN = productUrl.origin

// The Experience Cloud site root, e.g. `/StanfordContinuingStudies`: the product path minus its last segment. The
// storefront's scripts route by the browser address, so pages only render under this path.
export const CSP_SITE_PATH = productUrl.pathname.replace(/\/[^/]*$/, "")

/**
 * Make a Salesforce storefront url relative so it is served from this domain through the next.config rewrites.
 * Urls on any other host are returned unchanged.
 */
export const getCspProductHref = (url?: string | null): string | undefined => {
  if (!url) return
  if (!CSP_SITE_PATH || !url.startsWith(`${CSP_ORIGIN}${CSP_SITE_PATH}/`)) return url
  return url.slice(CSP_ORIGIN.length)
}
