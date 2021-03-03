## spring 事务隔离级别和传播方式 
> 参考文档:https://www.cnblogs.com/wj0816/p/8474743.html
> TransactionDefinition中的也有相关描述   
* 事务隔离级别
    1. 读未提交 READ UNCOMMITTED
    2. 读已提交 READ COMMITTED
    3. 重复读 REPEATABLE READ
    4. 串行  SERIALIZABLE
    5. defalut 默认使用数据库配置的隔离级别  
* 对读取数据影响的方式
    1. 脏读:一个事务读取了另一个未提交事务写入的数据
    2. 不可重复度: 一个事务重新读取之前读取过的数据  发现已经改变
    3. 幻读:一个事务开启后 需要根据根据已存在的字段去更新 回执行查询返回符合条件的数据 这个时候因为其他事务提交发生了改变 会导致当前事务无法进行 导致逻辑失败


* 隔离级别

|隔离级别|脏读|不可重复读|幻读|
|------|---|--------|---|
|读未提交|√|√|√|
|读已提交|×|√|√|
|重复读|×|×|√|
|串行|×|×|×|

* 传播方式 
> TransactionDefinition中的内容  

* PROPAGATION_REQUIRED
  如果当前有事务 则加入事务  没有事务创建新事务      默认就是这种传播方式   
* PROPAGATION_SUPPORTS
  如果有事务 加入当前事务  如果没有就不执行事务    
* PROPAGATION_MANDATORY
  如果有事务 加入当前事务  没有就抛出异常  
* PROPAGATION_REQUIRES_NEW
  创建一个新事务 如果存在事务 那么挂起当前事务 使用新事务  
* PROPAGATION_NOT_SUPPORTED
  不支持当前事务 始终不执行事务  
* PROPAGATION_NEVER
  不支持当前事务 如果存在抛出异常 
* PROPAGATION_NESTED
  如果当前存在事务 那么嵌套在事务中执行



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
