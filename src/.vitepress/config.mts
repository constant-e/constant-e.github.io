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
            { text: '建议', link: '/blogs/android/advices' },
            { text: 'LSPosed', link: '/blogs/android/lsposed' },
            { text: 'Root', link: '/blogs/android/root' },
            { text: '如何伪造一个LSPosed 内测版', link: '/blogs/android/fake_lsposed_it'},
          ]
        },
        {
          text: 'Linux',
          items: [
            { text: 'Arch Linux 安装', link: '/blogs/linux/install_arch.md' },
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
