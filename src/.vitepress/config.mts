import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "constant-e's Website",
  description: "constant-e's Website",
  lang: "zh-CN",
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '个人博客', link: '/blogs', activeMatch: '/blogs/' },
      { text: 'CEMCL', link: 'https://constant-e.github.io/CEMCL' },
      { text: 'MC服务器', link: 'https://constant-e.github.io/mcserver' },
      { text: '关于', link: '/about' }
    ],

    search: {
      provider: 'local'
    },

    sidebar: {
      '/blogs/': [
        {
          text: 'Android',
          items: [
            { text: 'Root', link: '/blogs/android/root' },
          ]
        },
        {
          text: 'Linux',
          items: [
            { text: '备忘录', link: '/blogs/linux/notes' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/constant-e' }
    ]
  }
})
