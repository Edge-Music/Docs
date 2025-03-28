import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "云享社",
  description: "云享社是一款开源的通用音乐客户端，采用灵活的API驱动设计，可以连接各种音乐服务。应用界面和功能会根据您配置的API服务动态呈现，为用户提供统一且流畅的音乐体验。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '隐私协议', link: '/policy' },
      { text: '意见反馈', link: '/feedback' },
      { text: '开发指南', link: '/dev/index' },
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          items: [
            { text: '快速开始', link: '/guide/' },
          ]
        },
        {
          text: '数据源',
          items: [
            { text: '社区公开的数据源', link: '/guide/datasource' },
          ]
        }
      ],

      '/dev/': [
        {
          text: '数据源',
          items: [
            { text: '入门指南', link: '/dev/index' },
            { text: '数据模型', link: '/dev/models' },
            { text: '认证', link: '/dev/authentication' },
            { text: '歌单', link: '/dev/playlist' },
            { text: '歌曲', link: '/dev/song' },
            { text: '艺术家', link: '/dev/artist' },
            { text: '歌曲', link: '/dev/song' },
            { text: '搜索', link: '/dev/search' },
            { text: 'API Reference', link: '/dev/api' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Okysu/harmony-next-music-sharing' }
    ]
  }
})
