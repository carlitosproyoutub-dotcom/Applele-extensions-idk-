(function(Scratch) {
  'use strict';
  const blocksIcon = "https://cdn.phototourl.com/free/2026-07-05-db18e682-8ef5-4827-aee3-0030f7b5dad0.png"
  class Extension {
    constructor() {
      this.appol = "false";
    }
    getInfo() {
      return {
        id: "applele",
        name: "Applele Blocks",
        color1: "#ff0000",
        color2: "#00ff00",
        color3: "#00ff00",
        menuIconURI: blocksIcon,
        blockIconURI: blocksIcon,
        blocks: [
          {
            opcode: 'apple',
            text: 'applele',
            blockType: Scratch.BlockType.COMMAND
          },
          {
            opcode: 'report',
            text: 'this sprite is applele?',
            blockType: Scratch.BlockType.BOOLEAN
          },
          {
            opcode: 'stt',
            text: 'Become applele [APP]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              APP: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
          {
            opcode: 'when',
            text: 'When becomes applele',
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: true
          }
        ]
      };
    }
    apple() {
      if (this.appol === "true") {
        alert("Applele")
      }
    }
    report() {
      return this.appol;
    }
    stt(args) {
      this.appol = args.APP === true ? "true" : "false";
    }
    when() {
      this.appol === "true";
    }
  }
  Scratch.extensions.register(new Extension());
})(Scratch);