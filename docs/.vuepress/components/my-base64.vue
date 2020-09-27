<template>
  <div class="container" style="width: 100%;height: 100%">
    <div class="row">
      <div class="col-5 form-group">
        <label>明文:</label>
        <textarea class="form-control" rows="10" v-model="leftData"/>
      </div>
      <div class="col-1">
        <button class="btn btn-success" type="button" @click="leftDataToRightData">=></button>
        <button class="btn btn-success" type="button" @click="rightDataToLeftData"><=</button>
      </div>
      <div class="col-5">
        <label>密文:</label>
        <textarea class="form-control" rows="10" v-model="rightData"/>
      </div>
    </div>

    <div class="row">
      <div class="col-5 form-group">
        <input class="form-control" type="file" @change="showFile($event)" name="file"/>
        <div v-if="fileUrl">
          图片预览:
          <img :src="fileUrl">
        </div>
      </div>
      <div class="col-1">
        <button class="btn btn-success" type="button" @click="leftImageDataToRightImageData">=></button>
        <button class="btn btn-success" type="button" @click="rightImageDataToLeftImageData"><=</button>
      </div>
      <div class="col-5">
        <div class="response">
          <textarea class="form-control" rows="10" v-model="rightData"/>
        </div>
      </div>
    </div>
  </div>


</template>
<script>
import cryptoJs from 'crypto-js'

export default {
  data() {
    return {
      rightData: '',
      leftData: '',
      rightImageData: '',
      leftImageData: '',
      fileUrl: ''
    }
  },
  methods: {
    leftDataToRightData() {
      this.rightData = cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(this.leftData))
    },
    rightDataToLeftData() {
      this.leftData = cryptoJs.enc.Base64.parse(this.rightData).toString(cryptoJs.enc.Utf8);
    },
    leftImageDataToRightImageData() {

    },
    rightImageDataToLeftImageData() {
    },

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