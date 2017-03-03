<template>
    <div class="container">
        <slot></slot>
    </div>
</template>
<script>
 export default {
     name: "Container"
 }
</script>
<style lang="scss">
 @import "../scss/font-awesome/font-awesome.scss";
 @import "../scss/colors.scss";
 @import "../scss/fonts.scss";
 
 html, body {
     width: 100%;
     min-height: 100%;
     margin: 0;
     background-color: $cream;
     color: inherit;
     font-family: inherit;
     font-size: inherit;
     text-align: center;
 }
 .container {
     color: $raven;
     font-family: "Open Sans", arial, sans-serif;
     font-size: 1.2rem;
     line-height: 1.5;
 }
 .container input, .container button {
     font-family: "Open Sans", arial, sans-serif;
     line-height: 1.5;
     font-size: 1.2rem;
     color: $raven;
 }
 .container * + * {
     margin-top: 1.5rem;
 }
 h1, h2, h3, h4, h5 {
     font-weight: normal;
     margin-top: 1.5em;
 }
 h1 {
     font-size: 5.0rem;
 }
 h2 {
     font-size: 3.7rem;
 }
 h3 {
     font-size: 2.8rem;
 }
 h4 {
     font-size: 2.1rem;
 }
 h5 {
     font-size: 1.6rem;
 }
 a {
     color: $slate;
 }
 a:visited {
     color: $red;
 }
 a:hover {
     color: $teal;
 }
</style>
