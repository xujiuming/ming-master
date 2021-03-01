## k8s常用组件 

|名称|作用|备注|
|:---|:---|:---|
|etcd|k8s 注册中心|管理、注册k8s相关服务信息|
|api server|k8s manager api server||
|scheduler|调度组件|用来管理k8s相关调度任务|
|controller-manager|控制面板|管理k8s资源|
|kubelet|node节点的管理探针|用来配合master节点管理node的|
|kube-proxy|node节点网络代理组件|用来接入到k8s网络的组件|
|containerd|实现oci标准的容器引擎|一般使用docker不过现在开始直接使用containerd|
|dns|k8s自用的dns服务|提供k8s一些别名访问的dns|
|flannel|k8s网络组件|基于overlay network的|
|calico|k8s网络组件|基于bgp路由协议|
|prometheus|监控组件|存储采集上来的监控数据|
|grafana|监控组件|展示prometheus存储的数据|
|helm|k8s发布软件包格式||

## k8s常用高可用部署方式 
> k8s要实现高可用 核心是etcd要高可用    
>业内很多一键部署高可用的脚本啥的 基本上就是要么直接写好二进制安装脚本或者包装kubeadm来实现的    


* kubeadm    
    高本版的kubeadm 支持外接etcd创建高可用的k8s集群   
      
* rancher   
    rancher 可以使用rke建立k8s高可用集群  
  
* 二进制安装   
    手工安装 etcd、api server 、schedule 等master组件   
    然后签发证书 安装node节点的 kubelet kube-proxy组件  
  
    

