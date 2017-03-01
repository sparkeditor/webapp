<template>
    <div id="app">
        <WindowManager />
    </div>
</template>
<script>
 import WindowManager from "../WindowManager";
 
 export default {
     name: 'App',
     components: {
         WindowManager
     }
 }
</script>
<style lang="scss" scoped>
 .app {
     width: 100%;
     height: 100%;
 }
</style>
