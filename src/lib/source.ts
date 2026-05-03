import { loader } from 'fumadocs-core/source'
import { docs } from 'collections/server'
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons'
import { docsContentRoute, docsRoute } from './shared'

/* ================================
   Types
================================ */

type PageData = {
  title: string
  description?: string
  date?: string
  body: unknown
  toc?: Array<{
    title: string
    url: string
    depth?: number
    items?: Array<{ title: string; url: string; depth?: number }>
  }>
  full?: boolean
}

type FumadocsPageData = PageData & {
  getText: (type: 'raw' | 'processed') => Promise<string>
}

/* ================================
   Utils
================================ */

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

function flattenDocSlugs(file: unknown): string[] {
  // type narrowing (safe)
  const path =
    typeof file === 'object' &&
    file !== null &&
    'path' in file &&
    typeof (file as any).path === 'string'
      ? (file as any).path
      : ''

  const segments = path.replace(/\\/g, '/').split('/').filter(Boolean)

  const fileName = segments.pop() ?? ''
  const baseName = fileName.replace(/\.[^/.]+$/, '')

  const cleanedSegments = segments
    .filter((segment: string) => segment !== 'docs')
    .map((segment: string) => slugify(segment))

  // index.md → folder root
  if (baseName === 'index') {
    return cleanedSegments
  }

  return [...cleanedSegments, slugify(baseName)]
}

/* ================================
   Source Loader
================================ */

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: docsRoute,
  slugs: flattenDocSlugs,
  plugins: [lucideIconsPlugin()],
})

/* ================================
   Helpers
================================ */

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md']

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  }
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const pageData = page.data as unknown as FumadocsPageData

  const processed = await pageData.getText('processed')

  const metadata: string[] = []
  metadata.push(`URL: ${page.url}`)

  if (pageData.description) {
    metadata.push(`\n${pageData.description}`)
  }

  const cleanedContent = processed
    .replace(/<[A-Z][^>]*\/?>/g, '') 
    .trim()
    .replace(/\n\s*\n\s*\n+/g, '\n\n')

  return `# ${page.data.title} (${page.url})

${metadata.join('\n')}

${cleanedContent}
`
}
