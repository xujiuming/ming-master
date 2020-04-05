<template>
    <div class="container" style="width: 100%;height: 100%">
        <div class="row">
            <div class="col-5 form-group">
                <textarea @mouseleave="toXmlData" class="form-control" rows="10" v-model="xmlStr"></textarea>
            </div>
            <div class="col-1">
                <button class="btn btn-success" type="button" v-on:click="toXmlData">=></button>
            </div>
            <div class="col-5">
                <pre style="color: aliceblue">
                    {{xmlData}}
                </pre>
            </div>
        </div>
    </div>
</template>

<script>
    import  vkbeautify from 'vkbeautify'

    export default {
        components: {},
        data() {
            return {
                xmlStr: '',
                xmlData: ''
            }
        },
        methods: {
            toXmlData: function () {
                try {
                    this.xmlData = '\n'+ vkbeautify.xml(this.xmlStr);
                } catch (e) {
                    this.xmlData = e.message
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

