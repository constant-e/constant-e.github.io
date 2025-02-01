import { defineConfig } from 'vitepress'

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
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    lastUpdated: {
      text: '最后更新于'
    },

    outline: {
      label: '页面导航'
    },

    sidebar: {
      '/blogs/': [
        {
          text: 'Android',
          link: '/blogs/android/',
          items: [
            { text: '建议', link: '/blogs/android/advices' },
            { text: 'LSPosed', link: '/blogs/android/lsposed' },
            { text: 'Root', link: '/blogs/android/root' },
            { text: '如何伪造一个LSPosed 内测版', link: '/blogs/android/fake_lsposed_it'},
          ]
        },
        {
          text: 'Linux',
          link: '/blogs/linux/',
          items: [
            { text: 'Arch Linux 安装', link: '/blogs/linux/install_arch.md' },
            { text: '备忘录', link: '/blogs/linux/notes' },
          ]
        },
        {
          text: '杂项',
          link: '/blogs/others/',
          items: [
            { text: '阅读(legado)书源', link: '/blogs/others/legado_source.md' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/constant-e' }
    ]
  }
})
