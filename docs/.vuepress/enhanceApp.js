/**
 * 扩展 VuePress 应用
 */
import VueWordCloud from 'vuewordcloud';
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'





export default ({
                    Vue, // VuePress 正在使用的 Vue 构造函数
                    options, // 附加到根实例的一些选项
                    router, // 当前应用的路由实例
                    siteData // 站点元数据
                }) => {
    //使用 vuewordcloud 组件
    Vue.component(VueWordCloud.name, VueWordCloud)
    //使用bootstrap
    Vue.use(BootstrapVue);
}

