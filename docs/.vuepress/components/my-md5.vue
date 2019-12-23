<!--
基于crypto-js 自定义组件
-->
<template>
    <div class="container">
        <div class="row">
            <div class="col-5 form-group">
                <input @keyup.enter="toMd5" type="text" v-model="oldMd5"/>
            </div>
            <div class="col-1">
                <button class="btn btn-success" type="button" v-on:click="toMd5">=></button>
            </div>
            <div class="col-6">
                <div class="row">
                    <div class="col-4 offset-1">
                        32位小写:
                    </div>
                    <div class="col-6">
                        {{ newMd5LowerCase32 }}
                    </div>

                    <div class="col-4 offset-1">
                        32位大写:
                    </div>
                    <div class="col-6">
                        {{ newMd5UpperCase32 }}
                    </div>
                    <div class="col-4 offset-1">
                        16位小写:
                    </div>
                    <div class="col-6">
                        {{ newMd5LowerCase16 }}
                    </div>
                    <div class="col-4 offset-1">
                        16位大写:
                    </div>
                    <div class="col-6">
                        {{ newMd5UpperCase16 }}
                    </div>
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
                oldMd5: '',
                newMd5LowerCase32: '',
                newMd5UpperCase32: '',
                newMd5LowerCase16: '',
                newMd5UpperCase16: '',
            }
        },
        methods: {
            toMd5:function(){
                try {
                    this.newMd5LowerCase32 = cryptoJs.MD5(this.oldMd5).toString().toLowerCase();
                    this.newMd5UpperCase32 = this.newMd5LowerCase32.toUpperCase();
                    this.newMd5LowerCase16 = this.newMd5LowerCase32.substring(8,24);
                    this.newMd5UpperCase16 = this.newMd5LowerCase16.toUpperCase();
                } catch (e) {
                    this.newMd5LowerCase32 = e;
                }
            }
        }
    }
</script>