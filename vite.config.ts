import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from 'fumadocs-mdx/vite'
// import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
    noExternal: [
      'fumadocs-core',
      'fumadocs-ui',
      'fumadocs-openapi',
      '@fumadocs/base-ui',
    ],
  },
  plugins: [
    devtools(),
    tailwindcss(),

    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
    mdx(await import('./source.config')),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
  ssr: {
    noExternal: [
      'fumadocs-core',
      'fumadocs-ui',
      'fumadocs-openapi',
      '@fumadocs/base-ui',
    ],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
})

export default config
