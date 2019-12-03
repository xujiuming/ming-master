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
          '2019-12-01 19:00:00 github actions自动编译部署到oss',
          '2019-12-01 14:00:00 主站改版(使用vuepress+github actions + oss)'
          ]
        };
      }
    }
</script>