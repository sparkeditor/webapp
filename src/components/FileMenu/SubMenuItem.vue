<template>
    <li class="menuItem" @click="onclick" @mouseover="showChildren" @mouseleave="hideChildren">
        <span class="menuItemName">{{ name }}</span>
        <ul class="subMenu" v-if="Object.keys(children).length > 0 && shouldShowChildren">
            <SubMenuItem class="subMenuItem"
                         v-for="childItem, childName in children" 
                         :item="childItem"
                         :name="childName" 
            />
        </ul>
    </li>
</template>
<script>
 export default {
     name: "SubMenuItem",
     data() {
         return {
             onclick: typeof this.item === "function" ? this.item : this.toggleChildren,
             children: typeof this.item === "object" ? this.item : {},
             shouldShowChildren: false
         }
     },
     methods: {
         hideChildren() {
             this.shouldShowChildren = false;
         },
         showChildren() {
             this.shouldShowChildren = true;
         },
         toggleChildren() {
             this.shouldShowChildren = !this.shouldShowChildren
         }
     },
     props: {
         item: {
             validator: function(item) {
                 return typeof item === "function" || typeof item === "object";
             },
             required: true
         },
         name: {
             type: String,
             required: true
         }
     }
 }
</script>
<style lang="scss" scoped>
  @import "../../scss/colors.scss";

  .subMenu {
      text-align: left;
      z-index: 3;
      float: left;
      position: absolute;
      list-style-type: none;
      margin: 0;
      padding: 0; 
      min-width: 100px;
      background-color: $cream;
      border: 1px solid $slate;
  }
  .subMenu > .subMenuItem {
      padding-left: 0.5em;
      padding-right: 0.5em;
  }
  .subMenu > .subMenuItem:hover {
      background-color: $pearl;
  }

</style>
