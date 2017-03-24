<template>
    <div class="editor"></div>
</template>
<script>
 import ace from "brace";
 import "brace/ext/modelist";
 import "brace/ext/language_tools";
 import "brace/ext/searchbox";
 import "./languages";
 import CursorManager from "./cursorManager";
 import io from "../../socketClient";
 
 const modelist = ace.acequire("ace/ext/modelist");
 const Range = ace.acequire('ace/range').Range;
 
 export default {
     name: "Editor",
     mounted: function() {
         const self = this;

         // EDITOR SETUP
         this.editor = ace.edit(this.$el);
         this.editor.setOptions({
             fontSize: "0.9rem",
             enableBasicAutocompletion: true
         });
         this.cursorManager = new CursorManager(this.clients, this.editor.getSession());
         this.editor.getSession().addDynamicMarker(this.cursorManager, true);
         this.editor.getSession().getSelection().on("changeCursor", function() {
             io.emit("moveCursor", {
                 cursor: self.editor.getSession().getSelection().getCursor(),
                 file: self.path
             }, function(response) {
                 // TODO handle response codes
             });
         });
         this.editor.getSession().on("change", function(e) {
             // Check if the change was a 'user change' or a programmatic change
             // TODO will this work in vim mode?
             if (self.editor.curOp && self.editor.curOp.command.name) {
                 switch(e.action) {
                     case "insert":
                         io.emit("aceInsert", {
                             file: self.path,
                             start: e.start,
                             lines: e.lines
                         }, function(response) {
                             // TODO handle response codes
                         });
                         break;
                     case "remove":
                         io.emit("aceDelete", {
                             file: self.path,
                             start: e.start,
                             end: e.end
                         }, function(response) {
                             // TODO handle response codes
                         });
                         break;
                 }
             }
         });
         this.editor.$blockScrolling = Infinity;
         this.setContent(this.content);

         // IO SETUP
         io.on("aceInsert", function(data) {
             if (data.file && data.file === self.path) {
                 if (data.position && data.text) {
                     self.editor.getSession().insert(data.position, data.text);
                 }
             }
         });

         io.on("aceDelete", function(data) {
             if (data.file && data.file === self.path) {
                 if (data.start && data.end) {
                     self.editor.getSession()
                         .remove(new Range(data.start.row, data.start.column, data.end.row, data.end.column));
                 }
             }
         });

         io.on("moveCursor", function(data) {
             if (data.file && data.file === self.path) {
                 self.cursorManager.setCursor(data.client, data.cursor);
             }
         });
         
         io.on("open", function(data) {
             if (data.file && data.file === self.path) {
                 self.cursorManager.addCursor(data.username, {row: 0, column: 0});
             }
         });
     },
     data() {
         return {
             cursorManager: null,
             editor: null
         }
     },
     methods: {
         setContent(content) {
             if (this.path && this.path !== "") {
                 const language = modelist.getModeForPath(this.path);
                 if (language && language.mode) {
                     this.editor.getSession().setMode(language.mode);
                 }
             }
             this.editor.setValue(content);
             this.editor.gotoLine(0);
         }
     },
     props: {
         content: {
             type: String,
             required: true
         },
         clients: {
             type: Object,
             default: {}
         },
         path: String
     },
     watch: {
         content() {
             this.setContent(this.content);
             this.cursorManager.setClients(this.clients);
         }
     }
 }
</script>
<style lang="scss" scoped>
  .editor {
      position: relative;
      width: 100%;
      height: 100%;
  }
</style>
<style lang="scss">
  @import "../../scss/colors.scss";
  
  .alternateCursor {
      position: absolute;
      border-left: 2px solid $teal;
  }
</style>
