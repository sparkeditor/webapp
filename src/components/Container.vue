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
<style lang="scss" scoped>
 @import "../scss/colors.scss";
 
 @font-face {
     font-family: 'Open Sans';
     font-weight: 400;
     font-style: normal;
     src: url('../fonts/Open-Sans-regular/Open-Sans-regular.eot');
     src: url('../fonts/Open-Sans-regular/Open-Sans-regular.eot?#iefix') format('embedded-opentype'),
     local('Open Sans'),
     local('Open-Sans-regular'),
     url('../fonts/Open-Sans-regular/Open-Sans-regular.woff2') format('woff2'),
     url('../fonts/Open-Sans-regular/Open-Sans-regular.woff') format('woff'),
     url('../fonts/Open-Sans-regular/Open-Sans-regular.ttf') format('truetype'),
     url('../fonts/Open-Sans-regular/Open-Sans-regular.svg#OpenSans') format('svg');
 }

 @font-face {
     font-family: 'Open Sans';
     font-weight: 700;
     font-style: normal;
     src: url('../fonts/Open-Sans-700/Open-Sans-700.eot');
     src: url('../fonts/Open-Sans-700/Open-Sans-700.eot?#iefix') format('embedded-opentype'),
     local('Open Sans Bold'),
     local('Open-Sans-700'),
     url('../fonts/Open-Sans-700/Open-Sans-700.woff2') format('woff2'),
     url('../fonts/Open-Sans-700/Open-Sans-700.woff') format('woff'),
     url('../fonts/Open-Sans-700/Open-Sans-700.ttf') format('truetype'),
     url('../fonts/Open-Sans-700/Open-Sans-700.svg#OpenSans') format('svg');
 }

 @font-face {
     font-family: 'Open Sans';
     font-weight: 300;
     font-style: italic;
     src: url('../fonts/Open-Sans-300italic/Open-Sans-300italic.eot');
     src: url('../fonts/Open-Sans-300italic/Open-Sans-300italic.eot?#iefix') format('embedded-opentype'),
     local('Open Sans Light Italic'),
     local('Open-Sans-300italic'),
     url('../fonts/Open-Sans-300italic/Open-Sans-300italic.woff2') format('woff2'),
     url('../fonts/Open-Sans-300italic/Open-Sans-300italic.woff') format('woff'),
     url('../fonts/Open-Sans-300italic/Open-Sans-300italic.ttf') format('truetype'),
     url('../fonts/Open-Sans-300italic/Open-Sans-300italic.svg#OpenSans') format('svg');
 }

 .container {
     position: fixed;
     top: 0;
     right: 0;
     color: inherit;
     font-family: inherit;
     font-size: inherit;
     text-align: center;
     width: 100%;
     height: 100%;
     background-color: $cream;
 }
 * {
     color: $raven;
     font-family: "Open Sans", arial, sans-serif;
     font-size: 1.2rem;
     line-height: 1.5;
 }
 * + * {
     margin-top: 1.5em;
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
