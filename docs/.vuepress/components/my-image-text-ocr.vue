<!--
基于百度 通用精确文本识别api
-->

<template>
    <div class="container" style="width: 100%;height: 100%">
        <div class="row">
            <div class="col-5 form-group">
                <input class="form-control" type="file" @change="uploadFile($event)" name="ocrFile"/>
                <div v-if="valueUrl">
                    图片预览:
                    <img :src=valueUrl>
                </div>
            </div>
            <div class="col-1">
                <button class="btn btn-success" type="button">=></button>
            </div>
            <div class="col-5">
                <div class="response">
                    <pre style="color: #f3f4f5">
                        {{imageText}}
                    </pre>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    // script 代码
    import axios from 'axios'

    export default {
        data() {
            return {
                valueUrl: '',
                imageTextInfo: {},
                imageText: ''
            }
        },
        methods: {
            uploadFile(el) {
                this.imageText = '';
                if (!el.target.files[0].size) return; // 如果文件大小为0，则返回
                if (el.target.files[0].type.indexOf('image') === -1) { //如果不是图片格式
                    alert('请选择图片文件')
                } else {
                    const that = this;
                    const reader = new FileReader(); // 创建读取文件对象
                    reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
                    reader.onload = function () {  // 文件读取完成后
                        // 读取完成后，将结果赋值给img的src
                        that.valueUrl = this.result;
                    };
                    const formData = new FormData();  // 创建一个formdata对象
                    formData.append('file', el.target.files[0]);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    };
                    axios.post('https://show.xujiuming.com/ming/api/ai/ocr', formData, config)
                        .then((response) => {
                            this.imageTextInfoArray = response.data
                            for (let item of this.imageTextInfoArray) {
                                this.imageText += '\n' + item.words;
                            }
                        }).catch(e => {
                        this.imageText = e
                    })
                }
            }


        }
    }


</script>