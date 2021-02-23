强制cpu读取主存 不从l1 l2 l3之类的cpu缓存中读写数据 保证volatile修饰的内容一致性

JVM内存屏障插入策略：
每个volatile写操作的前面插入一个StoreStore屏障   
在每个volatile读操作的后面插入一个LoadStore屏障     
