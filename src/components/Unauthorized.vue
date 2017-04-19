<template>
    <Container>
        <h1>Unauthorized</h1>
        <p>Session expired. Please <a href="/login">log in</a>.</p>
    </Container>
</template>
<script>
import Container from "./Container";

export default {
    name: "Unauthorized",
    components: {
        Container
    }
}
</script>
<style lang="scss" scoped>

</style>
