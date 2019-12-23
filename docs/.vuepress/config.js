module.exports = {
    //添加插件配置
    plugins: [
        // 时间线依赖
        'vue-cute-timeline',
        'vuewordcloud',
        'vue-json-views',
        'crypto-js'
    ],
    //开启pwa
    serviceWorker: true,
    locales: {
        //配置默认 语言
        '/': {
            lang: 'zh-CN',
            title: 'ming',
            description: '不做不说'
        }
    },
    head: [
        ['link', {rel: 'icon', href: '/img/logo.ico'}]
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
                    ['/tools/secret/MD5','MD5加密工具'],
                    // ['/tools/secret/SHA-1','SHA-1加密工具'],
                    // ['/tools/secret/SHA-256','SHA-256加密工具'],
                    // ['/tools/secret/sm3','sm3加密工具'],
                ]
            },
            {
                title: '数据格式处理工具',   // 必要的
                path: '/tools/dataFormat/',      // 可选的, 应该是一个绝对路径
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    ['/tools/dataFormat/jsonFormat', 'json格式化工具'],
                ]
            }
        ],
        nav: [
            {text: '主页', link: '/'},
            {text: '时间线', link: '/timeline/'},
            {text: '关于', link: '/about/'},
            {text: '常用链接', link: '/link/'},
            {text: '常用工具', link: '/tools/'},
        ],

    },
};