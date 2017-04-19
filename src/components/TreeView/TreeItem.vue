<template>
    <li class="treeItem" :class="{ignored: isIgnored}"
        @click.prevent.stop="handleClick"
        @mouseover.stop="hoverOn"
        @mouseout.stop="hoverOff"
        :style="itemStyle"
    >
        <i v-if="!ignored && type == 'directory'"
           class="fa fa-lg"
           :class="caretClass"
           aria-hidden="true"
        ></i>
        <i class="fa" :class="typeClass" aria-hidden="true"></i>
        <span class="name">{{ name }}</span>
        <ul v-if="expand && children && children.length > 0">
            <TreeItem v-for="child in children"
                      :name="child.name"
                      :type="child.type"
                      :path="child.path"
                      :children="child.children"
                      :ignored="child.ignored"
            />
        </ul>
    </li>
</template>
<script>
import colors from "!!sass-variables-loader!../../scss/colors.scss";

export default {
    name: "TreeItem",
    computed: {
        caretClass() {
            if (this.expand) {
                return "fa-caret-down";
            } else {
                return "fa-caret-right";
            }
        },
        file() {
            return {
                name: this.name,
                type: this.type,
                path: this.path
            };
        },
        isIgnored() {
            return this.ignored;
        },
        itemStyle() {
            const style = {};
            if (this.hover) {
                if (!this.ignored) {
                    style.color = colors.slate;
                }
            }
            return style;
        },
        typeClass() {
            switch (this.type) {
                case "directory":
                    if (this.expand) {
                        return "fa-folder-open";
                    } else {
                        return "fa-folder";
                    }
                default:
                    return "fa-file";
            }
        }
    },
    data() {
        return {
            expand: this.startExpanded || false,
            hover: false
        };
    },
    methods: {
        handleClick(event) {
            if (this.children && this.children.length > 0) {
                this.expand = !this.expand;
            } else if (this.type !== "directory") {
                this.$store.commit("setCurrentFile", this.file);
            }
        },
        hoverOff(event) {
            this.hover = false;
        },
        hoverOn(event) {
            this.hover = true;
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: ""
        },
        path: {
            type: String,
            required: true
        },
        children: Array,
        ignored: Boolean,
        startExpanded: Boolean
    }
};
</script>
<style lang="scss" scoped>
 @import "../../scss/colors.scss";
 @import "../../scss/fonts.scss";
 @import "../../scss/font-awesome/font-awesome.scss";

 ul {
     margin: 0px;
     padding-left: 0.9rem;
 }
 .treeItem {
     background-color: $cream;
     color: $raven;
     font-family: "Open Sans", arial, sans-serif;
     line-height: 1.5;
     list-style: none;
     text-align: left;
     padding-left: 0.9rem;
     font-size: 0.9rem;
     white-space: nowrap;
     text-overflow: ellipsis;
 }
 .treeItem:hover {
     cursor: pointer;
 }
 .ignored {
     color: $sterling;
 }
 .ignored:hover {
     cursor: default;
     color: $sterling;
 }
</style>
