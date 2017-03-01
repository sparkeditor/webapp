<template>
    <Container>
        <h1>Spark Editor</h1>
        <div class="login">
            <form id="form" @submit.prevent="handleSubmit">
                <label for="username" hidden>Username</label>
                <input type="text" name="username" placeholder="Username" />
                <br>
                <label for="password" hidden>Password</label>
                <input type="password" name="password" placeholder="Password" />
                <br>
                <input type="submit" name="submit" value="Log In" />
            </form>
        </div>
    </Container>
</template>
<script>
 import Container from "../Container";
 import io from "../../socketClient";
 
 export default {
     name: "Login",
     components: {
         Container
     },
     methods: {
         handleSubmit(event) {
             const formData = new FormData(event.target);
             const credentials = {
                 username: formData.get("username"),
                 password: formData.get("password")
             };
             io.emit("authorize", {credentials: credentials}, function(result) {
                 console.log(result);
             });
         }
     }
 }
</script>
<style lang="scss" scoped>
 @import "../../scss/colors.scss";
 
 .login {
     width: 350px;
     text-align: left;
     margin: auto;
     margin-top: 1.5em;
 }
 input {
     padding-left: 5px;
     width: 100%;
     box-sizing: border-box;
     box-shadow: none;
 }
 input:focus {
     outline: none;
 }
 input[type="text"], input[type="password"] {
     border: none;
     border-bottom: 2px solid $sterling;
     box-shadow: none;
 }
 input[type="text"]:focus, input[type="password"]:focus {
     border-bottom: 2px solid $raven;
 }
 input[type="submit"] {
     margin-top: 2em;
     line-height: 2;
     border: none;
     color: $cream;
     background-color: $slate;
 }
 input[type="submit"]:hover {
     background-color: $teal;
 }
</style>
