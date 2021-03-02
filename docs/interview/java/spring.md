## spring boot 特性
* 提供默认配置
* 提供内嵌服务器

## spring boot 常用的starter 
* web
* webflux
* jpa
* mybatis (非官方)
* mybatis plus(非官方) 
* security
* devtools
* test 


## spring cloud模块和对应的组件选择 
* 注册中心  
    zk 、eureka、etcd、nacos  
  
* rpc   
    http+feign+ribbon+hystrix  
    dubbo+sentinel   
  
* mq   
    spring cloud中 跟mq有关的模块 就是bus和stream   
    stream：屏蔽底层 mq  提供统一的发送和接收   
    bus: stream更高一层的封装 只用定义服务之间的消息广播机制  不用处理发送和接收 更不用处理各种不同的mq使用方式   
    具体mq选择: rabbit mq 、rocket mq、 kafka、    
    
* 配置中心    
    config server   
    nacos    
    apollo(阿波罗)  
  
* 分布式事务协调  
    seata   
  
* 调度中心   
    quartz(需要二次开发适配)    
    xxl-job     
    elastic job     
    spring schedule    
    k8s schedule + spring cloud tasks     
      
    
* 网关   
    kong     
    zuul(基本废弃)   
    spring gateway(需要二次开发适配)     
    k8s ingress   
