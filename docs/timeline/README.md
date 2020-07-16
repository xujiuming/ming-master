---
sidebar: false
---


## 时间线
<my-timeline :eventList="eventList"></my-timeline>

<script >
export default {
      data(){
        return {
          eventList: [
          '2020-07-16 17:17:00 增加websocket测试工具',
          '2020-06-11 15:24:00 增加二维码识别工具',
          '2020-06-09 11:21:00 增加AI/图片通用文本识别工具',
          '2020-06-02 17:20:00 增加URI编码/解码工具',
          '2020-04-29 17:47:00 增加二维码工具',
          '2020-04-05 17:53:00 增加xml格式化工具',
          '2020-02-13 11:00:00 调整常用链接',
          '2019-12-23 17:00:00 添加json格式化工具、md5加密工具',
          '2019-12-03 16:00:00 添加词云组件、hexo博客使用github actions部署',
          '2019-12-01 19:00:00 github actions自动编译部署到oss',
          '2019-12-01 14:00:00 主站改版(使用vuepress+github actions + oss)'
          ]
        };
      }
    }
</script>