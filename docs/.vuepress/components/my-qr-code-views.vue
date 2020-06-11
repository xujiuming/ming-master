<template>
    <div class="container" style="width: 100%;height: 100%">
        <div class="row">
            <div class="col-5 form-group">
                <textarea class="form-control" rows="10" v-model="qrCodeValue"/>
            </div>
            <div class="col-1">
                <button class="btn btn-success" type="button">=></button>
            </div>
            <div class="col-5">
                <div v-show="qrCodeValue" class="response">
                    <qrcode
                            :value="qrCodeValue"
                            v-if="qrCodeValue"
                            :options="{ size: 270 }">
                    </qrcode>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-5 form-group">
                <input class="form-control" type="file" @change="showFile($event)" name="qrCodeFile"/>
                <div v-if="qrCodeImageUrl">
                    二维码预览:
                    <img :src="qrCodeImageUrl">
                </div>
            </div>
            <div class="col-1">
                <button class="btn btn-success" type="button">=></button>
            </div>
            <div class="col-5">
                <div class="response">
                    <pre style="color: #f3f4f5">
                        {{qrCodeImageValue}}
                    </pre>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    // script 代码
    import QrcodeReader from "qrcode-reader";

    export default {
        data() {
            return {
                qrCodeValue: '',
                qrCodeImageUrl: '',
                qrCodeImageValue: ''
            }
        },
        methods: {
            showFile(el) {
                if (!el.target.files[0].size) return; // 如果文件大小为0，则返回
                if (el.target.files[0].type.indexOf('image') === -1) { //如果不是图片格式
                    alert('请选择图片文件')
                } else {
                    const that = this;
                    let qrcodeReader = new QrcodeReader()
                    qrcodeReader.decode(this.getObjectURL(el.target.files[0]))
                    qrcodeReader.callback = function (err, result) {
                        if (err != null) {
                            that.qrCodeImageValue = '\n' + err
                        } else {
                            that.qrCodeImageValue = '\n' + result.result
                        }
                    }
                    const reader = new FileReader(); // 创建读取文件对象
                    reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
                    reader.onload = function () {  // 文件读取完成后
                        // 读取完成后，将结果赋值给img的src
                        that.qrCodeImageUrl = this.result;
                    };

                }
            },
            getObjectURL(file) {
                let url = null;
                if (window.createObjectURL !== undefined) { // basic
                    url = window.createObjectURL(file);
                } else if (window.URL !== undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL !== undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            }
        }
    }


</script>