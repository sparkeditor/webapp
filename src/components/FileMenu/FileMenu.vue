<template>
    <ul class="topMenu">
        <SubMenuItem class="topMenuItem"
                     v-for="itemValue, itemName in menu"
                     :name="itemName"
                     :item="itemValue"
        />
    </ul>
</template>
<script>
  import SubMenuItem from "./SubMenuItem";

  export default {
      name: "Menu",
      components: {
          SubMenuItem
      },
      props: {
          /**
           * The menu prop is an object where the keys are menu item names
           * and the values are either objects, which are further menu objects
           * representing submenus, or functions, which are functions to be called
           * when that menu item is clicked
           */
          menu: {
              validator: function(menu) {
                  const recursiveValidateMenu = function(menuItem) {
                      if (typeof menuItem === "function") {
                          return true;
                      }
                      else if (typeof menuItem === "object") {
                          for (let item in menuItem) {
                              if (!menuItem.hasOwnProperty(item)) {
                                  continue;
                              }
                              if (!recursiveValidateMenu(menuItem[item])) {
                                  return false
                              }
                          }
                          // If all sub-items are valid, the menu is valid
                          return true;
                      }
                      else {
                          return false;
                      }
                  }
                  return recursiveValidateMenu(menu);
              }
          }
      }
  }
</script>
<style lang="scss" scoped>
  @import "../../scss/colors.scss";

  .topMenu {
      text-align: left;
      list-style-type: none;
      font-family: "Open Sans", arial, sans-serif;
      margin: 0 0 0 0.5em;
      padding: 0;
  }
  .topMenu > .topMenuItem {
      min-width: 50px;
      float: left;
      padding-top: 0.5em;
      text-align: center;
  }
  .topMenu > .topMenuItem:hover {
      background-color: $pearl;
      cursor: pointer;
  }
</style>
