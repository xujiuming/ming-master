<template>
  <el-row>
    <el-col :span="8" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
      <el-card :body-style="{ padding: '0px' }">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
    export default {
        data() {
            return {

            };
        }
    };
</script>

<style scoped>
  .navSection {
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    flex-wrap: wrap;
  }

  .item {
    width: 31%;
    margin: 1%;
    height: 100px;
  }
</style>
