<template>
    <div class="appContainer">
        <TabbedWindow />
    </div>
</template>
<script>
 import TabbedWindow from "../TabbedWindow";
 
 export default {
     name: 'App',
     components: {
         TabbedWindow
     }
 }
</script>
<style lang="scss" scoped>
 .appContainer {
     position: fixed;
     top: 0;
     right: 0;
     height: 100%;
     width: 100%;
 }
</style>
