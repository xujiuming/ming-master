const moment = require('moment');

module.exports = {
    //只兼容 常青树浏览器  1180 1148
    evergreen: true,
    //添加插件配置
    plugins: [
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
        'qrcode-reader'
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
        //搜索 条数
        searchMaxSuggestions: 10,
        //是否平滑滚动
        smoothScroll: true,
        // 1.接受字符串，它设置了最后更新时间的label，例如：最后更新时间：2019年5月3日 21:51:53
        lastUpdated: '最后更新时间',
        // 所有页面全部开启自动生成侧边栏
        // sidebar: 'auto',
        //侧边栏自动生成标题代码  2=##
        // sidebarDepth: 2,
        sidebar: [
            {
                title: '加密/解密工具',   // 必要的
                path: '/tools/secret/',      // 可选的, 应该是一个绝对路径
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    ['/tools/secret/MD5', 'MD5加密'],
                    ['/tools/secret/SHA', 'SHA加密'],
                    ['/tools/secret/URI', 'URI编码/解码'],
                ]
            },
            {
                title: '数据格式处理工具',   // 必要的
                path: '/tools/dataFormat/',      // 可选的, 应该是一个绝对路径
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    ['/tools/dataFormat/jsonFormat', 'json格式化工具'],
                    ['/tools/dataFormat/xmlFormat', 'xml格式化工具'],
                    ['/tools/dataFormat/qrCodeViews', '二维码工具'],
                ]
            },
            {
                title: 'AI工具',
                path: '/tools/ai/',
                sidebarDepth: 1,
                children: [
                    ['/tools/ai/imageTextOCR', '图片通用文本识别'],
                ]
            }
        ],
        nav: [
            {text: '主页', link: '/'},
            {text: '常用工具', link: '/tools/'},
            {text: '常用链接', link: '/link/'},
            {text: '时间线', link: '/timeline/'},
            {text: '关于', link: '/about/'},
        ],

    },
};