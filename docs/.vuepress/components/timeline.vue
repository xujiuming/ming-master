<!--
基于 vue-cute-timeline 自定义组件
传入 eventList 构建时间线
后续有需求了  添加多种属性  构建漂亮的
-->
<template>
    <div class="demo-them light">
        <timeline timeline-theme="lightblue">
            <timeline-title>未来</timeline-title>
            <timeline-item v-for="item in  eventList">{{item}}</timeline-item>
        </timeline>
    </div>
</template>

<script>
    import {Timeline, TimelineItem, TimelineTitle} from 'vue-cute-timeline'

    export default {
        components: {
            Timeline,
            TimelineItem,
            TimelineTitle
        },
        props: {
            eventList: Array
        }
    }
</script>

<style>
    .github-corner:hover .octo-arm {
        animation: octocat-wave 560ms ease-in-out
    }

    @keyframes octocat-wave {
        0%, 100% {
            transform: rotate(0)
        }
        20%, 60% {
            transform: rotate(-25deg)
        }
        40%, 80% {
            transform: rotate(10deg)
        }
    }

    @media (max-width: 500px) {
        .github-corner:hover .octo-arm {
            animation: none
        }

        .github-corner .octo-arm {
            animation: octocat-wave 560ms ease-in-out
        }
    }
</style>