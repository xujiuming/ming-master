<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">ming</el-menu-item>
      <el-menu-item index="2">工作站点</el-menu-item>
      <el-menu-item index="3">工具站点</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
            }
        }
    };
</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
  }
</style>
