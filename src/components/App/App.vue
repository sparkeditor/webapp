<template>
    <Container>
        <TabbedWindow />
    </Container>
</template>
<script>
 import Container from "../Container";
 import TabbedWindow from "../TabbedWindow";
 
 export default {
     name: 'App',
     components: {
         Container,
         TabbedWindow
     }
 }
</script>
<style lang="scss" scoped>
</style>
