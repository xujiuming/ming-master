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







## rabbit部署方案 
>https://blog.csdn.net/zhutongcloud/article/details/93074158 

* 单机    
    单机部署 非正式环境使用   生产不建议使用    

* 普通集群   
    通过ErLang Cookie 来实现多个rabbit mq 实例之间数据共享 多个物理队列组装一个逻辑队列 提高吞吐量 但是如果其中一个物理队列宕机 那么该物理队列的消息无法使用    
   
* 镜像集群   
    是在搭建普通集群之后 开启镜像模式  来达到每个物理队列数据都相同    
  

## rabbit 消息持久化   
>参考文档:   
>https://www.cnblogs.com/bigberg/p/8195622.html   
>https://honeypps.com/mq/rabbitmq-analysis-of-message-durable/     

rabbit 消息持久化 应该要分为三种类型  queue持久化  message持久化  exchange持久化       
queue持久化:  设置 durable=true           消费端发送端都要设置     
message持久化:  deliveryMode=2    (1:不持久化  2:持久化)      
exchange持久化:  channel.exchangeDeclare(exchangeName, “direct/topic/header/fanout”, true)      

消息刷盘时机:    
创建一个buffer 大小为nMB  数据在写入文件的时候先写入buffer 如果buffer满了 立即写入到文件(不一定刷盘)     
同时 每隔25ms 不管buffer满不满 度把buffer和未刷新到磁盘的数据 强制刷新到磁盘      

## rabbit 延时队列  
>参考文档:    
>https://www.cnblogs.com/xiaoxing/p/9250823.html      
>https://github.com/rabbitmq/rabbitmq-delayed-message-exchange        
>https://www.rabbitmq.com/dlx.html   

ttl:  time to live  消息有效时间    
dlx: dead letter exchanges  死信队列       一般消息过期、被拒绝、超出队列深度、等等情况度会被丢进死信队列   

* ttl + dlx   
利用消息超时 和死信队列来实现     
设置消息超时时间 和指定超时之后进入死信队列的exchange 和 routeKey     

* rabbitmq_delayed_message_exchange插件  
    使用插件     

## rabbit 有序队列  

mq本身自己是有序的   只是在多个consumer的时候 由于网络、处理速度等情况 导致顺序错乱     

1: 一个queue只对应一个consumer  consumer 内部多线程 处理 排序       需要维护多个queue  
2: 对consumer处理的业务 进行排序    例如增加序号   这种方式 不需要处理那么队列 是通过consumer的业务代码上处理  

但是一般用到mq  尽量做一些对状态 顺序没要求的业务  如果有最好选择 一个queue对应一个consumer方式 这种方式相对稳妥点  而且consumer内部做多线程 性能也还行       


## rabbit 消息确认  
>参考文档:  
>https://www.rabbitmq.com/confirms.html    
>https://www.jianshu.com/p/f63820fe2638    

rabbit 支持 消息确认机制  客户端可以在适当的时机返回ack 确定消费消息         
