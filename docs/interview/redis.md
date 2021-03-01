
## redis中list的底层数据结构是什么
>参考资料: https://zhuanlan.zhihu.com/p/102422311   
3.2之前分为ziplist和linkedlist  
3.2之后使用quicklist

3.2之前 redis 会优先考虑ziplist来节省内存    
当试图往列表新添加一个字符串值，且这个字符串的长度超过 server.list_max_ziplist_value （默认值为 64 ）。   
ziplist 包含的节点超过 server.list_max_ziplist_entries （默认值为 512 ）。 满足任意一个条件 会改为常规的linkedlist

linkedlist 是个双向链表     
ziplist 没有维护双向指针:prev next；而是存储上一个 entry的长度和 当前entry的长度，通过长度推算下一个元素在什么地方。

quickList就是一个标准的双向链表的配置，有head 有tail;  
每一个节点是一个quicklistNode，包含prev和next指针。  
每一个quicklistNode 包含 一个ziplist，*zp 压缩链表里存储键值。  
所以quicklist是对ziplist进行一次封装，使用小块的ziplist来既保证了少使用内存，也保证了性能。

## redis备份和恢复
>参考资料: https://baijiahao.baidu.com/s?id=1654694618189745916&wfr=spider&for=pc
redis 备份有两种 rdb 和aof      
恢复数据 如果从业务上考虑 那么直接重新加载即可    
如果是靠redis本身的备份机制来恢复 就要看是使用哪种备份模式

> BGSAVE SAVE备份redis   CONFIG GET dir 获取当前redis启动时候从那个目录加载rdb或者aof文件

rdb备份:
备份某个时间点的内存镜像     
好处:    
（1）RDB文件紧凑，全量备份，非常适合用于进行备份和灾难恢复。    
（2）生成RDB文件的时候，redis主进程会fork()一个子进程来处理所有保存工作，主进程不需要进行任何磁盘IO操作。    
（3）RDB 在恢复大数据集时的速度比 AOF 的恢复速度要快。    
坏处:    
RDB快照是一次全量备份，存储的是内存数据的二进制序列化形式，存储上非常紧凑。当进行快照持久化时，会开启一个子进程专门负责快照持久化，子进程会拥有父进程的内存数据，父进程修改内存子进程不会反应出来，所以在快照持久化期间修改的数据不会被保存，可能丢失数据。   

aof备份:    
记录所有写的指令      
好处:   
（1）AOF可以更好的保护数据不丢失，一般AOF会每隔1秒，通过一个后台线程执行一次fsync操作，最多丢失1秒钟的数据。（2）AOF日志文件没有任何磁盘寻址的开销，写入性能非常高，文件不容易破损。  
（3）AOF日志文件即使过大的时候，出现后台重写操作，也不会影响客户端的读写。   
（4）AOF日志文件的命令通过非常可读的方式进行记录，这个特性非常适合做灾难性的误删除的紧急恢复。比如某人不小心用flushall命令清空了所有数据，只要这个时候后台rewrite还没有发生，那么就可以立即拷贝AOF文件，将最后一条flushall命令给删了，然后再将该AOF文件放回去，就可以通过恢复机制，自动恢复所有数据   
坏处:    
（1）对于同一份数据来说，AOF日志文件通常比RDB数据快照文件更大  但是aof文件可以进行压缩    
（2）AOF开启后，支持的写QPS会比RDB支持的写QPS低，因为AOF一般会配置成每秒fsync一次日志文件，当然，每秒一次fsync，性能也还是很高的  
（3）以前AOF发生过bug，就是通过AOF记录的日志，进行数据恢复的时候，没有恢复一模一样的数据出来。    
（4）AOF文件如果出现损坏需要调整才能恢复  

> aof文件重写和压缩 使用BGREWRITEAOF命令可以通知redis 重写aof文件 减少冗余命令 
> 设置aof的auto-aof-rewrite-percentage选项和auto-aof-rewrite-min-size选项来自动执行BGREWRITEAOF


redis备份方案选择:    
* 单纯rdb 直接加载rdb文件内容 速度快 适合redis只做一些加速相关的处理 对数据准确性要求不是那么高 允许极端情况下丢失          
* 单纯aof 执行aof中的指令 适合做一些对数据完整性有要求的业务  可以容忍一定程度的缓慢      
* rdb+aof 会优先执行aof模式      
* 不备份   适合单纯用来加速和不稳定存储业务的  例如用来做缓存、和临时存储一些不重要的共享数据     

## redis数据结构常用的有哪些和用途
> 参考文档:     
> https://blog.xujiuming.com/ming/4c596b02.html 基础数据结构     
> https://blog.xujiuming.com/ming/674b6797.html bitMap    
> https://blog.xujiuming.com/ming/1b3e547f.html hyperLogLog   

|结构名|作用|备注|
|:---|:---|:---|
|string|-||
|list|数组||
|hash|类似java的hashMap 存储键值对形式的对象||
|set|有序列表|有顺序|
|zset|||
|bitMap|位图|存储打卡记录、或者做一些大数据量下的匹配情况|
|hyperLogLog|||
|geo|地理位置信息|存储地理位置信息 可以计算间隔等数据 |

## redis 简单mq  
* 使用list 做mq     
    利用redis list数据类型做mq  优点顺序可控  可以重复读取  简单场景下可以用用 不过实用性不高        
* 使用 pub/sub        
    redis的 发布订阅系统  就是单纯的点对点 点对多的   这个在小规模 没什么资源的时候 可以替代mq使用使用  不过要注意设置队列长度和大小     

## redis 实现限流   
> 流量限流 大致上有令牌桶、漏桶、滑动窗体、计数等方法   

* 请求计数法   
    利用redis 优势  对请求做hash做key 和过期时间 如果是有指定次数 那么存储次数作为value  每次请求判断是否过期和次数是否达到限定值   
    简单粗暴 但是在临界值的时候 无法有效控制    
  
* 滑动窗体法     
    参考tcp 拥塞控制的滑动窗体算法     
    使用 zset 利用key+评分 来做    
  
* 令牌桶   
    >https://blog.xujiuming.com/ming/4691f673.html  
     
    指定生成令牌的服务  此服务包含生成令牌速度的控制 和生成令牌 生成到redis中 使用list或者set存储       
    处理的时候 每个请求尝试从桶中获取元素 如果获取到 则执行请求 无法获取 则拒绝请求      
  
* 漏桶   
    >https://blog.xujiuming.com/ming/de6fcb40.html  
    
    设定一个指定大小的 list或者set    
    每个请求作为一个key 存放到list中    
    每个请求调用完成之后清理key     
    当桶满了  拒绝请求或者做服务降级处理   
    


## redis 实现id取号     
> 一般id生成 有一些特定业务 需要有序并且有规则的生成    
    
利用redis的特性 incr incrby  做取号   
设定一个key 值为1 每次使用 incr 来有序自增   
一般企业中肯定不是这么简单 不过大致原理就是利用redis的性能和并发性来做处理     
例如在昂立中 我就是利用 db+redis+memory 做多段缓存 来达到性能和id有序+可控     
大多数场景 并不需要那么极限的性能 基本上 db+redis+memory 三步 差不多了     
如果实在是对性能有特别极限的要求 我个人认为还不如直接用uuid之类的 本机生成 + memory    

## redis实现分布式锁       
> 分布式锁 简单来说 就是设定一个标记来表明资源锁定状态   
    
用redis做 基本上就是新增一个key  共享给集群  
不过redis做分布式锁 在单机的情况下 没有问题 如果是集群情况下 特别是cluster模式或者主从分离的情况下 可能存在问题   
这个时候可以使用redisson这种工具包  它里面是采用少数服从多数的方式  来判断锁状态      

## redis 实现布隆过滤    
> 布隆过滤  是判断某个数据是否在一个大量数据集下的方式 有一定的误差    
> 布隆过滤器判断存在的时候 这个值可能不存在 判断某个值不存在的时候这个值肯定不存在   
    
用redis做的话   redis4.x之后 可以直接安装 布隆过滤器插件   
直接 bf.add bf.madd bf.exists bf.mexists 等指令直接操作     
    

    



