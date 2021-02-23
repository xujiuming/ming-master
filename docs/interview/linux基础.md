## linux启动流程 
通电-->bios-->加载引导记录 grub之类的-->加载操作系统-->加载/boot-->创建init进程(pid=1)-->选择运行级别(/etc/rc.d)-->加载开机程序(/etc/init.d)

## linux文件描述符 
linux文件描述符简单的说法就是 一个进程要执行对某个文件的io操作 都通过文件描述符来操作 类似windows中的文件句柄   
默认情况下 有 0(stdin) 1(stdout) 2(stderr)   
一般通过ulimit 来查看操作设置默认的文件操作符属性    
因为linux 所有的东西都是文件 那么socket也是个文件 在常规web服务器性能调优中 合理设置最大文件描述符数量 可以优化web服务器性能    

