---
sidebar: false
---

# ming 
## 联系方式 
* 邮箱 18120580001@163.com 

## 工作经历 
<my-timeline :eventList="workerHistoryEventList"></my-timeline>


## 技能




<script >
export default {
      data(){
        return {
          workerHistoryEventList: [
          '2017-12-01~至今 昂立教育(java开发)',
          '2017-03-01~2017-11-25 牧美信息科技(java开发)',
          '2016-06-01~2017-02-28 电信外包(java开发)'
          ],
          words: [
               {
                 name: 'java',
                 value: 30
               },
               {
                 name: 'docker',
                 value: 30
               },
               {
                 name: 'linux',
                 value: 10
               }
          ]
        };
      }
    }
</script>
