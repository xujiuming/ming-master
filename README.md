# ming-master
ming主站静态页面

## 时间点
#### 2019年12月01日
* 使用vuepress 
* 使用github actions 做自动化
* 依托于 aliyun oss服务 +cdn服务

#### 2019年11月29日
* 确定使用vue+element 重构master 
* 拆分 连接位置  分为 个人、公司、工具 
* 增加单独简历页  

#### 2019年12月02日
* 添加echarts插件 
* 定制个人简历页面 

#### 2019年12月09日
* 调整部署脚本 只监听master分支 push事件 
* 增加dev分支  作为日常功能开发分支 







``` bash
# install dependencies
npm install

npm run docs:dev 
npm run docs:build 
```
ming
