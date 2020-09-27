<template>
  <!--    <input type="text" v-model="calcText"/>-->
  <!--    <button @click="runCalcText">计算</button>-->
  <div class="container" style="width: 300px;">
    <div class="row">
      <div class="col-lg-8 offset-2 column">
        <div class="input-group ">
          <input type="text" class="input-group-lg" v-model="calcText"/>
        </div>
        <div class="btn-group btn-group-lg">
          <button class="btn btn-default btn-block" type="button" @click="addCalcText('(')">(</button>
          <button class="btn btn-default" type="button" @click="addCalcText(')')">)</button>
          <button class="btn btn-default" type="button" @click="delOneCalcText">←</button>
          <button class="btn btn-danger" type="button" @click="cleanCalcText">C</button>
        </div>
        <div class="btn-group btn-group-lg">
          <button class="btn btn-default" type="button" @click="addCalcText('7')">7</button>
          <button class="btn btn-default" type="button" @click="addCalcText('8')">8</button>
          <button class="btn btn-default" type="button" @click="addCalcText('9')">9</button>
          <button class="btn btn-default" type="button" @click="addCalcText('/')">/</button>
        </div>
        <div class="btn-group btn-group-lg">
          <button class="btn btn-default" type="button" @click="addCalcText('4')">4</button>
          <button class="btn btn-default" type="button" @click="addCalcText('5')">5</button>
          <button class="btn btn-default" type="button" @click="addCalcText('6')">6</button>
          <button class="btn btn-default" type="button" @click="addCalcText('*')">*</button>
        </div>
        <div class="btn-group btn-group-lg">
          <button class="btn btn-default" type="button" @click="addCalcText('1')">1</button>
          <button class="btn btn-default" type="button" @click="addCalcText('2')">2</button>
          <button class="btn btn-default" type="button" @click="addCalcText('3')">3</button>
          <button class="btn btn-default" type="button" @click="addCalcText('-')">-</button>
        </div>
        <div class="btn-group btn-group-lg">
          <button class="btn btn-default" type="button" @click="addCalcText('0')">0</button>
          <button class="btn btn-default" type="button" @click="addCalcText('.')">.</button>
          <button class="btn btn-default" type="button" @click="addCalcText('00')">00</button>
          <button class="btn btn-default" type="button" @click="addCalcText('+')">+</button>
        </div>

      </div>
      <div class="col-md-8 offset-2">
        <button class="btn btn-default btn-lg btn-success btn-block" type="button" @click="runCalcText">=</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      calcText: '0'
    }
  },
  methods: {

    runCalcText: function () {
      let calc = require('calculatorjs')
      try {
        this.calcText = calc(this.calcText)
      } catch (e) {
        this.calcText = e.toString()
      }
    },
    addCalcText: function (value) {
      this.calcText = this.calcText + value
    },
    delOneCalcText: function () {
      this.calcText = this.calcText.substring(0, this.calcText.length - 1)
    },
    cleanCalcText: function () {
      this.calcText = '0'
    }
  }
}
</script>