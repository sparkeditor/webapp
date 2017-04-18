<template>
    <div v-if="show">
        <div class="mask">
            <div class="popupDialog">
                <div class="content" :style="contentStyle">
                    <h4 class="title">{{ title }}</h4>
                    <slot></slot>
                    <div class="dialogButtons">
                        <button class="dialogButton" 
                                type="button"
                                v-for="button in buttons"
                                :key="button.key"
                                @click="button.onclick">
                            {{ button.text }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PopupDialog",
    computed: {
        contentWidth() {
            return this.width + "px";
        },
        contentStyle() {
            return {
                width: this.contentWidth
            };
        }
    },
    props: {
        show: {
            type: Boolean,
            required: true
        },
        width: {
            type: Number,
            default: 500
        },
        buttons: {
            type: Array,
            validate: function(buttons) {
                let valid = true;
                buttons.forEach((button) => {
                    if (typeof button !== 'object') {
                        valid = false;
                    }
                    if (!button.text || typeof button.text !== 'string') {
                        valid = false;
                    }
                    if (!button.onclick || typeof button.onclick !== 'function') {
                        valid = false;
                    }
                });
                return valid;
            }
        },
        title: String
    }
}
</script>
<style lang="scss" scoped>
@import "../../scss/colors.scss";

.mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
}
.popupDialog {
    display: table-cell;
    vertical-align: middle;
}
.title {
    font-family: "Open Sans", arial, sans-serif;
    padding-top: 0.5em;
}
.content {
    padding: 0 .5em .5em .5em;
    margin: auto;
    background-color: $cream;
    box-sizing: border-box;
    border-radius: 15px;
}
.dialogButtons {
    margin-bottom: .5em;
    margin-right: 1.5em;
    text-align: right;
}
.dialogButton {
   line-height: 2;
   border: none;
   background-color: $slate;
   color: $cream;
   font-size: 1.2rem;
   margin-left: 0.5em;
}
.dialogButton:hover {
    outline: none;
    background-color: $teal;
}
</style>
