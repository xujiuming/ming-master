<!--
基于crypto-js 自定义组件
-->
<template>
    <div class="container">
        <div class="row">
            <div class="col-5 form-group">
                <input @keyup.enter="toMd5LowerCase32" type="text" v-model="oldMd5"/>
            </div>
            <div class="col-3">
                <button class="btn btn-success" type="button" v-on:click="toMd5LowerCase32">32位小写=></button>
            </div>
            <div class="col-4">
                {{ newMd5 }}
            </div>

            <div class="col-3 offset-5 form-group">
                <button class="btn btn-success" type="button" v-on:click="toMd5UpperCase32">32位大写=></button>
            </div>
            <div class="col-3 offset-5 form-group">
                <button class="btn btn-success" type="button" v-on:click="toMd5LowerCase16">16位小写=></button>
            </div>
            <div class="col-3 offset-5 form-group">
                <button class="btn btn-success" type="button" v-on:click="toMd5UpperCase16">16位大写=></button>
            </div>
        </div>
    </div>
</template>

<script>
    import cryptoJs from 'crypto-js'

    export default {
        data() {
            return {
                oldMd5: '',
                newMd5: '',
            }
        },
        methods: {
            toMd5LowerCase32: function () {
                try {
                    this.newMd5 = cryptoJs.MD5(this.oldMd5).toString().toLowerCase();
                } catch (e) {
                    this.newMd5 = e;
                }
            },
            toMd5UpperCase32: function () {
                try {
                    this.newMd5 = cryptoJs.MD5(this.oldMd5).toString().toUpperCase();
                } catch (e) {
                    this.newMd5 = e;
                }
            },
            toMd5LowerCase16: function () {
                try {
                    this.newMd5 = cryptoJs.MD5(this.oldMd5).toString().substring(8,24).toLowerCase();
                } catch (e) {
                    this.newMd5 = e;
                }
            },
            toMd5UpperCase16: function () {
                try {
                    this.newMd5 = cryptoJs.MD5(this.oldMd5).toString().substring(8,24).toUpperCase();
                } catch (e) {
                    this.newMd5 = e;
                }
            }
        }
    }
</script>