module.exports = {
    serviceWorker: true,
    title: 'ming',
    description: 'ming',
    head: [
        ['link', {rel: 'icon', href: '/img/logo.ico'}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
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
        sidebar: 'auto',
        nav: [
            {text: '主页', link: '/'},
            {text: '博客', link: "/blog/"},
            {text: '关于', link: '/about/'},
            {text: 'Github', link: 'https://www.github.com/xujiuming'},
            {text: 'hexo博客', link: 'https://blog.xujiuming.com'},
        ],
        sidebarDepth: 2,
    },
};