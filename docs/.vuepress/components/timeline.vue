<template>
    <div class="demo-them light">
        <timeline timeline-theme="lightblue">
            <timeline-title>未来</timeline-title>
            <timeline-item bg-color="#9dd8e0" font-color="#000000">2019-12-01 主站改版(使用vuepress+github actions + oss)</timeline-item>
        </timeline>
    </div>
</template>

<script>
    import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

    export default {
        components: {
            Timeline,
            TimelineItem,
            TimelineTitle
        }
    }
</script>

<style>
    .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
</style>