## mq常规场景
* 解耦
* 延迟消息
* 削峰 
* 分布式事务
* 分发数据 


## 常用mq及其适用场景
> 由于个人 使用rabbit mq比较多  后续有时间 再补充其他mq  

* rabbit 
> https://baike.baidu.com/item/rabbitmq/9372144?fr=aladdin
> https://www.jianshu.com/p/19e0613fc1c8

特点:   
以高性能、健壮以及可伸缩性出名的 Erlang 写成。 
消息持久化     
符合amqp协议标准      
消息回执    
消息模式(订阅模式、路由模式、通配符模式)  
自带ui  
插件功能(trace插件)   

比较适合企业主营业务场景  功能繁多 性能足够强 数据几乎不会丢失

当然在日志之类的大量数据 传递什么的 肯定比不过kafka 不过一般公司达不到rabbit的极限 







## rabbit集群方案 
