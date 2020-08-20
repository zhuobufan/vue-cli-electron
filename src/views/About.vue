<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="clickButton">点击查看</button>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        electron : window.require('electron')
      }
    },
    methods:{
      clickButton(){
        new this.electron.remote.BrowserWindow({
          width: 200,
          height: 200
        }).loadURL('http://baidu.com')
      }
    }
  }
</script>
