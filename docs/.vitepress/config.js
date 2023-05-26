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
			titleTemplate: '一个可以将字符串转换为视图的JS库',
			description: '一个可以将字符串转换为视图的JS库',
		},
	},
	themeConfig: {
		logo: '/logo.png',
		// algolia: {
		// 	apiKey: 'bfcdc868c58895106c405a8d1a765c09',
		// 	indexName: 'strvejs',
		// 	appId: 'OO7L0TPJ7C',
		// },
		socialLinks: [
			{ icon: 'twitter', link: 'https://twitter.com/maomincoding' },
			{ icon: 'github', link: 'https://github.com/maomincoding/strve' },
		],
		locales: {
			'/': {
				nav: [
					{
						text: '演练场',
						link: '/playground/',
					},
					{
						text: '更新日志',
						link: '/changeLog/',
					},
					{
						text: '选择语言',
						items: [
							{
								text: 'English',
								link: 'https://maomincoding.github.io/strve-doc/',
							},
							{
								text: '简体中文',
								link: 'https://maomincoding.github.io/strve-doc-zh/',
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
								text: '介绍',
								link: '/guide/introduce/',
							},
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
								text: 'VitePluginStrve',
								link: '/tool/vitePluginStrve/',
							},
						],
					},
					{
						text: '其他',
						collapsible: false,
						items: [
							{
								text: 'SFC',
								link: '/other/sfc/',
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
