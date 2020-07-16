<template>
    <div class="container" style="width: 100%;height: 100%">
        <div class="row">
            <div class="col-5 form-group">
                <input class="form-control" type="text" placeholder="websocket server  address(ws or wss)"
                       v-model="wsAddress"/>
                <button type="button" class="btn btn-primary" @click="init()">
                    链接
                </button>
                <button type="button" class="btn btn-danger" v-if="socket.readyState === socket.OPEN"
                        @click="destroyed()">关闭
                </button>
            </div>
            <div class="col-5 form-group">
                <input class="form-control" type="text" placeholder="send server message" v-model="sendMessage">
                <button type="button" class="btn btn-success" @click="send()">发送消息</button>
            </div>
        </div>
        <div class="col-10">
            <button type="button" class="btn btn-warning" @click="clearShowMessage()">清除消息</button>
            <span v-if="socket.readyState === socket.OPEN">{{this.socket.url}}</span>
            <ul class="list-group">
                <li class="list-group-item" v-for="item in showMessage">
                    <span v-if="item.type === 'client'" style="color: #7abaff;font-size: 18px"
                          class="badge">客户端发送消息:</span>
                    <span v-if="item.type === 'server'" style="color: #34ce57;font-size: 18px"
                          class="badge">服务端推送消息:</span>
                    {{item.message}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        mounted() {
            if (typeof (WebSocket) === "undefined") {
                alert("您的浏览器不支持socket")
            }
        },
        data() {
            return {
                wsAddress: 'wss://echo.websocket.org',
                sendMessage: '',
                showMessage: [],
                socket: {}
            }
        },
        methods: {
            init: function () {
                if (this.wsAddress == null || this.wsAddress === '') {
                    alert("websocket地址为null!")
                    return
                }
                if (! this.wsAddress.startsWith('wss://')) {
                    alert("websocket地址错误必须是wss://开头")
                    return
                }
                // 实例化socket
                this.socket = new WebSocket(this.wsAddress)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
            },
            open: function () {
                this.showMessage.push({message: "socket连接成功\n", type: "client"})
            },
            error: function (err) {
                this.showMessage.push({message: "连接错误!" + err + "\n", type: "client"})
            },
            getMessage: function (msg) {
                this.showMessage.push({message: msg.data + "\n", type: "server"})
            },
            send: function () {
                if (this.socket.readyState !== this.socket.OPEN) {
                    alert("websocket已经关闭! ")
                    return
                }
                this.showMessage.push({message: this.sendMessage + "\n", type: "client"})
                this.socket.send(this.sendMessage)
            },
            close: function () {
                this.showMessage.push({message: "socket已经关闭\n", type: "client"})
            },
            destroyed() {
                // 销毁监听
                this.socket.onclose = this.close
                this.socket.close()
                this.showMessage.push({message: "websocket销毁!\n", type: "client"})
            },
            clearShowMessage() {
                this.showMessage = []
            }
        },
    }
</script>
<style>

</style>

