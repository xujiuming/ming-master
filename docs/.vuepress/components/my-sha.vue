<!--
基于crypto-js 自定义组件
-->
<template>
    <div class="container">
        <div class="row">
            <div class="col-5 form-group">
                <input @keyup.enter="toHash" type="text" v-model="shaValue"/>
            </div>
            <div class="col-1">
                <button class="btn btn-success" type="button" v-on:click="toHash">=></button>
            </div>
            <div class="col-6">
                <div class="row">
                    <!--SHA-1 -->
                    <div class="col-4 offset-1">
                        SHA-1小写:
                    </div>
                    <div class="col-6">
                        {{ newSHA1Value }}
                    </div>

                    <div class="col-4 offset-1">
                        SHA-1大写:
                    </div>
                    <div class="col-6">
                        {{ newSHA1Value.toUpperCase() }}
                    </div>
                    <!--sha 3-->
                    <div class="col-4 offset-1">
                        SHA-3小写:
                    </div>
                    <div class="col-6">
                        {{ newSHA3Value }}
                    </div>

                    <div class="col-4 offset-1">
                        SHA-3大写:
                    </div>
                    <div class="col-6">
                        {{ newSHA3Value.toUpperCase() }}
                    </div>
                    <!--sha 224-->
                    <div class="col-4 offset-1">
                        SHA-224小写:
                    </div>
                    <div class="col-6">
                        {{ newSHA224Value }}
                    </div>

                    <div class="col-4 offset-1">
                        SHA-224大写:
                    </div>
                    <div class="col-6">
                        {{ newSHA224Value.toUpperCase() }}
                    </div>
                    <!--sha 256-->
                    <div class="col-4 offset-1">
                        SHA-256小写:
                    </div>
                    <div class="col-6">
                        {{ newSHA256Value }}
                    </div>

                    <div class="col-4 offset-1">
                        SHA-256大写:
                    </div>
                    <div class="col-6">
                        {{ newSHA256Value.toUpperCase() }}
                    </div>

                    <!--SHA-384-->
                    <div class="col-4 offset-1">
                        SHA-384小写:
                    </div>
                    <div class="col-6">
                        {{ newSHA384Value }}
                    </div>

                    <div class="col-4 offset-1">
                        SHA-384大写:
                    </div>
                    <div class="col-6">
                        {{ newSHA384Value.toUpperCase() }}
                    </div>

                    <!--SHA-512-->
                    <div class="col-4 offset-1">
                        SHA-512小写:
                    </div>
                    <div class="col-6">
                        {{ newSHA512Value }}
                    </div>

                    <div class="col-4 offset-1">
                        SHA-512大写:
                    </div>
                    <div class="col-6">
                        {{ newSHA512Value.toUpperCase() }}
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
                shaValue: '',
                newSHA1Value: '',
                newSHA3Value: '',
                newSHA224Value: '',
                newSHA256Value: '',
                newSHA384Value: '',
                newSHA512Value: '',
            }
        },
        methods: {
            toHash: function () {
                try {
                    this.newSHA1Value = cryptoJs.SHA1(this.shaValue).toString();
                    this.newSHA3Value = cryptoJs.SHA3(this.shaValue).toString();
                    this.newSHA224Value = cryptoJs.SHA224(this.shaValue).toString();
                    this.newSHA256Value = cryptoJs.SHA256(this.shaValue).toString();
                    this.newSHA384Value = cryptoJs.SHA384(this.shaValue).toString();
                    this.newSHA512Value = cryptoJs.SHA512(this.shaValue).toString();
                } catch (e) {
                    this.newSHA1Value = e.toString()
                }
            }
        }
    }
</script>