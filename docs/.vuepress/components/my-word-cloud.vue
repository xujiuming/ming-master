<!--
https://github.com/SeregPie/VueWordCloud
-->
<template>
    <div class="col-6 offset-2" style="height: 300px">
        <vue-word-cloud :color="randomColor"
                        :words="words"
                        font-family="Roboto"/>
    </div>
</template>


<script>
    export default {
        props: {
            //词数组
            words: {
                type: Array,
                default: []
            }
        },
        methods: {
            //随机颜色
            randomColor: function () {
                let r = Math.floor(Math.random() * 256);
                let g = Math.floor(Math.random() * 256);
                let b = Math.floor(Math.random() * 256);
                return "rgb(" + r + "," + g + "," + b + ")";
            }
        }
    };

</script>
