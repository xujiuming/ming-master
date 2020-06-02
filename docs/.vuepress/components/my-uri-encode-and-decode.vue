<template>
    <div class="container" style="width: 100%;height: 100%">
        <label>encodeURIComponent编码方式，<span style="color: red">会对特殊符号编码</span></label>
        <div class="row">
            <div class="col-5 form-group">
                <textarea class="form-control" rows="10"
                          v-model="oldUriComponent"></textarea>
            </div>
            <div class="col-1">
                <button class="btn btn-success" type="button" v-on:click="toEncodeURIComponent">=></button>
                <hr/>
                <button class="btn btn-success" type="button" v-on:click="toDecodeURIComponent"><=</button>
            </div>
            <div class="col-5">
                <textarea class="form-control" rows="10"
                          v-model="newUriComponent"></textarea>
            </div>
        </div>

        <label>encodeURI编码,不会对特殊符号编码</label>
        <div class="row">
            <div class="col-5 form-group">
                <textarea class="form-control" rows="10"
                          v-model="oldUri"></textarea>
            </div>
            <div class="col-1">
                <button class="btn btn-success" type="button" v-on:click="toEncodeURI">=></button>
                <hr/>
                <button class="btn btn-success" type="button" v-on:click="toDecodeURI"><=</button>
            </div>
            <div class="col-5">
                <textarea class="form-control" rows="10"
                          v-model="newUri"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                oldUriComponent: '',
                newUriComponent: '',
                oldUri: '',
                newUri: ''
            }
        },
        methods: {
            toEncodeURIComponent: function () {
                try {
                    this.newUriComponent = encodeURIComponent(this.oldUriComponent);
                } catch (e) {
                    this.newUriComponent = e.message
                }
            },
            toDecodeURIComponent: function () {
                try {
                    this.oldUriComponent = decodeURIComponent(this.newUriComponent);
                } catch (e) {
                    this.oldUriComponent = e.message
                }
            },
            toEncodeURI: function () {
                try {
                    this.newUri  = encodeURI(this.oldUri );
                } catch (e) {
                    this.newUri  = e.message
                }
            },
            toDecodeURI: function () {
                try {
                    this.oldUri  = decodeURI(this.newUri );
                } catch (e) {
                    this.oldUri  = e.message
                }
            },


        }
    }
</script>
<style>
    .code-string {
        color: green;
    }

    .code-number {
        color: darkorange;
    }

    .code-boolean {
        color: #000033;
    }

    .code-null {
        color: magenta;
    }

    .code-key {
        color: #003377;
        font-weight: bold;
    }
</style>

