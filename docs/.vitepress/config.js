export default {
  base: '/strve-doc-zh',
  head: [['link', { rel: 'icon', href: '/strve-doc-zh/' + 'logo.png' }]],
  markdown: {
    theme: 'material-default',
    lineNumbers: false,
  },
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Strve.js',
      titleTemplate: '一个易用、快速、灵活且轻量级的JavaScript库',
      description: '用于构建用户界面',
    },
  },
  themeConfig: {
    logo: '/logo.png',
    socialLinks: [{ icon: 'github', link: 'https://github.com/strveJs' }],
    locales: {
      '/': {
        nav: [
          {
            text: '更新日志',
            link: '/changeLog/',
          },
          {
            text: '选择语言',
            items: [
              {
                text: 'English',
                link: 'https://strvejs.github.io/strve-doc/',
              },
              {
                text: '简体中文',
                link: 'https://strvejs.github.io/strve-doc-zh/',
              },
            ],
          },
        ],
        outlineTitle: '此页',
        sidebar: [
          {
            text: '指导',
            collapsible: false,
            items: [
              {
                text: '开始',
                link: '/guide/started/',
              },
              {
                text: '安装',
                link: '/guide/install/',
              },
            ],
          },
          {
            text: '要点',
            collapsible: false,
            items: [
              {
                text: 'API',
                link: '/essentials/api/',
              },
              {
                text: '用法',
                link: '/essentials/usage/',
              },
            ],
          },
          {
            text: '工具',
            collapsible: false,
            items: [
              {
                text: 'CreateStrveApp',
                link: '/tool/createStrveApp/',
              },
              {
                text: 'StrveRouter',
                link: '/tool/strveRouter/',
              },
              {
                text: 'BabelPluginStrve',
                link: '/tool/babelPluginStrve/',
              },
              {
                text: 'BabelPluginJsxToStrve',
                link: '/tool/babelPluginJsxToStrve/',
              },
            ],
          },
          {
            text: '其他',
            collapsible: false,
            items: [
              {
                text: 'JSX 支持',
                link: '/other/jsx/',
              },
              {
                text: '适配',
                link: '/other/adapt/',
              },
              {
                text: 'IDE 支持',
                link: '/other/ide/',
              },
              {
                text: 'UI 框架',
                link: '/other/ui/',
              },
              {
                text: '浏览器兼容性',
                link: '/other/browser/',
              },
              {
                text: '关于',
                link: '/other/about/',
              },
            ],
          },
        ],
      },
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2021-${new Date().getFullYear()} maomincoding`,
    },
  },
};
