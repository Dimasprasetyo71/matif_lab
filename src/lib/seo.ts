export function buildSeoMeta({
  title,
  description,
  url,
}: {
  title?: string
  description?: string
  url?: string
}) {
  return {
    meta: [
      { title: title ?? 'Docs' },
      {
        name: 'description',
        content: description || 'Dokumentasi lengkap',
      },

      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
    ],
    links: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
  }
}
