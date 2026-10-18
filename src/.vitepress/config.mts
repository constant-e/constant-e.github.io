import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const blogRoot = fileURLToPath(new URL('../blogs', import.meta.url))

type ScannedItem = {
  text: string
  link?: string
  items?: ScannedItem[]
  order: number
  sortKey: string
}

type SidebarItem = {
  text: string
  link?: string
  items?: SidebarItem[]
}

// 侧边栏顺序优先读取可选的 frontmatter `order`，否则按文件名排序。
function readMeta(file: string, fallback: string) {
  const source = fs.readFileSync(file, 'utf-8')
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  let title = fallback
  let order: number | undefined

  if (frontmatter) {
    const titleMatch = frontmatter[1].match(/^title:\s*(.+?)\s*$/m)
    const orderMatch = frontmatter[1].match(/^order:\s*(\d+)\s*$/m)
    if (titleMatch) title = titleMatch[1].replace(/^['"]|['"]$/g, '')
    if (orderMatch) order = Number(orderMatch[1])
  }

  const heading = source.match(/^#\s+(.+?)\s*$/m)
  if (title === fallback && heading) title = heading[1]

  title = title
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim()

  return { title, order }
}

function toLink(segments: string[], directory: boolean) {
  return `/blogs/${segments.join('/')}${directory ? '/' : ''}`
}

function scanDirectory(absoluteDir: string, segments: string[]): ScannedItem[] {
  const items: ScannedItem[] = []

  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue

    if (entry.isDirectory()) {
      const childSegments = [...segments, entry.name]
      const indexPath = path.join(absoluteDir, entry.name, 'index.md')
      const hasIndex = fs.existsSync(indexPath)
      const meta = hasIndex ? readMeta(indexPath, entry.name) : { title: entry.name, order: undefined }
      const children = scanDirectory(path.join(absoluteDir, entry.name), childSegments)

      if (!hasIndex && children.length === 0) continue

      items.push({
        text: meta.title,
        link: hasIndex ? toLink(childSegments, true) : undefined,
        items: children.length > 0 ? children : undefined,
        order: meta.order ?? Number.MAX_SAFE_INTEGER,
        sortKey: entry.name,
      })
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const meta = readMeta(path.join(absoluteDir, entry.name), entry.name.slice(0, -3))
      const slug = entry.name.slice(0, -3)

      items.push({
        text: meta.title,
        link: toLink([...segments, slug], false),
        order: meta.order ?? Number.MAX_SAFE_INTEGER,
        sortKey: entry.name,
      })
    }
  }

  return items
}

function toSidebarItems(items: ScannedItem[]): SidebarItem[] {
  return items
    .slice()
    .sort((a, b) => a.order - b.order || a.sortKey.localeCompare(b.sortKey))
    .map(({ text, link, items, order: _order, sortKey: _sortKey }) => {
      const item: SidebarItem = { text }
      if (link) item.link = link
      if (items) item.items = toSidebarItems(items)
      return item
    })
}

function buildBlogSidebar(): SidebarItem[] {
  if (!fs.existsSync(blogRoot)) return []
  return toSidebarItems(scanDirectory(blogRoot, []))
}

export default defineConfig({
  title: "constant-e's Website",
  description: "constant-e's Website",
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '个人博客', link: '/blogs', activeMatch: '/blogs/' },
      { text: 'CEMCL', link: 'https://constant-e.github.io/CEMCL' },
      { text: 'MC服务器', link: 'https://constant-e.github.io/mcserver' },
      { text: '关于', link: '/about' }
    ],

    search: {
      provider: 'local',
    },

    lastUpdated: {
      text: '最后更新于'
    },

    outline: {
      label: '页面导航'
    },

    sidebar: {
      '/blogs/': buildBlogSidebar()
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/constant-e' }
    ]
  }
})
