
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

