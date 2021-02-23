## http请求过程 
客户端组装请求地址、header、body-->解析请求地址中的域名-->建立tcp链接-->发送http请求-->服务器响应请求-->释放连接-->客户端解析http请求响应内容 

## http常用状态码
总的来说分六类

>参考文档: https://baike.baidu.com/item/HTTP%E7%8A%B6%E6%80%81%E7%A0%81/5053660?fr=aladdin

* 1xx 消息类       
* 2xx 成功类      
* 3xx 转发类      
* 4xx 客户端异常类     
* 5xx、6xx  服务端异常类      

常遇到的http状态码及其场景       

|状态码|场景|备注|
|:---|:---|:---|
|101|101 Web Socket Protocol Handshake|一般在websocket链接成功的时候 看得到101|
|200|http请求成功|-|
|301|http请求重定向|永久重定向|
|302|http请求重定向|临时重定向|
|400|请求格式内容异常|客户端组装请求格式无法被服务端识别|
|401|未认证|当前请求需要验证用户|
|403|请求拒绝|一般是没有权限|
|404|资源未找到|服务器没有对应的资源|
|499|nginx中是表明客户端主动断开链接|只在nginx中遇到过|
|500|服务异常||
|502|网关或者代理无法从上游接收到有效响应|一般在后端服务更新的时候会出现|
|503|服务过载|服务器超载 无法处理此请求|
|504|超时|网关或者代理服务从上游获取响应时间超时|




::: danger Note  
默认情况下 服务端返回的状态码是符合定义的     
但是有的项目 会根据自身业务情况酌情使用http状态码来表明自己服务的状态    
这个时候 可能会出现不符合http规范的状态码      
:::

## http 跨域 cors 
跨域分为简单跨域和复杂跨域 
>参考文档: http://www.ruanyifeng.com/blog/2016/04/cors.html 

* 符合下面条件的为简单跨域
    1. 请求方法是以下三种方法之一   
       HEAD   
       GET    
       POST
    2. HTTP的头信息不超出以下几种字段    
       Accept    
       Accept-Language   
       Content-Language    
       Last-Event-ID    
       Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

* 服务端cors配置项  
  客户端可以发送跨域请求  携带origin字段来表明本次请求是哪个源  由服务端根据配置来决定是否放行  
  
  |key|value|功能|
  |:--|:---|:---|
  |Access-Control-Allow-Origin|* 或者指定要放行请求的origin|来决定放行那些源的|
  |Access-Control-Allow-Credentials|bool值 默认为true 也只能设置true|是否允许发送cookies 如果不要客户端发送 不返回这个字段就行|
  |Access-Control-Expose-Headers|该字段可选。CORS 请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个服务器返回的基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。|如果有约定之外的 response header要返回需要配置这个|
  |Access-Control-Max-Age|预检请求有效期|在有效期内 遇到复杂请求不用再次发出预检请求|
  
* 简单跨域流程  
  浏览器直接发起携带cors相关header的请求    
* 复杂跨域流程      
  浏览器会先发起一个 带有cors相关header的options预检请求   
  如果服务端允许 那么会正式发起复杂请求    

* 常用处理跨域方案     
    * jsonp     
      利用 <script></script> <img></img>之类的可以跨域加载的html标签 来加载远程资源到标签内部 然后读取标签内的字符串的方式       
    * 服务端配置cors规则     
      设置nginx 或者tomca服务器软件的 cors授权规则即可   
      
## Https 签名请求过程 
>参考资料：https://blog.csdn.net/seujava_er/article/details/90018326

客户端发起访问-->服务端发送公钥给客户端-->客户端验证证书有效性(证书信息 如域名、有效期、厂商等信息)-->客户端随机生成非对称加密秘钥-->用公钥加密非对称加密秘钥发给服务端-->服务端用私钥解密获取非对称加密秘钥-->服务端使用非对称加密秘钥加密返回给客户端-->客户端使用非对称加密秘钥解密

## Http2.0有什么特点
>参考资料:https://blog.csdn.net/qq_32337109/article/details/79975253

二进制传输: 在应用层和传输层之间增加了一个二进制分帧层 将原本http协议的header和body字符串传输进行二进制编码进行传输  header->header帧 body->data帧   
压缩头部: 客户端和服务端增加首部表来跟踪和存储header 如果没发生变化后续请求不发送header 如果有新增和修改那么只发送新增和修改部分并且添加到首部表   
多路复用: 一条链接可以多次发起请求  对于之前的css合并 js合并 图合并不需要特殊处理 减少建立连接的成本 和在浏览器支持的并行链接的数量下同时支持更多的请求      
请求优先级: 所有资源可以并行交错发送， 那想要优先拿到CSS和JS而不是图片怎么办，在每个HTTP 2.0的流里面有个优先值，这个优先值确定着客户端跟服务器处理不同的流采取不同的优先级策略，高优先级优先发送，但这不是绝对的(绝对等待会导致首队阻塞问题)   
服务器提示: HTTP 2.0新增加服务器提示，可以先于客户端检测到将要请求的资源，提前通知客户端，服务器不发送所有资源的实体，只发送资源的URL，客户端接到提示后会进行验证缓存，如果真需要这些资源，则正式发起请求（服务器主动更新静态资源）

比较明显的 应该就是二进制传输和多路复用


## 知道Http3.0吗
>参考资料:https://www.cnblogs.com/chenjinxinlove/p/10104854.html

主要是切换tcp 为quic算法的tdp协议  其他变化不大    
主要是为了避免tcp链接的一些问题 如顺序严格 和一些tcp重连 阻塞等问题


## 四次挥手time_wait状态的作用
> 参考资料:https://blog.csdn.net/qq_36358357/article/details/105695274

主要是保证最后一个ack送达服务端 当服务端未收到ack消息 会尝试第四次挥手这样客户端在2msl内可以收到重发的报文给出回应和重置2msl计时器
使旧链接的数据 过期失效

在高并发短连接服务上 会导致连接数过高 文件描述符过高导致新链接失败  这种情况需要处理 time_wait时长 和文件描述符大小  
