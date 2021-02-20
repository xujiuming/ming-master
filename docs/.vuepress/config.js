const moment = require('moment');

module.exports = {
    //只兼容 常青树浏览器  1180 1148
    evergreen: true,
    //添加插件配置
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }]
        ,
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    // 不要忘了安装 moment
                    const moment = require('moment')
                    moment.locale(lang)
                    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
                }
            }
        ],
        // 时间线依赖
        'vue-cute-timeline',
        'vuewordcloud',
        'vue-json-views',
        'crypto-js',
        'vkbeautify',
        '@xkeshi/vue-qrcode',
        'qrcode-reader',
        'vue-monaco-editor',
        'calculatorjs'
    ],
    locales: {
        //配置默认 语言
        '/': {
            lang: 'zh',
            title: 'ming',
            description: '不做不说'
        }
    },
    head: [
        ['link', {rel: 'icon', href: '/img/logo.ico'}],
        ['script', {type: 'text/javascript', src: "/js/baiduStathm.js"}]
    ],
    themeConfig: {
        //开启搜索
        search: true,
        //是否平滑滚动
        smoothScroll: true,
        // 1.接受字符串，它设置了最后更新时间的label，例如：最后更新时间：2019年5月3日 21:51:53
        lastUpdated: '最后更新时间',
        // 所有页面全部开启自动生成侧边栏
        // sidebar: 'auto',
        //侧边栏自动生成标题代码  2=##
        // sidebarDepth: 2,
        sidebar: {
            '/interview/':[
                {
                    title:"java基础",
                    path:'/interview/java基础',
                    sidebarDepth:1
                },
                {
                    title:"linux基础",
                    path:'/interview/linux基础',
                    sidebarDepth:1
                }
            ],
            '/tools/': [
                {
                    title: '代码在线编辑器',
                    path: '/tools/myMonacoEditor',
                    sidebarDepth: 1
                },
                {
                    title: '简易计算器',
                    path: '/tools/myCalculator',
                    sidebarDepth: 1
                },
                {
                    title: 'MD5加密',
                    path: '/tools/secret/MD5',
                    sidebarDepth: 1
                },
                {
                    title: 'SHA加密',
                    path: '/tools/secret/SHA',
                    sidebarDepth: 1
                },
                {
                    title: 'URI编码/解码',
                    path: '/tools/secret/URI',
                    sidebarDepth: 1
                },
                {
                    title: 'BASE64编码/解码',
                    path: '/tools/secret/BASE64',
                    sidebarDepth: 1
                },
                {
                    title: 'json格式化工具',
                    path: '/tools/dataFormat/jsonFormat',
                    sidebarDepth: 1
                },
                {
                    title: 'xml格式化工具',
                    path: '/tools/dataFormat/xmlFormat',
                    sidebarDepth: 1
                },
                {
                    title: '二维码工具',
                    path: '/tools/dataFormat/qrCodeViews',
                    sidebarDepth: 1
                },
                {
                    title: '图片通用文本识别',
                    path: '/tools/ai/imageTextOCR',
                    sidebarDepth: 1
                },
                {
                    title: 'websocket工具',
                    path: '/tools/net/WebSocketTest',
                    sidebarDepth: 1
                }
            ]
        },
        nav: [
            {text: '主页', link: '/'},
            {text: '常用工具', link: '/tools/'},
            {text: '面试问题汇总', link: '/interview/'},
            {text: '时间线', link: '/timeline/'},
            {text: '关于', link: '/about/'},
        ],

    },
};
