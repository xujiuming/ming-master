<!--
基于 vue-json-viewers 自定义组件
提供mb 级别json 快速显示 组件
-->
<template>
    <div class="container" style="width: 100%;height: 100%">
        <div class="row">
            <div class="col-5 form-group">
                <textarea @mouseleave="toJsonData" class="form-control" rows="10" v-model="jsonStr"></textarea>
            </div>
            <div class="col-1">
                <button class="btn btn-success" type="button" v-on:click="toJsonData">=></button>
            </div>
            <div class="col-5">
                <json-view :data="jsonData" :theme="theme"/>
            </div>
        </div>
    </div>
</template>

<script>
    import jsonView from 'vue-json-views';

    export default {
        components: {
            jsonView
        },
        data() {
            return {
                jsonStr: '{}',
                jsonData: {},
                theme: "one-dark"
            }
        },
        methods: {
            toJsonData: function () {
                try {
                    this.jsonData = JSON.parse(this.jsonStr)
                } catch (e) {
                    this.jsonData = {
                        message: e.message
                    }
                }
            }
        }
    }
</script>