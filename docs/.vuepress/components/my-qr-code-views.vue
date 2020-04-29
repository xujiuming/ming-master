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
    </div>


</template>
<script>
    // script 代码

    export default {
        data() {
            return {
                qrCodeValue: '',
            }
        },
        methods: {}
    }


</script>