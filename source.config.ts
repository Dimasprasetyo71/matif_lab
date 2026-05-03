import { defineConfig, defineDocs, metaSchema } from 'fumadocs-mdx/config'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export const docs = defineDocs({
  dir: 'content/docs',

  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },

    async: true,
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
})
