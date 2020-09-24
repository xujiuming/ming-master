<template>
  <div class="row" style="margin: 0;padding: 0;width: 100%;height: 700px;">
      <span>格式选择:</span>
      <select class="language-picker" @change="changeLanguage($event)">
        <option>plaintext</option>
        <!--      <option>abap</option>-->
        <!--      <option>aes</option>-->
        <!--      <option>apex</option>-->
        <!--      <option>azcli</option>-->
        <!--      <option>bat</option>-->
        <!--      <option>c</option>-->
        <!--      <option>cameligo</option>-->
        <!--      <option>clojure</option>-->
        <!--      <option>coffeescript</option>-->
        <!--      <option>cpp</option>-->
        <!--      <option>csharp</option>-->
        <!--      <option>csp</option>-->
        <!--      <option>css</option>-->
        <!--      <option>dart</option>-->
        <option>dockerfile</option>
        <!--      <option>fsharp</option>-->
        <!--      <option>go</option>-->
        <!--      <option>graphql</option>-->
        <!--      <option>handlebars</option>-->
        <!--      <option>hcl</option>-->
        <option>html</option>
        <option>ini</option>
        <option>java</option>
        <option>javascript</option>
        <option>json</option>
        <!--      <option>julia</option>-->
        <option>kotlin</option>
        <!--      <option>less</option>-->
        <!--      <option>lexon</option>-->
        <!--      <option>lua</option>-->
        <option>markdown</option>
        <!--      <option>mips</option>-->
        <!--      <option>msdax</option>-->
        <!--      <option>mysql</option>-->
        <!--      <option>objective-c</option>-->
        <!--      <option>pascal</option>-->
        <!--      <option>pascaligo</option>-->
        <!--      <option>perl</option>-->
        <!--      <option>pgsql</option>-->
        <!--      <option>php</option>-->
        <!--      <option>plaintext</option>-->
        <!--      <option>postiats</option>-->
        <!--      <option>powerquery</option>-->
        <!--      <option>powershell</option>-->
        <!--      <option>pug</option>-->
        <option>python</option>
        <!--      <option>r</option>-->
        <!--      <option>razor</option>-->
        <option>redis</option>
        <!--      <option>redshift</option>-->
        <!--      <option>restructuredtext</option>-->
        <!--      <option>ruby</option>-->
        <!--      <option>rust</option>-->
        <!--      <option>sb</option>-->
        <!--      <option>scala</option>-->
        <!--      <option>scheme</option>-->
        <!--      <option>scss</option>-->
        <option>shell</option>
        <!--      <option>sol</option>-->
        <option>sql</option>
        <!--      <option>st</option>-->
        <!--      <option>swift</option>-->
        <!--      <option>systemverilog</option>-->
        <!--      <option>tcl</option>-->
        <!--      <option>twig</option>-->
        <option>typescript</option>
        <!--      <option>vb</option>-->
        <!--      <option>verilog</option>-->
        <option>xml</option>
        <option>yaml</option>
      </select>
      <span>主题选择:</span>
      <select name="主题" @change="changeTheme($event)">
        <option>vs-dark</option>
        <option>vs</option>
        <option>hc-black</option>
      </select>
    <MonacoEditor v-if="showMonacoEditorFlag"
                  :language="language"
                  :code="initShowCode"
                  :editorOptions="options"
                  :theme="theme"
                  @mounted="onMounted"
    />
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco-editor'

export default {
  components: {
    MonacoEditor
  },

  data() {
    return {
      language: 'plaintext',
      initShowCode: '',
      //vs, hc-black, or vs-dark
      theme: 'vs-dark',
      //https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
      options: {},
      showMonacoEditorFlag: true,
      editor: null
    }
  },
  methods: {
    onMounted(editor) {
      this.editor = editor;
    },
    changeTheme: function (e) {
      this.theme = e.target.value
      let codeValue = this.editor.getValue()
      this.flushEditor(codeValue)
    },
    changeLanguage: function (e) {
      this.language = e.target.value
      this.flushEditor()
    },
    flushEditor: function (codeValue) {
      this.showMonacoEditorFlag = false
      this.$nextTick(() => {
        this.showMonacoEditorFlag = true
        this.editor
        this.editor.setValue(codeValue)
      })
    },
    formatCodeStyle: function () {
      console.log(this.editor)
      this.editor.trigger('editor.action.formatDocument')
    }
  }
}
</script>
<style>
</style>

